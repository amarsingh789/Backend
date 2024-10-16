const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
main().then(()=>{
    console.log("connection successful");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req, res)=>{
    let chats = await Chat.find();
   // console.log(chats);
    res.render("index.ejs", {chats})
});
//New routec
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
});

//CREATE ROUTE
app.post("/chats",(req,res)=>{
  let {from,to,msg} =req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat.save()
  .then(res =>{
    console.log("chats was saved")
  }).catch((err)=>{
    console.log(err);
  });
//   console.log(newChat);
  res.redirect("/chats")
});

//edit chat
app.get("/chats/:id/edit",async (req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id)
  res.render("edit.ejs", {chat})
});
//UPDATE CHAT
app.put("/chats/:id",async(req,res)=>{
   let {id} = req.params;
   let {msg: newMsg} = req.body;
  //  console.log(newMsg)
   let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true})
   console.log(updatedChat);
   res.redirect("/chats");
})
//Delete chats
app.delete("/chats/:id", async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});



// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "send me math homework",
//     created_at: new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });


app.get("/", (req,res)=>{
    res.send("root is working");
});

app.listen(8080 , ()=>{
    console.log("server is listing on port 8080");
});