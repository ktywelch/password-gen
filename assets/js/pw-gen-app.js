var btnSaveIt = document.getElementById("btnSaveIt");
var btnClose = document.getElementById("btnClose");
//var list = document.getElementById("retPWCont");
//list.removeChild(list.childNodes[0]);  

//setting some variable as global and stings will be arrays 
const charTypes = ["nums", "upLet", "lowLet", "spChar"];
const spcChar = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
let spcCharA = spcChar.split('');
const upChar = "ABCDEFGHIJKLMNOPQURSTUVXYZ";
let upCharA = upChar.split('');
const numChar = "123456789"
let numCharA = numChar.split('');
const lowChars = upChar.toLowerCase();
let lowCharA = lowChars.split('');
const emCharA = ["128512","128513","128514","128515","128516","128517","128518","128519","128520","128521","128522","128523",
"128524","128525","128526","128527","128528","128529","128530","128531","128532","128533","128534","128535"];
const pwReqS = [];
var totChars = 0;

// setting up data dictionary and methods
var dict = {
  nums: false,
  numsC: 0,
  upLet: false,
  upLC: 0,
  lowLet: false,
  lowLC: 0,
  spChar: false,
  spCC: 0,
  emChar: false,
  emCC: 0,
  numsTrue: function() {this.nums = true; pwReqS.push.apply(pwReqS, numCharA); this.numsC = 1},
  upLetTrue: function() {this.upLet = true ; pwReqS.push.apply(pwReqS, upCharA); this.upLC = 2},
  lowLetTrue: function() {this.lowLet = true; pwReqS.push.apply(pwReqS, lowCharA); this.lowLC = 2},
  spCharTrue: function() {this.spChar = true; pwReqS.push.apply(pwReqS, spcCharA); this.spCC = 2},
  emCharTrue: function() {this.emChar = true; pwReqS.push.apply(pwReqS, emCharA); this.emCC = 1}
}

// Function calls pw create, calls verify and once completed updates the card
function createReturnPW(){
    let   veriConv = "", var1 ="", newPw = [], isGood = "", n=0;
     // Going to keep generating passwords until we get one that min 2 of each type
     while(isGood !== "ok"){
        newPw.length = 0; 
        newPw = genPW(totChars);
        isGood = veriPW(newPw);
      } 
    // to support emojis need to make the  decimal value emojis viewable 
      for (let i = 0; i< newPw.length;i++){
         currChar = newPw[i];
      if (currChar > 1){
        var1 = String.fromCodePoint(parseInt(currChar));
      } else {
        var1 = currChar;
      }
    veriConv = veriConv + var1;
    }

     //Return the password to the user in container by usging get the element ID where I want this to go
     updateCard("This is your New Password",veriConv);
     setTimeout(() => { window.location.reload();  }, 4000);
    }

//Function to get the parameters from the form 
function checkForm(){
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
//get the value of the field pwLen
totChars = document.getElementById('pwLen').value;
/*put if checkboxes are true or false update the dict object so that I can use it later
the methods also prepares the characters for we will be using to generate the password*/
for (var i = 0; i < checkboxes.length; i++) {
  let nm=checkboxes[i].name;
  let val=checkboxes[i].checked;
  if (nm === "nums" && val)
  {dict.numsTrue()}
  if (nm === "upLet" && val)
  {dict.upLetTrue()}
  if (nm === "lowLet" && val)
  {dict.lowLetTrue()}
  if (nm === "spChar" && val)
  {dict.spCharTrue()}
  if (nm === "emChar" && val)
  {dict.emCharTrue()}
}
 //using the dict object to make sure at least one character type is selected and num of characters between 8 and 128 
if((dict.nums||dict.upLet||dict.lowLet||dict.spChar||dict.emChar) &&  (totChars >= 8 &&  totChars <= 128)) {
  // Hide the modal again
  $('#criteriaModal').modal('hide')
// let's create our passowrd and reset form so we can run again
   createReturnPW();
   cleanUpForm("click");
// otherwise alert and let user correct
 } else {
   alert("Number of Characters must be between 8 and 128 and at least one character type must be selected");
   let formLabel = document.getElementById("criteriaModalLabel")
    formLabel.setAttribute ("class","heading");
    formLabel.innerHTML = "Please try again";
 }
}

function cleanUpForm(e) {
  e.preventDefault();
  // cleans up the variables! 
  document.getElementById("criteriaForm").reset();
  let formLabel = document.getElementById("criteriaModalLabel")
  formLabel.setAttribute ("class","normal");
  formLabel.innerHTML = "Please Select your Criteria";
  pwReqS.length = 0;
}

//Put updating the card into a function
function updateCard(textH,textP) {
  let pwContainer = document.getElementById("retPWCont");
  let newH1 = document.createElement("h1");
  let newP = document.createElement("p");
  let newP2 = document.createElement("p");
  newH1.textContent = textH;
  newH1.setAttribute("class","heading")
  newP.textContent = textP;
  newP.setAttribute("class","paragraph")
  newP2.textContent = "Password will remain on screen for 4 seconds"
  newP2.setAttribute("class","notification")
  pwContainer.appendChild(newH1);
  pwContainer.appendChild(newP);
  pwContainer.appendChild(newP2);
  document.querySelector("#mainBtn").style.visibility = 'hidden'; 
}

//Function to generate random password that should meet the length criteria 
function genPW (totChars) {
  let randPw = [], rnd=0;
  console.log("from Gen pass " + pwReqS + " num " + pwReqS.length);
  for (let k=1;k <= totChars; k++){
     rnd = Math.floor(Math.random() * pwReqS.length);
     randPw.push(pwReqS[rnd]);
    }
      return randPw;
}



/* purpose verify we have the minumums as specified indict before returning value */
function veriPW(passW) {

  let noNum = 0, noLow = 0, noUp = 0, noEm = 0, noSp = 0;
  let verified ="no", var1 = "";
  let veriConv = [];
  //if count how many of each we have
    
      for (let i=0;i < passW.length;i++) {
      let currChar =   passW[i];

        if (numCharA.includes(currChar)){
          noNum = noNum + 1;
         } else if (lowCharA.includes(currChar)) {
           noLow = noLow + 1;
         } else if (upCharA.includes(currChar)) {
           noUp = noUp + 1;
         } else if (spcCharA.includes(currChar)) {
           noSp = noSp + 1;
         } else if (emCharA.includes(currChar)) {
          noEm = noEm + 1;
        }
      }
      
     
        // if checking if criteria is met and will return if validated
        if((noNum >= dict.numsC) && (noLow >= dict.lowLC) && (noUp >= dict.upLC) && (noSp >= dict.spCC || noEm >= dict.emCC)){
        verified = "ok";
        } else {
          verified= "nope";
        }
          return verified;
}

btnSaveIt.addEventListener("click",checkForm);
btnClose.addEventListener("click",cleanUpForm);
