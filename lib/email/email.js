const email=require('nodemailer');
//const email=require('@sendgrid/mail');

const mailConfig=require('../config/config_email');
const { mail } = require('sendgrid');
const { error } = require('console');

function Email()
{
    var transport;
    
    this.createEmail=function(mailTo)
    {
        try
        {
            transport=email.createTransport({
                host:mailConfig.host,
                port:mailConfig.port,
                secure:mailConfig.secure,
                auth:{
                    user:mailConfig.auth.user,
                    pass: mailConfig.auth.pass,
                }
            });
            
        }
        catch(err)
        {
            throw new Error(err);
        }
    }
    
    this.sendMail= async function(mailTo,subject,message)
    { 
        try
        {
            this.createEmail(mailTo);

            let result=await transport.sendMail({
                from:mailConfig.auth.user,
                to:mailTo,
                subject:subject,
                text:message,
                
            });
            
            return result;
        }
        catch(err)
        {
            throw new Error(err);
        } 
        
    }
    
}
module.exports=Email;