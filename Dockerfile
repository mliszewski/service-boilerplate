FROM mhart/alpine-node:6

# Create app directory
RUN mkdir -p /src

# Install app dependencies
COPY package.json yarn.lock /src/

WORKDIR /src

RUN \
	echo "# REPLACE ME" > README.md && \
  npm install -g yarn && \
	yarn install --pure-lockfile && \
	yarn cache clean

# Bundle app source
COPY . .

ENV PORT ${PORT:-8080}
ENV POSTGRES_HOST ${POSTGRES_HOST}
ENV POSTGRES_DB ${POSTGRES_DB}
ENV POSTGRES_USER ${POSTGRES_USER}
ENV POSTGRES_PWD ${POSTGRES_PWD}

RUN \
    export POSTGRES_HOST=${POSTGRES_HOST} && \
    export POSTGRES_DB=${POSTGRES_DB} && \
    export POSTGRES_USER=${POSTGRES_USER} && \
    export POSTGRES_PWD=${POSTGRES_PWD} && \
    export TEST_DATABASE_ID=${TEST_DATABASE_ID} && \
	yarn run test && \
	yarn run clean:dusting && \
	yarn run build && \
	rm -rf \
		.babelrc \
		.dockerignore \
		.eslint* \
		.npmrc \
		.nvmrc \
		Dockerfile \
		docker-compose.yaml \
		README.md \
		gulpfile.* \
		build/ \
		src/ \
		.env* \
		;

EXPOSE ${PORT:-8080}

CMD [ "yarn", "run", "start" ]