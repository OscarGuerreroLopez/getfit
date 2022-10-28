FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/orch .
ENV PORT=8888
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express sqlite3
CMD node ./main.js
