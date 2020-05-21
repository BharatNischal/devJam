const nodemailer =require('nodemailer');
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
        accessToken: process.env.mail_access_token,
        expires: Number(process.env.expires)
    }
});

module.exports=function(mailOptions,callback){
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        console.log('Message sent: ' + info.response);
        callback(error,info.respone);
    });
}
