const wrapper= require('db-wrapper');
const db_wrapper=new wrapper();

exports.uploadFile = async (request,response)=>{

	let ticketId=request.body.ticketId;
	const result = await db_wrapper.uploadFile({'ticketId':ticketId});
	result?response.json({'status':'OK','result':result}):response.json({'status':'GetUploadError','result':'Error getting file'});
}
exports.getUpload = async(request,response)=>{

	let ticketId=request.body.ticketId;
	const result = await db_wrapper.getUploadFile({'ticketId':ticketId});
	
	result?response.json({'status':'OK','result':result[0]}):response.json({'status':'GetUploadError','result':'Error getting file'});
    
}   

 
