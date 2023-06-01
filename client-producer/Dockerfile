FROM node:hydrogen-buster

LABEL maintainer="hoplin"
LABEL contact="jhoplin7259@gmail.com"

RUN mkdir consumer
WORKDIR /consumer

COPY . /consumer
RUN yarn install\
  && yarn tsc

EXPOSE 4500

CMD [ "server" ]
ENTRYPOINT [ "yarn","run" ]