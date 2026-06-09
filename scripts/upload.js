function createUploadLink(link)
{
    let uploadImage=document.createElement('img');
    let uploadLink=document.createElement('a');
    let uploadText=document.createElement('span');
    let uploadContainer=document.createElement('span');

    //uploadImage.style='margin-left:40px;';
    uploadImage.src='../sources/download_file.svg';
    uploadImage.width=30;
    uploadImage.height=30;

    uploadLink.href=link;
    //uploadLink.style='background-image:url("./sources/file.svg")';
    
    
    uploadText.style='position:relative;top:-3px;left:-6px;';
    uploadText.innerText='Download file';

    uploadLink.appendChild(uploadImage);

    uploadContainer.appendChild(uploadText);
    uploadContainer.appendChild(uploadLink);
    return uploadContainer;
}
/////
function createUploadError()
{
    let uploadError=document.createElement('span');
    uploadError.style='color:red;';
    uploadError.innerText='Coludn load a link';
    return uploadError;
}
///// 
