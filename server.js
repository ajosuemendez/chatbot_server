const express = require('express');
const app = express();   
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 4000;

//MIDDLEWARES
app.use(cors()); // enable CORS for all routes
app.use(bodyParser.json());

//IMPROVISED DATABASE



app.get('/', async (req, res) => {
  let messages = [];

  try {
    // make a POST request to an external API
    const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        id: "default",
        message: "start"
    });

    response.data.map(obj => {
      const author = "chatBot";
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = `${Number(hours)< 10 ? "0" : ""}${hours}:${Number(minutes)< 10 ? "0" : ""}${minutes}`;
      // const time = `${hours}:${minutes}`
      const message = obj.text;

      messages.push({author:author, message:message, time:time});
    })

    res.json(messages);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});


app.post('/', async (req, res) => {
  let messages = [];
  const {body} = req;

  try {
    // make a POST request to an external API
    const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        id: body.id,
        message: body.message
    });

    response.data.map(obj => {
      const author = "chatBot";
      const message = obj.text;
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      // const time = `${hours}:${minutes}`
      const time = `${Number(hours)< 10 ? "0" : ""}${hours}:${Number(minutes)< 10 ? "0" : ""}${minutes}`;

      messages.push({author:author, message:message, time:time});
    })

    res.json(messages);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
