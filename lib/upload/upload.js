const multer=require('multer');
const transliterate=require('transliterate');

function Upload()
{
    const filePath='./sources/doc';
    const docxFormat='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const docFormat='application/msword';

    this.getFileName=function(nameFile)
    {
      const fileUtfName=Buffer.from(nameFile,'ascii').toString('utf8');
      return transliterate(fileUtfName);
    }

    this.fileFilter=function(request,file,cb)
    {
      cb(null,true);
      /*
      if((file.mimetype == docxFormat) ||(file.mimetype==docFormat))
        cb(null,true);
      else
        cb(null,false);
      */
    }
    this.uploadFile=function()
    {
        const storageConfig=multer.diskStorage({
            destination:(req,file,cb)=>{
              cb(null,filePath); //set file to save uploads in
            },
            filename:(req,file,cb)=>{
              cb(null,this.getFileName(file.originalname)); //file name saved
            },
          });
        
        const uploadConfig= multer({storage:storageConfig,fileFilter:this.fileFilter}); //limits:{fileSize:1*1024}
        return uploadConfig;
    }
    
}
module.exports=Upload;