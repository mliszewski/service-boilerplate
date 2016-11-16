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

ARG POSTGRES_DB
ARG POSTGRES_HOST
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PWD

ENV PORT ${PORT:-8080}
ENV POSTGRES_HOST $POSTGRES_HOST
ENV POSTGRES_DB $POSTGRES_DB
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PWD $POSTGRES_PWD


RUN \
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
		results.tap \
		;

EXPOSE ${PORT:-8080}

CMD [ "yarn", "run", "start" ]