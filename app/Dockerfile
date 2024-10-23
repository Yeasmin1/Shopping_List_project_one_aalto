FROM denoland/deno:alpine-1.42.2

EXPOSE 7777

WORKDIR /app

COPY . . 

RUN deno cache app.js

CMD [ "run", "--allow-env", "--allow-net", "--allow-read","--watch", "--unstable", "app.js" ]
