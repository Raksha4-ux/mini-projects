// const express=require("express");
// const app=express();

// import { fileURLToPath } from "url";


// const path=require("path");
// let port=8080;


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";



// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
let port = 8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));


let tweets=[
 {      id:uuidv4(),
        user: "Narendra Modi",
        verified: true,
        content: "Strongly condemn the heinous terrorist attack on innocent civilians in Jerusalem today. We extend our heartfelt condolences to the families of the victims and wish a speedy recovery to those injured.India condemns terrorism in all its forms and manifestations and stands firm in its policy of zero tolerance towards terrorism.",
        comments: "4.4K",
        retweets: "14K",
        likes: "90K",
        views: "5.9M"
      },
      {
        id:uuidv4(),
        user: "mahak",
        verified: false,
        content: "govt. website 😭😭😭 OTP frontend pe dikh rha hai",
        comments: "100",
        retweets: "250",
        likes: "3K",
        views: "20K"
      },
      {
        id:uuidv4(),
        user:"Kapil",
        verified:true,
        content:"Every sector in India will fail if there is downfall of IT sector. There is no sector in India with salaries like IT sector.There is no sector in India with spending power like IT sector.There is no sector in India which can absorb lakhs of students passing from colleges every year.",
        comments:"612",
        retweets:"1k",
        likes:"8.4k",
        views:"814k",
      }
]

app.get("/",(req,res)=>{
  res.redirect("/tweets");
})
app.get("/tweets", (req, res) => {
res.render("index.ejs",{tweets});
});


app.post("/tweets",(req,res)=>{
  let id =uuidv4();
  let {content}=req.body;
  tweets.unshift({id,
    user:"Raksha",
    verified:false,
  content,
   comments:"0",
        retweets:"0",
        likes:"0",
        views:view(),


  });
  res.redirect("/tweets");
});


  function view(){
   return Math.floor(Math.random()*100 )+1;
}


app.delete("/tweets/delete/:id",(req,res)=>{
  let {id}=req.params;

  tweets=tweets.filter((p)=>id!==p.id);
  res.redirect("/tweets");

})

app.patch("/tweets/edit/:id",(req,res)=>{

})




app.listen(port,()=>{
console.log("twitter is listening");
})