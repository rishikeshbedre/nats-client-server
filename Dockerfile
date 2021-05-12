FROM alpine:3.11

RUN mkdir /home/app/ \
    && apk add --no-cache nodejs npm

WORKDIR /home/app/

COPY apis /home/app/apis
COPY client /home/app/client
COPY lib /home/app/lib
COPY package.json server.js /home/app/

RUN npm install \
    && apk del npm
    
CMD node server.js