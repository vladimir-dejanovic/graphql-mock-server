FROM ubuntu

RUN       \
    apt-get update; \
    apt-get install -y \
		 nodejs \
		 npm \
                                                 ;\
    rm -rf /var/lib/apt/lists/*	

RUN npm install -g babel-register babel-preset-env
RUN npm install -g graphql@14.0.0
RUN npm install -g graphql-tools@4.0.4
RUN npm install -g http
RUN npm install -g serve-static
RUN npm install -g finalhandler

WORKDIR /opt

COPY src/ src

RUN echo "{}" > package.json
RUN npm link babel-register babel-preset-env
RUN npm link graphql
RUN npm link graphql-tools
RUN npm link http
RUN npm link serve-static
RUN npm link finalhandler

EXPOSE 8000

CMD ["node","src/js/app.js"]
