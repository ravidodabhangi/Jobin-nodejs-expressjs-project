let errorBox=document.querySelector(".errorBox");
console.log(errorBox);
errorBox.style.display="block";
setTimeout(function(){
if(errorBox.style.display=="block")
{    console.log(errorBox);
   errorBox.style.display="none"
   console.log("hello")
}
},2000)

// see password code

let password=document.querySelector(".RegPass");
let eye1=document.querySelector(".eye1");
let eye2=document.querySelector(".eye2");
console.log(password);
console.log(eye1);
console.log(eye2);
eye1.onclick=function(){
    password.setAttribute("type","text");
    console.log("hello");
}
