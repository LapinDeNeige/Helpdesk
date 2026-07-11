function date()
{
    this.getDate=function()
    {
        let date = new Date();
        let month = date.getMonth() > 10 ? date.getMonth().toString(): "0" + (date.getMonth() + 1).toString();
        let hour = date.getHours() > 10 ? date.getHours().toString(): "0" + date.getHours().toString();
        let min = date.getMinutes() > 10 ? date.getMinutes().toString(): "0" + date.getMinutes().toString();
        let sec = date.getSeconds() > 10 ? date.getSeconds().toString(): "0" + date.getSeconds().toString();
        return `${date.getDate()}.${month}.${date.getFullYear()} | ${hour}:${min}:${sec}`; 
    }
    this.getDbDate=function()
    {
        let date=new Date();
        let year=(date.getFullYear()).toString();
        let month = (date.getMonth()+1).toString();
        let day=(date.getDate()).toString();
        let hour = (date.getHours()).toString();
        let min = (date.getMinutes()).toString();
        let sec = (date.getSeconds()).toString();

        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
}
module.exports=date;