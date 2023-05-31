FROM node:hydrogen-buster

LABEL maintainer="hoplin"
LABEL contact="jhoplin7259@gmail.com"

RUN mkdir consumer
WORKDIR /consumer

COPY . /consumer
RUN yarn install\
  && yarn tsc


CMD [ "server" ]
ENTRYPOINT [ "yarn","run" ]