var express = require('express')
    , routes = require('./routes')
    , about = require('./routes/about')
    , bid = require('./routes/bid')
    , bitpayNotifications = require('./routes/bitpay-notifications')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hjs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/about', about.index);
app.get('/bid', bid.index);
app.post('/bid', bid.creation);
app.post('/bitpay-notifications', bitpayNotifications.add);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
