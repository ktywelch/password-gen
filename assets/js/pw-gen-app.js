
// modal is handle within the HTML - this is where we do the password stuff
document.getElementById("btnSaveIt").onclick = createReturnPW;

//these need to be global" 
const charTypes = ["nums", "upLet", "lowLet", "spChar"];
const spcChar = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
const upChar = "ABCDEFGHIJKLMNOPQURSTUVXYZ";
const numChar = "123456789"
const lowChar = upChar.toLowerCase();
let pwReqS = "";
let numChars = 0;

var dict = {
  nums: false,
  numsC: 0,
  upLet: false,
  upLC: 0,
  lowLet: false,
  lowLC: 0,
  spChar: false,
  spCC: 0,
  numsTrue: function() {this.nums = true; pwReqS = pwReqS + numChar; this.numsC = 2},
  upLetTrue: function() {this.upLet = true ; pwReqS = pwReqS + upChar; this.upLC = 2},
  lowLetTrue: function() {this.lowLet = true; pwReqS = pwReqS + lowChar; this.lowLC = 2},
  spCharTrue: function() {this.spChar = true; pwReqS = pwReqS + spcChar; this.spCC = 2}
}

// Main function calls others and returns the value to the form
function createReturnPW(){
  getParams();
     // clear any contents in the return container left from previous runs
     $('#retPWCont').empty();
     //generate random password that should meet the criteria  
     let newPw = ""; isGood = "";
     // Going to keep generating passwords until we get one that works!
     while(isGood !== "ok"){
        newPw = genPW(numChars);
        isGood = veri(newPw);
      } 
     //Return the password to the user in container by usging get the element ID where I want this to go
     
     var pwContainer = document.getElementById("retPWCont");
     var newH1 = document.createElement("h1");
     var newP = document.createElement("p");

     newH1.textContent = "Generated Password";
     newH1.setAttribute("class","heading")
     newP.textContent = newPw;
     newP.setAttribute("class","paragraph")
     pwContainer.appendChild(newH1);
     pwContainer.appendChild(newP);
      
    }

function getParams(){
/*Function to get the parameters from the form and verify 
at least one type is selected and that the # of characters is betwwen 8 adb 128*/

//get all the checkboxes from the form
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

//get the value of the field pwLen
numChars = document.getElementById('pwLen').value;

/*put if checkboxes are true or false update the dict object so that I can use it later
the methods also prepares the characters for we will be using to generate the password*/

for (var i = 0; i < checkboxes.length; i++) {
  let nm=checkboxes[i].name;
  let val=checkboxes[i].checked
  if (nm === "nums" && val)
  {dict.numsTrue()}
  if (nm === "upLet" && val)
  {dict.upLetTrue()}
  if (nm === "lowLet" && val)
  {dict.lowLetTrue()}
  if (nm === "spChar" && val)
  {dict.spCharTrue()}
  }  
  //console.log(dict);

 //using the dict object to make sure at least one character type is selected and num of characters between 8 and 128 
if((dict.nums||dict.upLet||dict.lowLet||dict.spChar) &&  (numChars >= 8 &&  numChars <= 128)) {
  // Hide the modal again
  $('#criteriaModal').modal('hide')
  //ANd reset the form fields to default  
  $('#criteriaModal').on('hidden.bs.modal', function () {
     $(this).find('form').trigger('reset');
     });
// if we don't have at least one selected alert and keep form
 } else {
   alert("Number of Characters must be between 8 and 128 and at least one character type must be selected");
 }

}



//Function to generate random password that should meet the length criteria 
function genPW (numChars) {
  let randPw = "";
  for (let k=1;k <= parseInt(numChars); k++){

    for ( let l = 0; l < pwReqS.length; l++ ) {
      var1 = pwReqS.charAt(Math.floor(Math.random() * pwReqS.length));
     }
     randPw = randPw + var1;
 
     }
    console.log(randPw);
    return(randPw);
    }


/* purpose verify we have at least 2 from each character set selected before returning 
this can actually be changed by updating the dict object that has the num of each but then would need 
to make sure that the length could support the required */
function veri(passW){
  console.log("here " + passW) ;
  let noNum = 0, noLow = 0, noUp = 0, bad = 0;noSp = 0;
  let verified ="no";
  //if count how many of each we have
    
      for (let i=0;i < passW.length;i++) {
      let currChar =   passW[i];

        if (numChar.includes(currChar)){
          noNum = noNum + 1;
         } else if (lowChar.includes(currChar)) {
           noLow =noLow + 1;
         } else if (upChar.includes(currChar)) {
           noUp =noUp + 1;
         } else if (spcChar.includes(currChar)) {
           noSp =noSp + 1;
         }
        }
        // if password require numbers upper and lower case letters then keep generating until the criteria is met
        if((noNum >= dict.numsC) && (noLow >= dict.lowLC) && (noUp >= dict.upLC) && (noSp >= dict.spCC)){
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