var express=require('express');
var url=require('url');
var app=express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);
app.get('/getData',function (req,res,next) {
    var queryValue=url.parse(req.url).query;
    if(queryValue==='fortunewheel@sina.com'){
        res.send(true);
    }else {
        res.send(false);
    }
})
app.listen(3000);