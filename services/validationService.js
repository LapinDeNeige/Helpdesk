const validation=require('validation');
const validate = new validation();

const wrapper= require('db-wrapper');
const db_wrapper=new wrapper();

const Log=require('log');
const logger= new Log();

exports.validate= (body,file)=>{
	const name=body.name;
    const email=body.email;
    const phone=body.phone;
    const problem=body.problem;
    const description=body.description;

    let descValidationResult=null;
    let uploadValidationResult=null;

    const nameValidationResult=validate.validateMessage(name);
    const emailValidationResult=validate.validateEmail(email);
    const phoneValidationResult=validate.validateMessage(phone);


    (problem=='create-e-signature' ||problem=='create-a-pass'||problem=='request-report-card') ? descValidationResult=true : descValidationResult=validate.validateMessage(description);
    
    (problem=='create-e-signature')?uploadValidationResult=file : uploadValidationResult=true;

    const problemValidationResult=validate.validateProblem(problem);
        
    const  errorMessage=[];

      if(!nameValidationResult)
        errorMessage.push('name');
      if(!emailValidationResult)
        errorMessage.push('email');
      if(!phoneValidationResult)
        errorMessage.push('phone');
      if(!descValidationResult)
        errorMessage.push('description');
      if(!problemValidationResult)
        errorMessage.push('problem');

      if(!uploadValidationResult) 
        errorMessage.push('upload');
      
      logger.log(`Error sending application`);
      console.log(`Error sending application`);
    
    return errorMessage;
} 
