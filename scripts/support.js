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
        //desc.textContent = 'Создание пропуска на ' + name.value;

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
  