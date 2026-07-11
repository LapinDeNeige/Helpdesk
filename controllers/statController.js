const wrapper = require('db-wrapper');
const db_wrapper = new wrapper();
const isAuthenticated = require('auth');

exports.getStat = async (request,response)=>{
	const result = await db_wrapper.getStatistic();
	result?response.json({'status':'OK','result':result}):response.json({'status':'GetStatError','result':'Error getting stat'});
}
exports.getStatProblem = async(request,response)=>{
	const problem = request.query.problem;
	const result = await db_wrapper.getStatisticProblem(problem);
	result?response.json({'status':'OK','result':result}):response.json({'status':'GetStatProblemError','result':'Error getting problem stat'});
}



