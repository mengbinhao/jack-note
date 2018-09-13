let express = require('express');
let path = require('path');
let morgan = require('morgan');
//let bodyParser = require('body-parser');
//let favicon  = require('serve-favicon');

let app = express();

app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let routers = require('./router')(app);

// app.use(morgan('dev', {
//     skip: function (req, res) {
//         return res.statusCode < 400
//     }
// }));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));