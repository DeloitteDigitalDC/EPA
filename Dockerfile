FROM nodesource/node:jessie
# Bundle app source

ADD dist/package.json package.json
RUN npm i --production

COPY dist .

#Ports
EXPOSE 8080

ENV NODE_ENV production
ENV APIKEY $APIKEY
CMD ["node", "server/app.js"]
