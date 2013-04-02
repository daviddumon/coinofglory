var bitpay = require('../paiement/bitpay');


exports.index = function(req, res){
  res.render('bid', {});
};

exports.creation = function(req, res){
   bitpay.newInvoice(0.0001);
}