// TODO: round logic 


//------------------------------------inits------------------------------------ //
const socket = io({
    autoConnect: false
  });
var userInfo=[];
var lettersList=[];
var userList=[];
var chosenFirstLetter; // this is the letter that the word should start with
var regExString;
var lowercaseLetter;
var regex;
var isRoundActive;
var messagesAlreadySent=[];
var alreadyChosenLetters=[];
//--------------------------------------------------------------------------------- //



//--------------------------------------server stuff------------------------------------------- //
for (var i = 65; i <= 90; i++) {
    lettersList.push(String.fromCharCode(i));
    //console.log(i);
  }






//--------------------------------------------------------------------------------- //









//------------------------------------page on load events------------------------------------ //
window.onload=function setUsername(){

    document.getElementById("usernameInput").addEventListener('keypress', function (e) {
        if (e.key === 'Enter') 
        {
          var username=document.getElementById("usernameInput").value;
          userInfo.push(username); // we send this to the server
          sessionStorage.setItem("username",username); // we set the username as session storage 
          document.getElementById("usernamePage").style.display="none";
          document.getElementById("appPage").style.display="grid"; 
          socket.open();
        }
    });



};// window onload ends here


document.getElementById("userMessageInput").addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && isRoundActive===1) 
  {  // !! We need to make this tied to the round-- we did it now

    var userTypedMessage=document.getElementById("userMessageInput").value;
    
    if(regex.test(userTypedMessage))
    {
        //let data=[{"username":sessionStorage.getItem("username"),"message":userTypedMessage}];
        if(messagesAlreadySent.includes(userTypedMessage)) // if it has already been sent
        {
          alert("Ati mai trimis acest mesaj.");
          document.getElementById("userMessageInput").value='';
        } 
        else
        {
          messagesAlreadySent.push(userTypedMessage);
          socket.emit("sending user message",{username:sessionStorage.getItem("username"),message:userTypedMessage});
          document.getElementById("userMessageInput").value='';
        }
    }
  }
});





/*
document.getElementById("usernameInput").addEventListener('click', function () {
    
    username=sessionStorage.setItem("username",document.getElementById("usernameInput").value); // we set the username as session storage 
    document.getElementById("usernamePage").style.display="none";


});

};

*/

//--------------------------------------------------------------------------------- //







//------------------------------------signals------------------------------------ //


  socket.on("connect", () => 
  { 
      console.log("We are in.");
      socket.emit("sending user info",userInfo);
  });

  socket.on("you are the admin", () => { 
    console.log("I am the admin.");
    sessionStorage.setItem("admin","yes");
    loadAdminButtons();
  });

  socket.on("initiating user list", (data) => { 
    console.log(data);
    // we should have a list on the left side
  });

  socket.on("this is the chosen letter", (data) => { 
    chosenFirstLetter=data;
    console.log("The chosen letter is :"+chosenFirstLetter);
    regExString='^[';
    regExString+=chosenFirstLetter;
    lowercaseLetter=chosenFirstLetter.toLowerCase();
    regExString+=lowercaseLetter;
    regExString+='][a-z]{2,}$';
    //console.log(regExString);
    regex=new RegExp(regExString);
    isRoundActive=1;
    document.getElementById("selectedLetterWrapper").innerHTML="<p>Litera este : "+chosenFirstLetter+"</p>";
    //document.getElementById("selectedLetterWrapper").innerHTML+=chosenFirstLetter;
    //document.getElementById("selectedLetterWrapper").innerHTML+="</p>";
  });

  socket.on("admin started round", () => { 
    isRoundActive=1;
    //console.log("Starting round.");
  });
  
  socket.on("user message to display",(data)=>{
      document.getElementById("messagesWrapper").innerHTML+=data.username;
      document.getElementById("messagesWrapper").innerHTML+=":";
      document.getElementById("messagesWrapper").innerHTML+=data.message;
      document.getElementById("messagesWrapper").innerHTML+="<br></br>";
  });

  socket.on("sending list of users",(data)=>{
    console.log("We are getting the user list");
    document.getElementById("userList").innerHTML="<p>Lista cu utilizatorii conectati.</p>";
    for(let iterat=0;iterat<data.length;iterat++)
    {
      document.getElementById("userList").innerHTML+="<p>"+data[iterat]+"</p>";
    }
});

  socket.on("letter has been stopped",()=>{
    console.log(chosenFirstLetter+" has been stopped.");
    regex=new RegExp(" ");
    document.getElementById("messagesWrapper").innerHTML=" ";
    document.getElementById("selectedLetterWrapper").innerHTML="<p> Deocamdata nu este aleasa nicio litera. </p>";
  });

  socket.on("round has been stopped",(data)=>{
    console.log("The round has been stopped.");
    document.getElementById("userMessageInput").remove();
    console.log(data.length);
    chosenFirstLetter="////////";
    regex=new RegExp(" ");
    function compare( a, b ) {
      if ( a.Username < b.Username ){
        return -1;
      }
      if ( a.Username > b.Username ){
        return 1;
      }
      return 0;
    }
    
    data.sort( compare);
    var alreadyAddedUsers=[];
    for(let iterat=0;iterat<data.length;iterat++)
    { // this shows the messages from everyone
      if(alreadyAddedUsers.includes(data[iterat].Username) )// user is already on screen
      {
        document.getElementById("messagesWrapper").innerHTML+=","+data[iterat].Message;
      }
      else
      {
        alreadyAddedUsers.push(data[iterat].Username);
        document.getElementById("messagesWrapper").innerHTML+="<br></br>"; 
        document.getElementById("messagesWrapper").innerHTML+=data[iterat].Username;
        document.getElementById("messagesWrapper").innerHTML+=":";
        document.getElementById("messagesWrapper").innerHTML+=data[iterat].Message;
      }
    }

    

  });

  socket.on("reset pages",()=>{
    location.reload();
  });



  

