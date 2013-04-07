exports.amazon = {  accessKeyId : "AKIAIP42UUTR5RJIOS5Q",
                    secretAccessKey : "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",
                    s3Bucket : "coinofglory-images"
                 };
exports.bitPay = {  notificationParameter : "16acdb1f-23ad-41fc-9930-8b3dd41ba4e9cc504ed3-cb1c-4080-b666-8367b283b480",
                    status : "confirmed"
                 };
exports.mongodb = process.env['MONGODB_CONNEXION'] != null ? process.env['MONGODB_CONNEXION'] : 'localhost:27017/coinofglory';
