exports.amazon = {  accessKeyId : "AKIAIP42UUTR5RJIOS5Q",
                    secretAccessKey : "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",
                    s3Bucket : "coinofglory-images",
                    s3HttpPrefix : "http://s3.amazonaws.com/coinofglory-images/"
                 };
exports.bitPay = {  status : "confirmed",
                    invoiceOptions : {
                        host: 'bitpay.com',
                        port: 443,
                        path: '/api/invoice/',
                        method: 'POST',
                        auth: 'eE5qBrTa8VPXSr2yGmlDX40FvfxRhmU53ECHfxCrhM:',
                        agent: false
                    },
                    invoiceParameters : {
                        notificationURL: "https://riotous-refuge-9554.herokuapp.com/bitpay-notifications",
                        notificationParameter : "16acdb1f-23ad-41fc-9930-8b3dd41ba4e9cc504ed3-cb1c-4080-b666-8367b283b480",
                        fullNotifications: true,
                        redirectURL: "http://www.coinofglory.com"
                    }

                 };
exports.mongodb = process.env['MONGODB_CONNEXION'] != null ? process.env['MONGODB_CONNEXION'] : 'localhost:27017/coinofglory';
