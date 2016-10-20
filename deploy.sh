#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region us-east-1
	aws configure set default.output json
}

deploy_cluster() {

    family="run-api"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster service-boilerplate --service api --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    # wait for older revisions to disappear
    # not really necessary, but nice for demos
    for attempt in {1..30}; do
        if stale=$(aws ecs describe-services --cluster service-boilerplate --services api | \
                       $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
            echo "Waiting for stale deployments:"
            echo "$stale"
            sleep 5
        else
            echo "Deployed!"
            return 0
        fi
    done
    echo "Service update took too long."
    return 1
}

make_task_def(){
	task_template='[
    {
      "volumesFrom": [],
      "memory": 300,
      "portMappings": [
        {
          "hostPort": 8080,
          "containerPort": 10010,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "mountPoints": [],
      "name": "api",
      "entryPoint": "run_staging.sh,
      "environment": [
        {
          "name": "PORT",
          "value": "10010"
        },
        {
          "name": "POSTGRES_DB",
          "value": "core"
        },
        {
          "name": "POSTGRES_HOST",
          "value": "staging-psql.cyoup8z18dlf.us-east-1.rds.amazonaws.com"
        },
        {
          "name": "POSTGRES_PWD",
          "value": "%s"
        },
        {
          "name": "POSTGRES_USER",
          "value": "mliszewski"
        }
      ],
      "image": "%s.dkr.ecr.us-east-1.amazonaws.com/service-boilerplate:%s",
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "service-boilerplate",
          "awslogs-region": "us-east-1"
        }
      },
      "cpu": 0
    }
  ]'

	task_def=$(printf "$task_template" $STAGING_DB_PWD $AWS_ACCOUNT_ID $CIRCLE_SHA1)
}

push_ecr_image(){
	eval $(aws ecr get-login --region us-east-1)
	docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/service-boilerplate:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster