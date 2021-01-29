const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const _ = require('lodash');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// Connect Schema
mongoose.connect(process.env.MONOGO_URI || 'mongodb://dante-science-blog', { useNewUrlParser: true }, { useUnifiedTopology: true } );



let newsLetterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true}
  });

let messageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    subject: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
  });

let Subscription = mongoose.model('Subscription', newsLetterSchema); 

let Message = mongoose.model('Message', messageSchema); 


app.post("/news-letter/subscribtion", (request, response) => {

let newUser = new Subscription({name: request.body.name,
surname: request.body.surname,
email: request.body.email
})

newUser.save((error, data) => {
  if(!error){
    let responseObj = {};
    responseObj['name'] = data.name;
    responseObj['surname'] = data.surname;
    responseObj['email'] = data.email;

    //response.json({responseObj})
    response.sendFile('success-sign.html', { root: __dirname});
  }
  else{
    response.json({"error": "user information not uploaded"})
  }
})


});


app.post("/contact/message", (request, response) => {
  let userMessage = new Message({name: request.body.name,
    subject: request.body.subject,
    email: request.body.email,
    message: request.body.message
  })

  userMessage.save((error, data) => {
    if(!error){
      let responseObj = {};
      responseObj['name'] = data.name;
      responseObj['subject'] = data.subject;
      responseObj['email'] = data.email;
     responseObj['message'] = data.message;
  
      response.sendFile('message.html', { root: __dirname});
    }
    else{
      response.json({"error": "message not sent"})
    }
  })

});

//Routes

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});

app.get('/home', (req, res) => {
    res.redirect('/');
  });

app.route('/about')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/about.html');
  });

app.get('/about-us', (req, res) => {
    res.redirect('/about');
  });

app.get('/news-letter', (req, res) => {
    res.sendFile('/news-letter.html', { root: __dirname});
  });

app.get('/agriculture-blog', (req, res) => {
    res.sendFile('/agriculture.html', { root: __dirname});
 });

 app.get('/agriculture', (req, res) => {
  res.redirect('/agriculture-blog', { root: __dirname});
});

app.get('/medicine-blog', (req, res) => {
  res.sendFile('/medicine.html', { root: __dirname});
});

app.get('/medicine', (req, res) => {
  res.redirect('/medicine-blog', { root: __dirname});
});

app.get('/astronomy-blog', (req, res) => {
  res.sendFile('/astronomy.html', { root: __dirname});
});

app.get('/astronomy', (req, res) => {
  res.redirect('/astronomy-blog', { root: __dirname});
});

app.get('/tech-blog', (req, res) => {
  res.sendFile('/tech.html', { root: __dirname});
});

app.get('/tech', (req, res) => {
  res.redirect('/tech-blog', { root: __dirname});
});

app.get('/contact', (req, res) => {
  res.sendFile('/contact.html', { root: __dirname});
});

app.get('/contact-us', (req, res) => {
  res.redirect('/contact', { root: __dirname});
});

app.get('/recent-blog', (req, res) => {
  res.sendFile('/recent-blog.html', { root: __dirname});
});

app.get('/recent', (req, res) => {
  res.redirect('/recent-blog');
});

const listener = app.listen(process.env.PORT || 3500, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
  
//404 page
app.use((req, res) =>{
      res.sendFile('/404.html', { root: __dirname });
  })
