const mariadb=require('mariadb');
const date=require('date');
const { table } = require('console');
const config=require('../../config/config_db/config_db.js');
const Log=require('log');

let Date=new date();
let logger=new Log();

function db()
{
    const tableTickets='tickets';
    const tableNotifications='tickets_notify';
    const tableUpload='tickets_upload';
    //const tableStatistic='tickets_statistic';
    const tableUsers='tickets_users';

    /**Later on file */
    const statusPending=0;
    const statusProcess=1;
    const statusCompleted=2;
    const allStatus=3;
    /** */
    const notifyOn=1;
    const notifyOff=0;
    /** */
    
    let con=mariadb.createPool({
        host:config.host,
        port:config.port,
        user:config.user,
        password:config.password,
        database:config.db_name,
        acquireTimeout:config.aquireTimeout
    });
    //
    logger.log(`Connecting to database ${config.host}:${config.port}`)
    //
    /**Send data to database async*/
    /**Args Data to send */
    this.addNewData=async function(dataToAdd)
    {
        this.name=dataToAdd.name;
        this.email=dataToAdd.email;
        this.phone=dataToAdd.phone;
        this.problem=dataToAdd.problem;
        this.description=dataToAdd.description;
        this.status=statusProcess;

        this.date=Date.getDbDate();

        let cmd=`INSERT INTO ${tableTickets} (FIO,Email,Number,Problem,Description,Status,Date) VALUES ('${this.name}','${this.email}','${this.phone}','${this.problem}','${this.description}','${this.status}','${this.date}');`;

        return con.query(cmd);
    }
    this.getNewData=async function(params)
    {
        let cmd=`SELECT ${tableTickets}.*,${tableNotifications}.notify_status FROM ${tableTickets} LEFT JOIN ${tableNotifications} ON ${tableTickets}.Id=${tableNotifications}.TicketsId WHERE `;
        
        if(params.status==statusProcess)
            cmd=cmd+'Status='+statusProcess;
        else if(params.status==statusPending)
            cmd=cmd+'Status='+statusPending;
        else if(params.status==statusCompleted)
            cmd=cmd+'Status='+statusCompleted;
        else
            cmd=cmd+'1';
        cmd=cmd+' ORDER BY Id;';
        return con.query(cmd);
    }
    
    this.getAllNotifications=async function()
    {
        return con.query(`SELECT * FROM ${tableNotifications} WHERE 1 ORDER BY Id DESC`);
    }
    this.removeTicket=async function(id)
    {
        return con.query(`DELETE FROM ${tableTickets} WHERE Id = ?`,[id]);
    }    
    
    this.delNotification=async function (id) 
    {
        return con.query(`DELETE FROM ${tableNotifications} WHERE TicketsId = ?`,[id]);  
    }
    
    this.getLastId=async function() 
    {
        let cmd=`SELECT Id AS Id FROM ${tableTickets} ORDER BY Id DESC LIMIT 1;`;
        return con.query(cmd);
        //return con.query(`SELECT Id AS Id FROM ${tableTickets} ORDER BY Id DESC LIMIT 1;`);    
    }
    this.searchData=async function(params)
    {
        //let cmd=`SELECT * FROM ${tableTickets} WHERE FIO LIKE '%${params}%' OR Email LIKE '%${params}%' OR Number LIKE '%${params}%' OR Problem LIKE '%${params}%' OR Description LIKE '%${params}%';`;   
        return con.query(`SELECT * FROM ${tableTickets} WHERE FIO LIKE '%${params}%' OR Email LIKE '%${params}%' OR Number LIKE '%${params}%' OR Problem LIKE '%${params}%' OR Description LIKE '%${params}%';`);
    }
    this.addNewNotification=async function (dataToAdd) 
    {
        //this.Id=dataToAdd.lastId[0].Id;
        let id=dataToAdd.lastId;
        let msg=dataToAdd.msg;           
        return con.query(`INSERT INTO ${tableNotifications} (notify_status,TicketsId,notify_message) VALUES(?,?,?)`,[notifyOn,id,msg]);
    }
    this.checkNotification=async function()
    {
        let cmd=`SELECT notify_message AS Msg,(SELECT COUNT(*)  FROM ${tableNotifications} WHERE notify_status=${notifyOn})AS Cnt FROM ${tableNotifications} WHERE notify_status=${notifyOn};`;
        return con.query(cmd);
    }
    this.readNotification=async function (notificationId) 
    {
        
        return con.query(`UPDATE ${tableNotifications} SET notify_status=${notifyOff} WHERE TicketsId=${notificationId};`);
    }

    this.getStatistic=async function () 
    {
        
        let cmd=`SELECT COUNT(*) AS Pending,(SELECT COUNT(*) FROM ${tableTickets} WHERE Status=${statusProcess})AS Process,(SELECT COUNT(*) FROM ${tableTickets} WHERE Status=${statusCompleted})AS Completed FROM ${tableTickets} WHERE Status=${statusPending};`;
        return con.query(cmd);
        //con.query(`SELECT COUNT(*) AS Pending,(SELECT COUNT(*) FROM ${tableTickets} WHERE Status=${statusProcess})AS Process,(SELECT COUNT(*) FROM ${tableTickets} WHERE Status=${statusCompleted})AS Completed FROM ${tableTickets} WHERE Status=${statusPending};`);
    }

    
    this.getProblemsStatistic=async function(problems)  
    {
        let cmd=`SELECT COUNT(*)  AS Sign ,(SELECT COUNT(*) FROM ${tableTickets} WHERE Problem='${problems.cartridges}' AND Status=${statusCompleted}) AS Cart,(SELECT COUNT(*) FROM ${tableTickets} WHERE Problem='${problems.pass}' AND Status=${statusCompleted}) AS Pass FROM ${tableTickets} WHERE Problem='${problems.signatures}' AND Status= ${statusCompleted};`;
        return con.query(cmd);
        
    }
    /*
    this.uploadFile=async function (data) 
    {
        let cmd=`INSERT INTO ${tableUpload} (ticketId,Path) VALUES(${data.ticketId},'${data.path}');`;
        return con.query(cmd);
    }
    this.getUploadFile=async function (data) 
    {
        let cmd=`SELECT * FROM ${tableUpload} WHERE ticketId=${data.ticketId};`;
        return con.query(cmd);
    }
    */
    this.updateStatus=async function(params) 
    {
        return con.query(`UPDATE ${tableTickets} SET Status= ${params.statusTo} WHERE Id= ?`,[params.id]);
    }
    this.loginUser=async function(params) 
    {
        return con.query(`SELECT * FROM ${tableUsers} WHERE user=? `,[params.user]);
    }
    
    this.registerUser=async function (params) 
    {
        return con.query(`INSERT INTO ${tableUsers} (user,password) VALUES (?,?)`,[params.username,params.password]);
    }
    /////
    this.getUserCount = async function()
    {
        return con.query(`SELECT COUNT(*) AS count FROM ${tableUsers};`);
    }
    /////
        
}
module.exports=db;