const validate=require('validator');


function Validation()
{
    this.validateMessage=(txt)=>
    {
        if(validate.isEmpty(txt,{ignore_whitespace:true}))
            return false;
        else
            return true;
    }
    this.validateEmail=(txt)=>
    {
        if(validate.isEmail(txt,{ignore_whitespace:true}))
        {
            const mail=txt.substr(txt.indexOf('@')+1);
            if(mail==='mail.com' ||mail==='gmail.com' || mail==='yahoo.com'||mail==='hotmail.com')
                return true;
            else
                return false;            
        }
        else
            return false;
    }
    this.validateProblem=function(txt)
    {
        if(txt=='other')
            return false;
        else
            return true;
    }
    ///
    /*
    this.validateFile=function(file)
    {
        if((!file  || file==undefined))
            return false;
        
        else
        {
            let sz=Math.round((file.size/1024)/1024);
            if(sz>=100 || sz <=0)
                return false;
        }
        
        return true;
    }
    */
    ///
}
module.exports=Validation;
