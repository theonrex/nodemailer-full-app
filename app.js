const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');
const expressLayouts = require('express-ejs-layouts')


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

// app.get('/contact', (req, res) => {
//   res.render('contact');
// });

app.get('/contact', function(req, res) {
    res.sendFile('views/contact.html', {root: __dirname })
});


// app.get('/home', (req, res) => {
//   res.render('home');
// });
// Static Files
// app.use(express.static('public'))
// // Example for other folders - not required
// // app.use('/css', express.static(__dirname + 'public/css'))

// // Set Templating Engine
// app.use(expressLayouts)
// app.set('layout', './layouts/index');
// app.set('view engine', 'hbs');


// // Routes
// app.get('/', (req, res) => {
//     res.render('rex')
// })

// app.get('/contact', (req, res) => {
//     res.render('contact')
// })



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
        user: 'xxxxxxxx@gmail.com', // generated ethereal user
        pass: 'xxxxxxxx'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'xxxxxx@gmail.com', // sender address
      to: 'xxxxxxxx@gmail.com', // list of receivers
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


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//  app.use('/public', express.static(path.join(__dirname, 'public')));

// // //body parser
// app.use(bodyParser.urlencoded({ extended: false }));

//  app.use(bodyParser.json());

// //statcic folder
// app.get('/', (req, res) =>{
//     res.render('contact')
// });

// app.listen(3000, () => console.log('server'));




// // require("dotenv").config();
// // const express = require("express");
// // const app = express();
// // const cors = require("cors");
// // const connection = require("./db");
// // const userRoutes = require("./routes/users");
// // const authRoutes = require("./routes/auth");

// // // database connection
// // connection();

// // // middlewares
// // app.use(express.json());
// // app.use(cors());

// // // routes
// // app.use("/api/users", userRoutes);
// // app.use("/api/auth", authRoutes);

// // const port = process.env.PORT || 8080;
// // app.listen(port, console.log(`Listening on port ${port}...`));



// Imports
// const express = require('express')
// const expressLayouts = require('express-ejs-layouts')

// const app = express()
// const port = 3000

// // Static Files
// app.use(express.static('public'))
// // Example for other folders - not required
// // app.use('/css', express.static(__dirname + 'public/css'))

// // Set Templating Engine
// app.use(expressLayouts)
// app.set('layout', './layouts/full-width')
// app.set('view engine', 'ejs')

// // Routes
// app.get('', (req, res) => {
//     res.render('index', { title: 'Home Page'})
// })

// app.get('/about', (req, res) => {
//     res.render('about', { title: 'About Page', layout: './layouts/sidebar' })
// })

// // Listen on Port 5000
// app.listen(port, () => console.info(`App listening on port ${port}`))