const email=require('nodemailer');
const path=require('path');
const Log=require('log');

require('dotenv').config({path:path.resolve(process.cwd(),'.env.email')});

const logger=new Log();

function Email()
{
    var transport;
    
    this.createEmail=function(mailTo)
    {
        try
        {
            transport=email.createTransport({
                host:process.env.MAIL_HOST,
                port:process.env.MAIL_PORT,
                secure:process.env.MAIL_SECURE,
                auth:{
                    user:process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                }
            });
            
        }
        catch(err)
        {
            logger.log(`Couldn't create mail ${err}`);
        }
    }
    
    this.sendMail= async function(mailTo,subject,message)
    { 
        try
        {
            this.createEmail(mailTo);

            let result=await transport.sendMail({
                from:process.env.MAIL_USER,
                to:mailTo,
                subject:subject,
                text:message,
                
            });
            logger.log(`User sent email successfully`);
            return result;
        }
        catch(err)
        {
            logger.log(`Couldn't sent email ${err}`);
        } 
        
    }
    
}
module.exports=Email;