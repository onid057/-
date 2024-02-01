FROM nginx:latest

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

ADD ./build ./build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]