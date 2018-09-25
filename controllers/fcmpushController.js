var FCM = require('fcm-push');

var serverKey = 'AAAAUFtSDWc:APA91bEXFt0FhWVgDKGOZSpqmNJQCnFBN4tmQfLDHX5taRdDVCp19RCnTHxqn9xgw9jy7U5dRpoE8MS6HiLRWQHqySvPb6FYHPCukkxo3gHnWvflImTEdpGQFSdYDRjtG7409fPys-gW';
var fcm = new FCM(serverKey);

var message = {
    to: 'cj5If-hiIxA:APA91bGBuRyirfq_2IxeUYErzv1mZ8xYneS263GIPcPxs-TP0Z2Yk0Ku_D4yv-FqtsaECmzgqhLnCfsHFNpaGwk-yeR8PzxPVLpG2A94kHZIiLgD8tivMIpw-jaPveidOlJH-vYIFQZN', // required fill with device token or topics
    collapse_key: 'green',
    data: {
        your_custom_data_key: 'mydata'
    },
    notification:
    {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
};


exports.pushsend = (req, res) => {
    console.log("notified");
    //callback style
    fcm.send(message, function (err, response) {
        if (err) {
            return res.status(500).send(err);
        } else {
            console.log("Successfully sent with response: ", response);
            res.send('sent pushnotification');
        }
    });

}
