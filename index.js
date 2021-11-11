// dependencies
const express = require('express');
const path = require('path')
const cors = require ('cors');
const {config}  = require('./config/index.js');
const serverRoutes = require('./routes/routes.js');

// inicializations
const app = express();
// settings
app.set('view engine', 'ejs');                        // template views engine
app.set('views', path.join(__dirname, 'views'))     // views path
app.use(express.static(path.join(__dirname, './public'))) /// static css and js files for html
app.use(express.json());                              // interprets json format in post method
app.use(express.urlencoded({extended:true}));         // interprets json format in post method
app.use(cors(`${config.cors}`))                      // Middleware

const PORT = config.port                             // Global variable
serverRoutes(app);
app.listen(PORT, ()=>{console.log('server on fire, listening dotenv', PORT, config.email_support)});