﻿var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var fs= require('fs');
var mime = require('mime');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
//    res.send("sslforfree.com 의 3개월짜리 무료ssl의 Manually Verify Domain을 위한 temp서버");
      res.render('index', { title: 'sslforfree.com 사용법' });
});



app.get('/.well-known/acme-challenge/:filename',function(req,res){
  //var host = req.get('host');
  //HuK9nX2InbqShoM1tUbZ68REkAi61PhVVwveqCy9YjM
  console.log(req.params.filename);
  var origFileNm = req.params.filename; //기입할 필요 없음

    var file='./temp/'+origFileNm; //여기가 로칼에서 받을 파일내임
    mimetype = mime.getType(origFileNm);// look to getType
    res.setHeader('Content-disposition','attachment;filename='+origFileNm); //여기가 서버에서 보낼 파일이름해더에 정해주기
    res.setHeader('Content-type',mimetype);
    var filestream=fs.createReadStream(file);//실제파일
    filestream.pipe(res);
});


//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
const port = 4444;
const myip = "0.0.0.0";

app.listen(port, myip, function () {
  console.log('listening' + port + ' port!!!');
});

module.exports = app;
