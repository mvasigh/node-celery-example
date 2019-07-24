require('dotenv').config()
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const celery = require("node-celery");
const client = celery.createClient({
  CELERY_BROKER_URL: process.env.CELERY_BROKER_URL,
  CELERY_RESULT_BACKEND: process.env.CELERY_RESULT_BACKEND,
  CELERY_ROUTES: {
    'tasks.add': {
      queue: 'add-queue'
    }
  }
});

client.on("error", function(err) {
  console.error(err);
});

client.on("connect", function() {
  app.get('/add', (req, res) => {
    console.log('handling request')
    const { a, b } = req.query;
    const result = client.call('tasks.add', [a, b])
    setTimeout(() => {
      result.get(data => res.send(data))
    }, 4000)
  })
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
