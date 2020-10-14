const charTypes = ["l", "u", "n", "sc"];
const spcChar = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
const 

// var checked_gender = document.querySelector('input[name = "gender"]:checked');

function showForm() {
    document.getElementById('demoForm').style.display = 'block';
}

function showNumSel(x) {
 //var checkBox = document.querySelector('input[name = "myCheck"]:checked');
 //console.log(checkBox);
 //console.log($("input[type='radio'][name='myCheck']:checked").val());
  // document.getElementById("myCheck");
 var text = document.getElementById("numChar");
 console.log(x); 
 if (x === "yes"){
   $('#numSChar').show();  
 } else {
   $('#numSChar').hide();  
 }
}

function setPwReq(){
   let pwReq = {
       reqLen: 0,
       reqUpr: false,
       reqLow: false,
       reqNum: false,
       reqSpc: false,
       numSp: 0,
       //mandU: function () { this.reqU = true},
       //mandL: function () { this.reqL = true},       
       //mandN: function () { this.reqN = true},
       //mandS: function () { this.reqS = true, this numS = x},
    }
}



/* var str = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  // let res =[];
  let res = str[10];
  console.log(str[11]);

console.log(spcChar[7]);
*/
