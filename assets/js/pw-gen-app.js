
// modal is handle within the HTML - this is where we do the password stuff
document.getElementById("btnSaveIt").onclick = checkForm;
document.getElementById("btnClose").onclick = cleanUp;

//these need to be global" 
const charTypes = ["nums", "upLet", "lowLet", "spChar"];
const spcChar = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
const upChar = "ABCDEFGHIJKLMNOPQURSTUVXYZ";
const numChar = "123456789"
const lowChars = upChar.toLowerCase();
const emCharA = ["128512","128513","128514","128515","128516","128517","128518","128519","128520","128521","128522","128523",
"128524","128525","128526","128527","128528","128529","128530","128531","128532","128533","128534","128535"];
const pwReqS = [];
 totChars = 0;
// need to have the strings as arrays
let spcCharA = spcChar.split('');
let upCharA = upChar.split('');
let numCharA = numChar.split('');
let lowCharA = lowChars.split('');

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


// Function calls others and returns the value to the form
function createReturnPW(){
 let   veriConv = "", var1 ="";
     //generate random password that should meet the criteria  
     let newPw = [], isGood = "", n=0;

     // Going to keep generating passwords until we get one that min 2 of each type
     while(isGood !== "ok"){
        newPw.length = 0; 
        newPw = genPW(totChars);
        isGood = veriPW(newPw);
      } 
    // Now that we have emojis need to make the emojis viewable in the paragraph string
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
     let pwContainer = document.getElementById("retPWCont");
     let newH1 = document.createElement("h1");
     let newP = document.createElement("p");

     newH1.textContent = "Generated Password";
     newH1.setAttribute("class","heading")
     newP.textContent = veriConv;
     newP.setAttribute("class","paragraph")
     pwContainer.appendChild(newH1);
     pwContainer.appendChild(newP);
      
    }




function checkForm(){
/*Function to get the parameters from the form and verify 
at least one type is selected and that the # of characters is betwwen 8 adb 128*/

//get all the checkboxes from the form
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
    
  //console.log(dict);
  console.log("this is new array " + pwReqS);
}

 //using the dict object to make sure at least one character type is selected and num of characters between 8 and 128 
if((dict.nums||dict.upLet||dict.lowLet||dict.spChar||dict.emChar) &&  (totChars >= 8 &&  totChars <= 128)) {
  // Hide the modal again
  $('#criteriaModal').modal('hide')
  //ANd reset the form fields to default  
  $('#criteriaModal').on('hidden.bs.modal', function () {
     $(this).find('form').trigger('reset');
     });
// let's create our passowrd!
   createReturnPW();
   cleanUp();
 
// if we don't have at least one selected alert and keep form
 } else {
   alert("Number of Characters must be between 8 and 128 and at least one character type must be selected");
   //let modalFormHdr = document.getElementById("criteriaModalLabel");
   let formLabel = document.getElementById("criteriaModalLabel")
    formLabel.setAttribute ("class","heading");
    formLabel.innerHTML = "Please try again";
   //cleanUp();
 }


}

function cleanUp() {
  // cleans up the variables! 
  document.getElementById("criteriaForm").reset();
  let formLabel = document.getElementById("criteriaModalLabel")
  formLabel.setAttribute ("class","normal");
  formLabel.innerHTML = "Please Select your Criteria";
  pwReqS.length = 0;
}


//Function to generate random password that should meet the length criteria 
function genPW (totChars) {
  let randPw = [], rnd=0, nvm = "", var1="";
  //console.log("from Gen pass " + pwReqS + " num " + pwReqS.length);
  let l = pwReqS.length;
  for (let k=1;k <= totChars; k++){
      rnd = Math.floor(Math.random() * l);
      var1 = pwReqS[rnd];
     console.log(rnd +" = " +var1);
     randPw.push(var1);
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






/*
function intersect(a, b) {
  var aa = {};
  a.forEach(function(v) { aa[v]=1; });
  return b.filter(function(v) { return v in aa; });
} */