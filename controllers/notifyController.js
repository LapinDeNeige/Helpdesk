const wrapper = require('db-wrapper');
const db_wrapper = new wrapper();

exports.getNotify = async (request,response)=>{
	const result = await db_wrapper.getAllNotifications();
	result?response.json({'status':'OK','message':result}):response.json({'status':'ReadAllNotifyError','message':'Error getting notifications'});
}
exports.checkNotify = async(request,response)=>{
	const result = await db_wrapper.checkNotifications(response);
	result?response.json({'status':'OK','message':result}):response.json({'status':'ChckNotifyError','message':'Error getting notifications'});
}
exports.readNotify = async(request,response)=>{
	const param = request.body.params;
	const result= await db_wrapper.readNotification(param);
	result?response.json({'status':'OK',}):response.json({'status':'ReadNotifyError'});
}
exports.delNotify = async(request,response)=>{
    const id=request.body.params;
    const result = await db_wrapper.delNotification(id);
    result?response.json({'status':'OK'}):response.json({'status':'DelNotifyErr'});
}