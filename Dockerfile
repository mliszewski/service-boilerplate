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

ENV PORT=${PORT:-8080} POSTGRES_HOST=$POSTGRES_HOST POSTGRES_DB=$POSTGRES_DB \
    POSTGRES_USER=$POSTGRES_USER POSTGRES_PWD=$POSTGRES_PWD

RUN \
    yarn run clean:dusting && \
	yarn run build

WORKDIR /src

EXPOSE ${PORT:-8080}

CMD [ "yarn", "run", "start" ]