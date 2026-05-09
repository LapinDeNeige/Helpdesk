const colorActive='#015F42';
const colorInactive='#eeeeee';

const colorActiveText='white';
const colorInactiveText='black';


function checkActiveBtn()
{
    let result = Cookies.get('activeBtn');
    return result;
}
function unsetAllBtnColor()
{
    let btnAll=getBtnAll();
    let btnCompleted=getBtnCompleted();
    let btnProcess=getBtnProceed();
    let btnPending=getBtnPending();

    btnAll.style.backgroundColor=colorInactive;
    btnAll.style.color=colorInactiveText;

    btnCompleted.style.backgroundColor=colorInactive;
    btnCompleted.style.color=colorInactiveText;

    btnProcess.style.backgroundColor=colorInactive;
    btnProcess.style.color=colorInactiveText;

    btnPending.style.backgroundColor=colorInactive;
    btnPending.style.color=colorInactiveText;
}
function setActiveBtnColor()
{
    unsetAllBtnColor();
    let btnStatus=checkActiveBtn();

    let btn;
    if(btnStatus==statusAll)   
        btn=getBtnAll();
    else if(btnStatus==statusCompleted)
        btn=getBtnCompleted();
    else if(btnStatus==statusProcess)
        btn=getBtnProceed();
    else if(btnStatus==statusPending)
        btn=getBtnPending();
    else 
        btn='None';

    if(btn!='None')
    {
        btn.style.backgroundColor=colorActive;
        btn.style.color=colorActiveText;
    }    
}
function setActiveBtn(btnStatus)
{
    if(btnStatus==statusAll || btnStatus==statusCompleted ||btnStatus==statusPending || btnStatus == statusProcess)
        Cookies.set('activeBtn',btnStatus);
    
}