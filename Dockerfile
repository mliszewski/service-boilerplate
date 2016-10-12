FROM mhart/alpine-node:6

# Create app directory
RUN mkdir -p /src

# Install app dependencies
COPY package.json /src/
RUN \
 	cd /src && \
	echo "# REPLACE ME" > README.md && \
	npm install -q && \
	npm cache clean

# Bundle app source
COPY . /src

WORKDIR /src

EXPOSE 8080
CMD [ "npm", "start"]
