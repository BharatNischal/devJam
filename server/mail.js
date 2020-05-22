const nodemailer =require('nodemailer');
// Setting Up Dotenv for .env files environment variable               
const dotenv = require('dotenv');
dotenv.config();


console.log(process.env.mail_user);
console.log(process.env.mail_client_id);
console.log(process.env.mail_client_secret);
console.log(process.env.mail_refresh_token);
console.log(process.env.mail_access_token);

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.mail_user,
        clientId: process.env.mail_client_id,
        clientSecret: process.env.mail_client_secret,
        refreshToken: process.env.mail_refresh_token,
        accessToken: process.env.mail_access_token
        
    }
});

module.exports=function(mailOptions,callback){
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        if(info){
            console.log('Message sent: ' + info.response);
            callback(error,info.respone);
        }else{
            callback(error,null);
        }
    });
}
