
function jsonData()
{
	/**Return data received from client in form of json */
	/**Args data in form of array */
	this.getJsonData = function (data)
	{
	  const  retData={"name":`${data.name}`,
	                "phone":`${data.phone}`,
	                "email":`${data.email}`,
	                "problem":`${data.problem}`,
	                "description":`${data.description}`
	                };

	  return retData;
	}
	this.getJsonDataStatistic = function (data)
	{
	  const resultData={'Pending':`${data.Pending}`,
	                  'Status':`${data.Status}`,
	                  'Process':`${data.Process}`,
	                  'Completed':`${data.Completed}`
	                  };
	  return resultData;
	}
	this.getJsonDataNotify = function (data)
	{
	  let arr_data=[];
	  for(i=0;i<data.length;i++)
	    arr_data.push(data[i].Msg);

	  let result_data={'Cnt':`${data.Cnt}`,
	                  'Msg':JSON.stringify(arr_data)
	                  };
	  return result_data;
	}
	this.getJsonProblemStatistic = function (data)
	{
	  const resultData={'Sign':`${data.Sign}`,
	                  'Cart':`${data.Cart}`,
	                  'Pass':`${data.Pass}`
	  };
	  return resultData;
	}
	/*
	this.getJsonUploadData = function (data)
	{
	  const resultData={
	    'ticketId': `${data[0].ticketId}`,
	    'Path':`${data[0].Path}`
	  };

	  return resultData;
	}
	*/
	this.getJsonUserCount = function(data)
	{
		const resultData={
		  'count':`${data.count}`
		}
		return resultData;
	}
} 

module.exports=jsonData;