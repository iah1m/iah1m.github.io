window.onload=function setButtons()
{

  var cardTexts=[];

  var workArray=[];


  cardTexts.push('Arată-ne cum te-ai simțit atunci când ai primit prima ta porecla. Ne poți împărtăși acea poreclă?');
  cardTexts.push('În curtea școlii vezi un băiat împins constant de către trei colegi mai mari. Cum reacționezi în această situație?');
  cardTexts.push('Arată-ne ce faci atunci când ți se adresează o glumă proastă.');
  cardTexts.push('La școală te simți jignit de anumite cuvinte rostite în timpul orei. Cum procedezi în continuare?');
  cardTexts.push('În pauza mare te întorci în clasa și găsești lipsă, în sandwich-ul tău, "o mușcătură mare". Un coleg se uită insistent la tine. Ce reacție vei avea?');
  cardTexts.push('Consideri jignitor un anumit cuvânt, legat de aspectul tău fizic sau vestimentar?');
  cardTexts.push('Consideri jignitor un anumit cuvânt, care, poate pentru alții, nu reprezintă ceva special?(ex:"aragaz cu patru ochi"');
  cardTexts.push('Ai regretat vreodată un cuvânt sau o faptă, dupa ce ai realizat că a putut fi ofensatoare? Cum ai încercat să remediezi situația?');
  cardTexts.push('Ai reacții exagerat de negative atunci când îți este insultată o persoană dragă?');
  cardTexts.push('Dacă ai întalni pe stradă o persoană cu comportament vizibil agresiv, ce ai face?');
  cardTexts.push('Spune ceva care să nu fie pe placul colegilor tăi.');
  cardTexts.push('Când ești suparat/ă, fața ta arată așa: ":(". Arată-ne o față tristă.');
  cardTexts.push('Spune-ne ce te poate întrista pe tine.');
  cardTexts.push('Ce te înfurie de obicei? Arată-ne o față furioasă.');
  cardTexts.push('Povestește-ne o situație în care ai fost umilit/ă.');
  cardTexts.push('Spune-ne o situație în care te înfurii de obicei, și cum reușești să te calmezi.');
  cardTexts.push('Cunoști vreun mod sau o strategie de a pune capăt unei situații de bullying? Ne-o poți împărtăși?');
  cardTexts.push('Povestește-ne o situație în care ai fost victimă.');
  cardTexts.push('Dă-ne exemple de întrebări pe care le-ai pune, ipotetic vorbind, unei persoane agresive.');
  cardTexts.push('Cum ai putea tu să ajuți o victimă?');
  cardTexts.push('Viața are și momente amuzante. Hai să rădem! Povestește-ne o situație hazlie în care ai fost implicat/ă.');
  cardTexts.push('În școala ta s-au derulat activități anti-bullying? Te-ai implicat? Ți s-au părut utile?');
  cardTexts.push('Dacă ai fi regele/regina unui mic regat de pe o insulă neștiută, spune ce legi ai implementa împotriva violenței.');
  cardTexts.push('Sari în sus și strigă de trei ori: "Eu voi reuși ce îmi propun!".');
  cardTexts.push('Un prieten este rănit în parc, la joacă. Nu este grav, dar plânge. Cum îl încurajezi?');
  cardTexts.push('Continuă în trei feluri diferite propoziția :"Eu pot ...".');
  cardTexts.push('Spune-ne cel puțin o situație pe care nu o poți controla, deci nu trebuie să te simți prea stresat de ea.');
  cardTexts.push('Ce l-ai învăța pe un prieten timid să facă, pentru a face față mai ușor situațiilor în care este "pus la colț".');
  cardTexts.push('Când ai o problemă sau ești într-o situație delicată, la cine apelezi? Cui îi ceri ajutorul?');
  cardTexts.push('Povestește-ne cum "te-ai liniștit" după o situație în care un coleg te-a umilit/supărat.');
  cardTexts.push('Enumeră trei trăsături care sunt des folosite pentru a crea porecle/jigniri.(greutate, voce ș.a.)');
  cardTexts.push('Numește o persoană căreia îi arăți empatie în viața de zi cu zi. Cum ești tu empatic?');

  document.getElementById("nextButton").addEventListener("click",nextCard);
  document.getElementById("resetButton").addEventListener("click",resetCards);

  document.getElementById("attentionWrapper").innerHTML="ATENȚIE!";
  document.getElementById("attentionWrapper").innerHTML+="<br>";
  document.getElementById("attentionWrapper").innerHTML+="Niciun răspuns nu este obligatoriu.";
  document.getElementById("attentionWrapper").innerHTML+="<br>";
  document.getElementById("attentionWrapper").innerHTML+="Dacă nu dorești să răspunzi la sarcina de pe un cartonaș, poți alege altul.";
  document.getElementById("attentionWrapper").innerHTML+="<br>";
  document.getElementById("attentionWrapper").innerHTML+="Dacă nu dorești să răspunzi la niciun cartonaș, spune 'Next' sau 'Pass'.";
  document.getElementById("attentionWrapper").innerHTML+="<br>";
  document.getElementById("attentionWrapper").innerHTML+=" Tu știi că activitățile cu psihologul nu au caracter obligatoriu, ele fiind pur voluntare.";
  document.getElementById("attentionWrapper").innerHTML+="<br>";

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
    document.getElementById("textWrapper").innerHTML="Nu mai există cartonașe."; 
    else
    {
      workArray.splice(removeIndex,1);
      document.getElementById("textWrapper").innerHTML=randomItem; 
    }
    
  }

  function resetCards() 
  {
    setWorkArray();
    document.getElementById("textWrapper").innerHTML=" "; 
  }
}

