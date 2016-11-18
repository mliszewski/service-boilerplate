FROM node:6-slim

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

ENV PORT=${PORT:-8080} POSTGRES_HOST=$POSTGRES_HOST POSTGRES_DB=$POSTGRES_DB \
    POSTGRES_USER=$POSTGRES_USER POSTGRES_PWD=$POSTGRES_PWD

RUN \
    yarn run clean:dusting && \
	yarn run build

WORKDIR /src

RUN rm -rf \
		.babelrc \
		.dockerignore \
		.eslint* \
		.npmrc \
		.nvmrc \
		README.md \
		gulpfile.* \
		build/* \
		src/* \
		test/* \
		.env \
		results.tap \
		*.yaml \
		*.yml \
		deploy.sh \
		;

EXPOSE ${PORT:-8080}

CMD [ "yarn", "run", "start" ]