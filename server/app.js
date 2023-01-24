var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

var clientesRouter = require('./routes/clientes');
var contratosRouter = require('./routes/contratos');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/clientes', clientesRouter);
app.use('/contratos', contratosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(
  // "mongodb://localhost/mini-core",
  "mongodb+srv://admin:q0ARnQn4kuG6iCzR@cluster0.e9tj8o8.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true},
  (err, res) =>{
    if(err){
      console.log("Error de conexión MongoDB");
    }else{
      console.log("Conexión a MongoDB exitosa");
      mongoose.set('strictQuery', false);
      app.listen(4000, () => {
        console.log("Servidor corriendo en http://localhost:4000")
      });
    }
  }
)


module.exports = app;
