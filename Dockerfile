FROM node:18-alpine

WORKDIR /app

COPY . ./

RUN yarn add --prod

RUN yarn add webpack webpack-node-externals tsconfig-paths-webpack-plugin -D

RUN yarn build

RUN yarn remove webpack webpack-node-externals tsconfig-paths-webpack-plugin

COPY dist ./dist

CMD [ "yarn", "start" ]
