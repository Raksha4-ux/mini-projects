let btn=document.querySelector(".btn");
let inp=document.querySelector("#input");
let copy=document.querySelector(".fa-clone");
copy.addEventListener("click",()=>{
    if(inp.value.length>0){

  inp.select();
  inp.setSelectionRange(0,9999);
  navigator.clipboard.writeText(inp.value);
  alert("copied");
    }
});
btn.addEventListener("click",()=>{
generate();
console.log(inp);
});
function generate(){
    const chars="abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     let len=14;
     let pwd="";
     for(let i=0;i<len;i++){
        let ch=Math.floor(Math.random()*chars.length);
        pwd+=chars.substring(ch,ch+1);
     }
     inp.value=pwd;
 
}


