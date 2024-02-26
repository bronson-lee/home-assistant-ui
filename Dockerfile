FROM node:21-alpine as base

WORKDIR /apt

COPY package.json .

COPY yarn.lock .

RUN yarn install 


FROM base as build

WORKDIR /apt

COPY src src

RUN yarn build


FROM node:21-alpine

WORKDIR /apt

COPY --from=build /apt/src/server src/server

COPY --from=build /apt/node_modules node_modules

COPY --from=build /apt/package.json .

EXPOSE 8080

CMD ["yarn", "start"]