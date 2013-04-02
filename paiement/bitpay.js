var https = require('https');

function newInvoice(price) {
    var newInvoice = { "price" : price, "currency" : "BTC", "posData" : "test-paiement",
        "notificationURL" : "https://riotous-refuge-9554.herokuapp.com/bitpay-notifications", "fullNotifications":true,
        "redirectURL" : "http://www.coinofglory.com"};
    var options = {
        host: 'bitpay.com',
        port: 443,
        path: '/api/invoice/',
        method: 'POST',
        auth: 'eE5qBrTa8VPXSr2yGmlDX40FvfxRhmU53ECHfxCrhM:',
        agent: false
    };

    var req = https.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var obj;
            try {
                obj = JSON.parse(data);
            } catch(e) {
                obj = {error: {type: 'parsingError', message: 'Error parsing server response'}};
            }
            console.log(obj);
        });
    });
    req.on('error', function(err) {
        console.error(err);
    });
    req.setHeader('Content-Type', 'application/json');
    var str = JSON.stringify(newInvoice);
    req.setHeader('Content-Length', str.length);
    req.end(str);
}