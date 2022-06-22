FROM node:14.15-alpine3.12

COPY . /home/node/app
WORKDIR /home/node/app

RUN npm i

USER node

CMD ["/bin/sh", "-c", "npm i ; npm run build"]
