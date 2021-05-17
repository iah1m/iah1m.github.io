window.onload=function setButtons()
{

  var cardTexts=[];

  var workArray=[];


  cardTexts.push('Simulati cum v-ati simtit cand ati primit prima porecla.');
  cardTexts.push('In curtea scolii vedeti un baietel impins constant de catre trei colegi mai mari. Cum reactionati in aceasta situatie?');
  cardTexts.push('Arata-ne cum reactionezi la o gluma proasta.');
  cardTexts.push('La scoala va simtiti jignit de anumite cuvinte rostite in timpul orei. Cum procedati in continuare? ');
  cardTexts.push('In pauza mare va intoarceti in clasa si gasiti o muscatura mare, in sandwich-ul vostru. Un coleg se uita amuzat la reactia ta. Ce reactie aveti?');
  cardTexts.push('Considerati jignitor un anumit cuvant, legat de aspectul vostru fizic sau vestimentar?');
  cardTexts.push('Considerati jignitor un anumit cuvant, care pentru altii nu reprezinta ceva special?');
  cardTexts.push('Considerati jignitor un anumit cuvant, care pentru altii nu reprezinta ceva special?');
  cardTexts.push('Ati regretat vreodata un cuvant sau o fapta, daca ati realizat dupa aceea ca a putut fi ofensatoare? Cum ati incercat sa remediati situatia?');
  cardTexts.push('Aveti reactii exagerat de negative atunci cand este insultata o persoana draga?');

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

