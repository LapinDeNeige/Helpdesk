const fs = require('fs');
const readline=require('readline');
const Date=require('date');

///
const log_path=require('../../config/config_log/config_log.js');
///
const path_log = log_path.path;

function Log()
{
    /**Log file to */
    /**Args value message to write in file */
    this.log=function(msg)
    {
        
        try
        {
            let date=new Date();
            var message = `[APP] [${date.getDate()}] ` + msg ; //+ result
            fs.writeFileSync(path_log, message + '\n',{flag:'a'});
        }
        catch(err)
        {
            throw new Error('Log error'+err);
        }
        
    }
    this.readLog=async function()
    {
        const lineNumbers=30;
        let result=[];
        
        const fStream=fs.createReadStream(path_log);
        const rLine=readline.createInterface({
            input:fStream,
            crlfDelay:Infinity
        });
        let i=0;
        for await(const line of rLine)
        {
            if(i==lineNumbers)
                break;
            result.push(line);
            i++;
        }
        return result;
    }
    
}

module.exports=Log;