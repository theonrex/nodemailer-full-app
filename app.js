const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000
// const expressLayouts = require('express-ejs-layouts')
 require("dotenv").config()
 
const app = express();

// view engine setup

app.engine('html', engine({ extname: '.html', defaultLayout: "home"}));
 app.set('view engine', 'html');

 // Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.render('home');
});


app.get('/contact', function(req, res) {
    res.sendFile('views/contact.html', {root: __dirname })
});




app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.DB_USER, // generated ethereal user
        pass:  process.env.DB_PASS, // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

   
  // setup email data with unicode symbols
  let mailOptions = {
      from:  process.env.DB_FROM, // sender address
      to:  process.env.DB_TO, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

// app.listen(3000, () => console.log('Server started...'));
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))






