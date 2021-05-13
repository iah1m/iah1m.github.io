window.onload=function setButtons()
{

  var cardTexts=[];

  var workArray=[];


  cardTexts.push('Mar');
  cardTexts.push('Banana');
  cardTexts.push('Para');

  document.getElementById("nextButton").addEventListener("click",nextCard);
  document.getElementById("resetButton").addEventListener("click",resetCards);

  function setWorkArray()
  {
    workArray=[];
    cardTexts.forEach(createWorkArray);
  }
  function createWorkArray(value)
  {
    workArray.push(value);
  }
  setWorkArray();

  function nextCard() 
  {
    var randomItem = workArray[Math.floor(Math.random()*workArray.length)];
    var removeIndex=workArray.indexOf(randomItem);
    if(removeIndex==-1)
    document.getElementById("textWrapper").innerHTML="Nu mai exista cartonase."; 
    else
    {
      workArray.splice(removeIndex,1);
      document.getElementById("textWrapper").innerHTML=randomItem; 
    }
    
  }

  function resetCards() 
  {
    setWorkArray();
  }


}

