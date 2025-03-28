import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();


const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "APP",
    password : process.env.PASSWORD,
    port : 5432,
});

db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var username;

app.get("/",(req,res)=>{
    res.render("signup.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})


app.post("/datasingnup",async(req,res)=>{
    username = req.body.Username;
    var email = req.body.Email;
    var password = req.body.password;

    var checkUsername = await db.query("Select * from users where username = $1",[username]);
    if(checkUsername.rows.length > 0){
        res.render("inter_signup.ejs");
    }
    else{
        db.query("Insert into users(email,username,password) values ($1,$2,$3)",[email,username,password]);
        res.render("greet_page.ejs",{name : username});
    }

})

app.post("/datalogin",async(req,res)=>{
    username = req.body.Username;
    var password = req.body.password;

    var response = await db.query("Select password from users where username = $1",[username]);
    if(response.rows.length > 0){
    var checkPassword = response.rows[0].password;
    if(password==checkPassword){
        res.render("greet_page.ejs",{name : username});
    }
    else{
        res.send("Your password seems to be wrong Please retry again");
    }
    }
    else{
        res.render("inter_login.ejs");
    }
});

app.get("/home",(req,res)=>{
    res.render("home.ejs",{name : username});
});

app.post("/greet",(req,res)=>{
    var name = req.body.Username;
    res.render("greet_page.ejs",{name : name});
});


app.get("/query",(req,res)=>{
    res.render("query.ejs");
});

app.get("/events",async(req,res)=>{
    var response = await db.query("Select score from users where username = $1",[username]);
    if(response.rows.length > 0){
        res.render("events.ejs",{name : username,score : response.rows[0].score});
    }
    else{
        res.render("events.ejs",{name : username,score : '0'});
    }
    
});

var quesNumber = 0;
var currentScore=0;

app.get("/quiz",async(req,res)=>{
    var response = await db.query("select * from quiz");
    var quiz = response.rows;
    res.render("quiz.ejs",{name: username,quiz : quiz[0]});
});

app.post("/check",async(req,res)=>{
    var response = await db.query("select * from quiz");
    var quiz = response.rows;
    // console.log(typeof(req.body.q1));
    // console.log(typeof(quiz[quesNumber].correct));
    if(req.body.q1.trim() == quiz[quesNumber].correct.trim()){
        currentScore++;
        // console.log(currentScore);
    }
    // console.log(currentScore);
    quesNumber++;
    res.render("quiz.ejs",{name : username,quiz : quiz[quesNumber]});
})

app.get("/score",async(req,res)=>{
    var score = currentScore;
    await db.query("update users set score = $1 where username = $2",[score,username]);
    quesNumber=0;
    currentScore=0;
    res.render("quiz_score.ejs",{name : username,score : score});
})

app.listen(port,()=>{
    console.log("Listening on port "+port);
})