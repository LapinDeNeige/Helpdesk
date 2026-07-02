const wrapper= require('db-wrapper');
const db_wrapper=new wrapper();

const Log=require('log');
const logger = new Log();

const jData=require('json-data');
const jsonData=new jData();

const serviceValidation = require('../services/validationService');

//const mailer = require('mail');
//const mail=new mailer();


exports.getTickets = async (request,response)=>{
	const result = await db_wrapper.getData(response);
	result?response.render('tickets',{'status':'OK','data':result}):response.render('tickets',{'status':'Error','data':{}});
};

exports.searchTickets = async (request,response)=>{

	let params=request.query.params;
	const result = await db_wrapper.searchData(params); 
	result?response.json({'status':'OK','message':result}):response.json({'status':'SrchError','message':'Error searching data'});

}
exports.postTickets = async (request,response)=>{
	if(!request.body)
        response.sendError(400);

     params=request.body.params;

     const result =await db_wrapper.getData(params);
     result?response.json({'status':'OK','data':result}):response.json({'status':'Error','data':{}});

}

exports.removeTicket = async(request,response)=>{

	let retStatus='OK';

	let ticketId=request.body.data.id;

	const delNotificationResult =  await db_wrapper.delNotification(ticketId);
	const delResult = await db_wrapper.removeTicket(ticketId);

	if(!delNotificationResult)
    	logger.log(`Error remove notifications`);

     if(!delResult)
     {
				logger.log(`Error remove ticket`);
				retStatus='Err';
     }
	response.json({'status':retStatus});
        
}

exports.getModerator = async(request,response) =>{
	const result = await db_wrapper.getData(response);
	result?response.render('moderator',{'status':'OK','data':result}):response.render('moderator',{'status':'Error','data':{}});
}
exports.updateStatus = async(request,response)=>{
    if(!request.body)
      response.sendError(400);

    const params=request.body.params;
    const result = await db_wrapper.updateStatus(params);
    result?response.json({'status':'OK','result':'Data successfully sent'}):response.json({'status':'UpdateStatError','result':'Error updating status'});
}

exports.addTicket = async (request,response)=>{
	if(!request.body)
      response.sendError('400');
    const errors = serviceValidation.validate(request.body,request.file);
    const problem=request.body.problem;
    if(errors.length > 0)
    {
      logger.log('Error sending application count ');
      response.render('result',{'status':'MsgError',errors});
    }
    else
    {
      const data=jsonData.getJsonData(request.body);
      const result = await db_wrapper.addData(data);
      if(problem=='create-e-signature')
      {
      //get
      const  fileUrl=`${request.protocol}`+'://'+`${request.headers.host}`+'/'+`${request.file.path}`.replace(/\\/g,'/');
      // //
      db_wrapper.uploadFile({'path':fileUrl});
      // //
      }
      //
      //send mail
      //
      result?response.render('result',{status:'OK',message:'Sent successfully'}):response.render('result',{status:'DBError',message:'Some error occured'});

    }


}

