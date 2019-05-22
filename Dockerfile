FROM node:10-alpine
ADD package.json /package.json
RUN npm install
ADD spam.js /spam.js
ADD public /public/

ENTRYPOINT ["node",  "spam.js"]
