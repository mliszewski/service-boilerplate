# service-boilerplate
A barebones nodejs repository with all the standard stuffs

## A Boilerplate

### ... must have:
1. A well defined test structure
	1. Where are test files located in relation to their implementations? Under `tests/` or modularly next to logic? (modular)
	1. What testing framework should be used? (AVA)
1. Containerized data store with source control changes (postgres)
   1. Postgres docker container. Should local dev container maintain data or always start fresh?
   1. Sequelize ORM
   1. Sequelize CLI for migrations
1. Test data
	1. Fresh test database for every run
	1. Bootstrap test data when necessary (Sequelize test gulp task for test data fixtures)
1. Code coverage
    1. What are the minimum acceptable levels? Statements, functions, lines, branches (95, 95, 95, 80)
	1. Ideally monitored by a third party service (codecov) [![codecov](https://codecov.io/gh/mliszewski/service-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/mliszewski/service-boilerplate)
1. Linting
	1. Ideally this is a one of the first shared libraries of a code base (eslint)
	1. ruleset?
1. Dockerized local dev environment (service+db)
	1. Watch code base and restart/lint (gulp w/nodemon)
	1. Watch tests and re-run (ava --watch)
	1. run tests in docker container
1. Swagger documentation built in
    1. Preferably autogenerated from comments (swagger-jsdoc)
    1. Supplementing Github WIKI
1. CI as a service (tests + code coverage + notify Slack)
    1. Shippable [![Run Status](https://api.shippable.com/projects/57f553b15b4cc10f00eb2d57/badge?branch=master)](https://app.shippable.com/projects/57f553b15b4cc10f00eb2d57) [![Coverage Badge](https://api.shippable.com/projects/57f553b15b4cc10f00eb2d57/coverageBadge?branch=master)](https://app.shippable.com/projects/57f553b15b4cc10f00eb2d57)
    1. Circle CI [![CircleCI](https://circleci.com/gh/mliszewski/service-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/mliszewski/service-boilerplate/tree/master)
1. Logging - loggly
    1. winston, bunyan?
1. Debugger pre-wired

### ... would be nice to have:
1. Environment variable validation/checking
	1. Ideally no config files (except local dev)
1. Stale or insecure or dependency checking as a service (greenkeeper.io)
1. Repo report card (bithound.io)
1. Continuous deployment to staging
  1. Shippable/CircleCI via AWS ECS
