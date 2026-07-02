const dbWrapper=require('db-wrapper');
const db_wrapper = new dbWrapper();

exports.getStat = async (request,response) =>{

  const result = await db_wrapper.getStatistic();
  (!result)?response.json({'status':'GetStatError','result':'Error getting status'}):response.json({'status':'OK','result':result});
  
} 

exports.getStatProblem = async(request,response)=>{
  
  let problem=request.query.problem;
  const result = await db_wrapper.getStatisticProblem(problem);
  (!result)?response.json({'status':'GetStatProblemError','result':'Error getting problem status'}):response.json({'status':'OK','result':result});
  
}