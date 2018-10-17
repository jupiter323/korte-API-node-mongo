var FCM = require('fcm-push');

var serverKey = 'AAAAUFtSDWc:APA91bEXFt0FhWVgDKGOZSpqmNJQCnFBN4tmQfLDHX5taRdDVCp19RCnTHxqn9xgw9jy7U5dRpoE8MS6HiLRWQHqySvPb6FYHPCukkxo3gHnWvflImTEdpGQFSdYDRjtG7409fPys-gW';
var fcm = new FCM(serverKey);
var User = require('../models/User');
var message = {
    to: 'etX589uc63E:APA91bHZkR-DzHVTNL8_YTlXqLGgBPWgMmSXeOzw3R-6KGUXi8BPAs6AOQxOFouCIlYQ7uAWugVgluxU1KRR_5MmjKStbcVSaXQvH9NxhJhoV8hLEW_he_93GrPb-4AJUYgobhkdzxE8',
    // to: 'cj5If-hiIxA:APA91bGBuRyirfq_2IxeUYErzv1mZ8xYneS263GIPcPxs-TP0Z2Yk0Ku_D4yv-FqtsaECmzgqhLnCfsHFNpaGwk-yeR8PzxPVLpG2A94kHZIiLgD8tivMIpw-jaPveidOlJH-vYIFQZN', // required fill with device token or topics
//    to: 'epzMAWC2yvQ:APA91bFy8ealjxNbJ2kiizm2xCnNIslQgGN2D3WppMTw4GTclGlElIL6J3zg1ln71DENuHVUWtZ-ODdnXCwyhKZ3iMD_3Ze3M5uMI3nYp51yWonQ8kUeMFIPkUNbYGLqqoS1x2PHesXi'
    collapse_key: 'green',
    data: {
        your_custom_data_key: 'mydata'
    },
    notification:
    {
        title: 'Title of your push notification',
        body: 'Body of your push notification',
        sound: 'default'
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
exports.push_all = (req, res) => {
    console.log(req.body);
    User.find({}, (err, users) => {
        if (err) throw err;       
        for (var user of users) {
            if (user.fcmToken) {
                message.to = user.fcmToken;
                console.log(user.name);
                //callback style
                fcm.send(message, function (err, response) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        console.log("Successfully sent with response: ", response);
                     
                    }
                });

            }
        }
  
        res.send({ success: true, res: 'sent pushnotifications' });//success
       
    });
}

