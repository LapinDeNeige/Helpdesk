const wrapper= require('db-wrapper');
const db_wrapper=new wrapper();

exports.registrationGet = async (request,response) =>{
	response.render('registration');
} 
exports.registrationPost = async(request,response)=>{
	const data={username:request.body.username,password:request.body.password};
	const result = await db_wrapper.registerUser(data);
	result?response.render('registerResult',{'status':'OK'}):response.render('registerResult',{'status':'Error'});
	
}
