window.onload = function()
{

  var manual=getManual();
  var manualText=getManualText();
  var descarea=getDescArea();
  var name=getNameText();

  var statement = getStatement();  
  var problems = getProblems();
  
/**
 * function  on load
 */

  //statement.addEventListener('')
  problems.addEventListener('change', function() 
  {
    switch (problems.options[problems.selectedIndex].value)
    {
      case 'create-a-pass':
        manual.innerHTML = '';
        descarea.style.display = 'none';
        manual.style.display = 'block';
        manualText.style.display = 'block';
        removeUploadOption();
      break;

      case 'create-e-signature':
        manual.innerHTML = '';
        descarea.style.display = 'none';
        manual.style.display = 'block';
        manualText.style.display = 'block';
        createManual('1. ', 'Fill the PoA');
        createManual('2. ', 'Get chiefs sign');
        createManual('3. ', 'Upload sign document');
        ///
        addUploadOption();
        createUploadFile();
        ///
        
      break;

      case 'request-report-card':
        manual.innerHTML = '';
        descarea.style.display = 'none';
        manual.style.display = 'block';
        manualText.style.display = 'none';
        createManual('1', 'Get report card one');
        createManual('2', 'Get report card two');
        desc.textContent = 'Report card for ' + name.value;

        removeUploadOption();
      break;

      default:
        manual.style.display = 'none';
        manualText.style.display = 'none';
        descarea.style.display = 'block';
        //desc.textContent = '';

        removeUploadOption();
        
        break;
    }
    });
    

}

function createManual(title, description)
  {
    let manualElement = document.getElementById('manual');

    let stageElement = document.createElement('div');
    stageElement.className = 'stage'

    let newTitle = document.createElement('p');
    newTitle.className = 'stage-title';
    newTitle.textContent = title;

    let newDescription = document.createElement('p');
    newDescription.className = 'stage-description';
    newDescription.textContent = description;
    
    stageElement.appendChild(newTitle);
    stageElement.appendChild(newDescription);
    manualElement.appendChild(stageElement);
  }
  
  function blockButton(buttonId)
  {
    let btn=document.getElementById(buttonId);
    btn.disabled=true;
  }
  function unblockButton(buttonId)
  {
    let btn=document.getElementById(buttonId);
    btn.disabled=false;
  }
  ///
  function createUploadFile()
  {
    const manualElement = getManual();
    
    
    const uploadContainer=createUploadContainer();
    const uploadButton=createUploadButton();
    const uploadLabel=createUploadLabel();
    const uploadImage=createUploadImage();

    uploadLabel.appendChild(uploadImage);
    const uploadLabelText=createUploadLabelText();
    uploadContainer.appendChild(uploadLabelText);
    uploadContainer.appendChild(uploadLabel);
    uploadContainer.appendChild(uploadButton);
    manualElement.appendChild(uploadContainer);
    
  }
  
  function createUploadContainer()
  {
    let uploadContainer=document.createElement('div');
    uploadContainer.className='upload-container';
    uploadContainer.id='upload-container';

    return uploadContainer;
  }

  function createUploadButton()
  {
    let uploadButton=document.createElement('input');
    uploadButton.setAttribute('type','file');

    uploadButton.id='upload-btn';
    uploadButton.name='upload';

    //uploadButton.setAttribute('accept','application/msword');
    //
    uploadButton.setAttribute('accept','.md');
    //
    uploadButton.addEventListener('onchange',()=>{alert('selected')});
    return uploadButton;
  }

  function createUploadLabel()
  {
    let uploadLabel=document.createElement('label');
    uploadLabel.setAttribute('for','upload-btn');
    uploadLabel.className='upload-image';

    return uploadLabel;
  }

  function createUploadImage()
  {
    let uploadImage=document.createElement('img');
    uploadImage.src='../sources/upload_file.svg';
    uploadImage.width=30;
    uploadImage.height=30;

    return uploadImage;
  }
  function createUploadLabelText()
  {
    let uploadLabelText=document.createElement('label');
    uploadLabelText.className='label-text';
    uploadLabelText.innerText='Upload PoA in docx format ';

    return uploadLabelText;
  }

  function createUploadSuccessMsg(msg)
  {
     let successMsg=document.createElement('upload-container');
     successMsg.innerText='File uploaded';
     return successMsg;
  }
  function getManual()
  {
    let manual = document.getElementById("manual");
    return manual;
  }

  function getManualText()
  {
    let manualText = document.getElementsByClassName("topic-manual")[0];
    return manualText;
  }
  function getDescArea()
  {
    let descarea = document.getElementById('desc-area');
    return descarea;
  }
  function getNameText()
  {
    let name = document.getElementById('name');
    return name.value;
  }
  function getEmailText()
  {
    let email = document.getElementById('email');
    return email.value;
  }
  function getPhoneText()
  {
    let phone = document.getElementById('phone');
    return phone.value;
  }

  function getProblemText()
  {
    let problem = document.getElementById('problems');
    return problem.value;
  }
  function getDescText()
  {
    let desc=document.getElementById('description');
    return desc.value;
  }
  function getStatement()
  {
    let statement=document.getElementById('statement');
    return statement;
  }
  function getProblems()
  {
    let problems=document.getElementById('problems');
    return problems;
  }
  function getUploadButton()
  {
    let uploadButton=document.getElementById('upload-btn');
    return uploadButton; 
  }
  function getUploadContainer()
  {
    let uploadContainer=document.getElementById('upload-container');
    return uploadContainer;
  }

  function getUploadData(Name,Email,Number,Problem,Description=null)
  {
    let result={name:Name,email:Email,number:Number,problem:Problem,description:Description};
    return result;
  }

  
  function addUploadOption()
  {
    const form=document.getElementById('statement');
    form.setAttribute('enctype','multipart/form-data');
  }
  function removeUploadOption()
  {
    const form=document.getElementById('statement');
    if(form.hasAttribute('enctype'))
      form.removeAttribute('enctype')
  }
  
