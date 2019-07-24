FROM node:alpine

ENV CELERY_BROKER_URL redis://redis:6379/0
ENV CELERY_RESULT_BACKEND redis://redis:6379/0

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "start"]
