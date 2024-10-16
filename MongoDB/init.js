const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().then(()=>{
    console.log("connection successful");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "neha",
       to: "priya",
       msg: "send me math homework",
       created_at: new Date()
    },
    {
        from: "neha",
       to: "riya",
       msg: "send me class h.w",
       created_at: new Date()
    },
    {
        from: "sohan",
       to: "prachi",
       msg: "tell me next class date",
       created_at: new Date()
    },
    {
        from: "aman",
       to: "rohit",
       msg: "tomorrow will be movie plan",
       created_at: new Date()
    },
    {
        from: "pranav",
       to: "anshu",
       msg: "go to park",
       created_at: new Date()
    },
    {
        from: "anshu",
       to: "amar",
       msg: "meet a park",
       created_at: new Date()
    },
    {
        from: "suraj",
       to: "om",
       msg: "which subject is exam",
       created_at: new Date()
    },
    {
        from: "sonali",
       to: "pragya",
       msg: "which is next plan",
       created_at: new Date()
    },
    {
        from: "hari",
       to: "deepak",
       msg: "tomorrow will visit dtu",
       created_at: new Date()
    },
]


Chat.insertMany(allChats);