//---------------------------------------------------------------------------------              //
  function loadAdminButtons()
  {

    var adminWrapper=document.getElementById("adminButtonsWrapper");
    adminWrapper.style.display="inline";
    var buttonStartRound=document.createElement("button");
    buttonStartRound.setAttribute("id", "startRound");
    buttonStartRound.textContent = 'Incepere runda.';
    adminWrapper.appendChild(buttonStartRound);

    document.getElementById("startRound").addEventListener('click', function () {
      console.log("We are starting the round:");
      socket.emit("admin starting round");
      alert("Incepe runda.");
    });

    var buttonStartLetter=document.createElement("input");
    buttonStartLetter.setAttribute("id", "startLetter");
    buttonStartLetter.placeholder = 'Alege litera.';
    adminWrapper.appendChild(buttonStartLetter);

    document.getElementById("startLetter").addEventListener('keypress', function (e) {
      if (e.key === 'Enter') 
      {  // !! We need to make this tied to the round
          var letterInput=document.getElementById("startLetter").value; // this is the input from the admin
          var UCletterInput = letterInput.toUpperCase(); // we make it upper case internally
          if(alreadyChosenLetters.includes(UCletterInput))
          {
            alert("Aceasta litera a mai fost aleasa.");
          }
          else
          {
          alreadyChosenLetters.push(UCletterInput);
          socket.emit("admin sending chosen letter",UCletterInput);
          document.getElementById("startLetter").value='';
          }
         
      }
    });

    var buttonEndLetter=document.createElement("button");
    buttonEndLetter.setAttribute("id", "endLetter");
    buttonEndLetter.textContent ='Opreste litera.';
    adminWrapper.appendChild(buttonEndLetter);

    document.getElementById("endLetter").addEventListener('click', function () {
      console.log("We are ending the letter"+chosenFirstLetter);
      socket.emit("stop with this letter");
    });

    var buttonEndRound=document.createElement("button");
    buttonEndRound.setAttribute("id", "endRound");
    buttonEndRound.textContent = 'Incheie runda.';
    adminWrapper.appendChild(buttonEndRound);

    document.getElementById("endRound").addEventListener('click', function () {
      console.log("We are the round.");
      socket.emit("admin stop round");
      isRoundActive=0;
    });

    var buttonResetPage=document.createElement("button");
    buttonResetPage.setAttribute("id", "resetPage");
    buttonResetPage.textContent = 'Resetare pagina tuturor.';
    adminWrapper.appendChild(buttonResetPage);

    document.getElementById("resetPage").addEventListener('click', function () {
      console.log("We are resetting the pages.");
      socket.emit("admin reset page");
    });


  }

  function addToUserList(username)
  {
    userList.push(username);
  }

 
