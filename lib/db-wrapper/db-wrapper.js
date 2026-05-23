const bcrypt=require('bcrypt');
const mariadb=require('db');
const Log=require('log');
const jData=require('json-data');

const config=require('../../config/config_db/config_db.js');

const db=new mariadb();
const logger=new Log();
const jsonData=new jData();

function getProblem(problemStatus)
{
  //TO JSON FILE 
  let retProblem;
  if(problemStatus=="not-access-folder")
    retProblem="Problems accessing folder";
  else if(problemStatus=="not-access-network")
    retProblem="Peoblems with internet";
  else if(problemStatus=="not-access-cartridge")
    retProblem="Cartrigge change";
  else if(problemStatus=="not-access-programm")
    retProblem="Issues with programm";
  else if(problemStatus=="not-access-printer")
    retProblem="Problems with printer";
  else if(problemStatus=="not-access-phone")
    retProblem="Problems with phone";
  else
    retProblem="Other";

    return retProblem;
}

function db_wrapper()
{
	/**Add data to database */
	/**Arg message to add */
	this.addData=async function (msg)
	{
	    try
	    {
	      await db.addNewData(msg);
	      let lastId=await db.getLastId();

	      await db.addNewNotification({'lastId':lastId[0].Id,'msg':msg.problem});

	      let problem=getProblem(msg.problem);
	      logger.log(`${msg.name} sent new application ${problem} number ${lastId[0].Id}`);

	      return true;
	    }
	    
	    catch(err)
	    {  
	    	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    	logger.log('Error adding ticket');

	      if(err.message=='Mail error')
	      {
	        //logger.log(`Mail error ${err}`);        
	        return true;
	      }
	      //else
	        //logger.log(`Error ${err}`);
	      return false;
	    
	    
	    }
	}

	this.getData = async function (params) 
	{
	  try
	  {
	    const result=await db.getNewData(params);
	    return result;
	  }
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to ${config.host}:${config.port}`)
	    logger.log(`Error getting data ${err}`);
	    return false;
	  }

	}

	this.searchData = async function (params) 
	{
	  try
	  {
	    const result=await db.searchData(params);
	    logger.log(`Data found successfully`);
	    return result;
	  }
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    logger.log(`Error searching data ${err}`);
	    return false;
	  }
	}

	this.getAllNotifications = async function() 
	{
	    try
	    {
	      const result=await db.getAllNotifications();
	      return result;
	    }
	    catch(err)
	    {
	    	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	      logger.log('Error getting notification');
	      return false;
	    }
	}
	this.readNotification = async function (params) 
	{
	  try
	  {
	    await db.readNotification(params);
	    logger.log(`Notification read `);
	    return true;
	  }
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    logger.log(`Error reading notification ${err}`);
	    return false;
	    
	  }

	}
	this.delNotification = async function (params) 
	{
	  try
	  {
	    await db.delNotification(params);
	    return true;
	  } 
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    logger.log(`Error removing notification ${err}`);
	    return false;

	  } 
	}
	this.updateStatus = async function (params)
	{
	  try
	  {
	    db.updateStatus(params);
	    
	    if(params.sendMail)
	    {
	      const problem=getProblem(params.mailData.problem);
	      ///
	      //sendEmail(params.mailData.email,'Сайт техподдержки',`Уважаемый сотрудник! Ваша заявка  на ${problem} выполнена`); 
	      ///
	    }
	    return true;
	  }
	  catch(err)
	  {
	  	logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    if(err.message=='Mail error')
	      res.json({'status':'OK','message':'Your application has been sent'});
	    else
	    {
	      logger.log(`Error updating status ${err}`);
	      return false;
	    }
	  }
	}
	this.getLogin= async function (params) 
	{
	  try
	  {
	    const username=params.user;
	    const password=params.password;

	    const result= await db.loginUser(params);

	    if(result.length > 0)
	    {
	      const match=bcrypt.compareSync(password,result[0].password);
	      if(match && (username==result[0].user)) 
	      {
	      	logger.log('User auth successfully');
	        return true;
	      }
	      else
	      {
	      	logger.log(`User auth failed with username ${username}`);
	        return false;  
	      }
	    }
	      else
	      {
	      	logger.log(`User auth failed with empty creds`);
	        return false;
	      }
	    }
	    catch(err)
	    {
	    	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	      logger.log('Error auth user');
	      logger.log(err);

	      return false;
	    }

	}

	this.registerUser = async function (params) 
	{
	  try
	  {
	    const password=params.password;

	    const hashPassword=bcrypt.hashSync(password,10);
	    const data={username:params.username,password:hashPassword};

	    await db.registerUser(data);
	    return true;
	  }
	  catch
	  {
	    logger.log('Error registering user');
	    logger.log(err);

	    return false;
	  }
	}
	this.getStatistic = async function ()
	{
	  try
	  {
	    let result=await db.getStatistic();
	    let dataResult=jsonData.getJsonDataStatistic(result[0]); 

	    return dataResult;
	  }
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    logger.log(`Error getting stat ${err}`);
	    return false;
	  }
	}
	this.checkNotifications= async function (res)
	{
	  try
	  {
	    const result=await db.checkNotification();
	    let result_data;

	    if(result.length > 0)
	      result_data=jsonData.getJsonDataNotify(result[0]);
	    else
	      result_data={'Cnt':'0','Msg':'empty'};

	    return result_data;
	  }
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    logger.log(`Error getting notifications ${err}`);
	    return false;
	  }
	}
	this.getStatisticProblem = async function () 
	{
	  try
	  {
	    const problems={signatures:'create-e-signature',cartridges:'not-access-cartridge',pass:'create-a-pass'};

	    const result=await db.getProblemsStatistic(problems);
	    const dataResult=jsonData.getJsonProblemStatistic(result[0]);

	    return dataResult;
	  }  
	  catch(err)
	  {
	  	//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
	    logger.log(`Error getting stat ${err}`);
	    return false;
	  }
	}
	
	this.removeTicket = async function(params)
	{
		try
		{
			await db.delNotification(params);
			await db.removeTicket(params);
			logger.log('Ticket removed successfully');
			return true;
		}
		catch(err)
		{
			//logger.log(`Failed to connect to database server ${config.host}:${config.port}`);
			logger.log(`Error removing ticket ${err}`);
			return false;
		}
	}
	
	this.getUserCount = async function()
	{
		try
		{
			const result  = await db.getUserCount();
			const userCount = jsonData.getJsonUserCount(result[0]);
			
			return userCount;
		}
		catch(err)
		{
			logger.log(`Error getting user count ${err}`);
			return false;
		}
	}
	
}

module.exports=db_wrapper;