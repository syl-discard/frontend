FROM        node:21-alpine AS build
USER        node:node
ENV         ORIGIN=${ORIGIN}
ENV         NODE_ENV=${NODE_ENV}

WORKDIR     /app
COPY        --chown=node:node . .
RUN         npm ci
RUN         npm run build
RUN         rm -rf src/ static/

CMD         ["node", "build"]