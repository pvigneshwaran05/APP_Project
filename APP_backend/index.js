import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var name;

app.get("/",(req,res)=>{
    res.render("signup.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/home",(req,res)=>{
    res.render("home.ejs",{name : name});
});


app.post("/greet",(req,res)=>{
    name = req.body.Username;
    res.render("greet_page.ejs",{name : name});
});


app.get("/query",(req,res)=>{
    res.render("query.ejs");
});

app.listen(port,()=>{
    console.log("Listening on port "+port);
})