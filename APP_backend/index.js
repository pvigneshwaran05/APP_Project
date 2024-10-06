// import express from "express";
// import bodyParser from "body-parser";
// import pg from "pg";
// import env from "dotenv";

// const app = express();
// const port = 3000;
// env.config();


// const db = new pg.Client({
//     user : "postgres",
//     host : "localhost",
//     database : "APP",
//     password : "123456",
//     port : 5432,
// });

// db.connect();

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));

// var username;

// app.get("/",(req,res)=>{
//     res.render("signup.ejs");
// });

// app.get("/login",(req,res)=>{
//     res.render("login.ejs");
// })


// app.post("/datasingnup",async(req,res)=>{
//     username = req.body.Username;
//     var email = req.body.Email;
//     var password = req.body.password;

//     var checkUsername = await db.query("Select * from users where username = $1",[username]);
//     if(checkUsername.rows.length > 0){
//         res.render("inter_signup.ejs");
//     }
//     else{
//         db.query("Insert into users(email,username,password) values ($1,$2,$3)",[email,username,password]);
//         res.render("greet_page.ejs",{name : username});
//     }

// })

// app.post("/datalogin",async(req,res)=>{
//     username = req.body.Username;
//     var password = req.body.password;

//     var response = await db.query("Select password from users where username = $1",[username]);
//     if(response.rows.length > 0){
//     var checkPassword = response.rows[0].password;
//     if(password==checkPassword){
//         res.render("greet_page.ejs",{name : username});
//     }
//     else{
//         res.send("Your password seems to be wrong Please retry again");
//     }
//     }
//     else{
//         res.render("inter_login.ejs");
//     }
// });

// app.get("/home",(req,res)=>{
//     res.render("home.ejs",{name : username});
// });

// app.post("/greet",(req,res)=>{
//     var name = req.body.Username;
//     res.render("greet_page.ejs",{name : name});
// });


// app.get("/query",(req,res)=>{
//     res.render("query.ejs");
// });

// app.get("/events",async(req,res)=>{
//     var response = await db.query("Select score from users where username = $1",[username]);
//     if(response.rows.length > 0){
//         res.render("events.ejs",{name : username,score : response.rows[0].score});
//     }
//     else{
//         res.render("events.ejs",{name : username,score : '0'});
//     }
    
// });

// var quesNumber = 0;
// var currentScore=0;

// app.get("/quiz",async(req,res)=>{
//     var response = await db.query("select * from quiz");
//     var quiz = response.rows;
//     res.render("quiz.ejs",{name: username,quiz : quiz[0]});
// });

// app.post("/check",async(req,res)=>{
//     var response = await db.query("select * from quiz");
//     var quiz = response.rows;
//     // console.log(typeof(req.body.q1));
//     // console.log(typeof(quiz[quesNumber].correct));
//     if(req.body.q1.trim() == quiz[quesNumber].correct.trim()){
//         currentScore++;
//         // console.log(currentScore);
//     }
//     // console.log(currentScore);
//     quesNumber++;
//     res.render("quiz.ejs",{name : username,quiz : quiz[quesNumber]});
// })

// app.get("/score",async(req,res)=>{
//     var score = currentScore;
//     await db.query("update users set score = $1 where username = $2",[score,username]);
//     quesNumber=0;
//     currentScore=0;
//     res.render("quiz_score.ejs",{name : username,score : score});
// })

// app.listen(port,()=>{
//     console.log("Listening on port "+port);
// })

// import express from "express";
// import bodyParser from "body-parser";
// import pkg from "pg"; // Default import
// const { Client } = pkg; // Destructure to get Client
// import env from "dotenv";

// const app = express();
// const port = 3000;

// // Load environment variables
// env.config();

// // PostgreSQL client setup
// const db = new Client({
//     user: "postgres",
//     host: "localhost",
//     database: "APP",
//     password: "123456",
//     port: 5432,
// });

// // Connect to the database
// db.connect()
//     .then(() => console.log("Connected to the database"))
//     .catch(err => console.error("Connection error", err.stack));

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public")); // Serve static files
// app.set('view engine', 'ejs'); // Set EJS as the view engine
// app.set('views', './views'); // Set the views directory

// let username;

// // Routes
// app.get("/", (req, res) => {
//     console.log("Root route accessed");
//     res.render("signup.ejs"); // Render the signup page
// });

// app.get("/login", (req, res) => {
//     res.render("login.ejs"); // Render the login page
// });

// app.post("/datasingnup", async (req, res) => {
//     username = req.body.Username;
//     const email = req.body.Email;
//     const password = req.body.password;

//     const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [username]);
//     if (checkUsername.rows.length > 0) {
//         res.render("inter_signup.ejs"); // Username already exists
//     } else {
//         await db.query("INSERT INTO users(email, username, password) VALUES ($1, $2, $3)", [email, username, password]);
//         res.render("greet_page.ejs", { name: username }); // Render greeting page
//     }
// });

// app.post("/datalogin", async (req, res) => {
//     username = req.body.Username;
//     const password = req.body.password;

//     const response = await db.query("SELECT password FROM users WHERE username = $1", [username]);
//     if (response.rows.length > 0) {
//         const checkPassword = response.rows[0].password;
//         if (password === checkPassword) {
//             res.render("greet_page.ejs", { name: username }); // Render greeting page
//         } else {
//             res.send("Your password seems to be wrong. Please retry again.");
//         }
//     } else {
//         res.render("inter_login.ejs"); // Username not found
//     }
// });

// app.get("/home", (req, res) => {
//     res.render("home.ejs", { name: username }); // Render home page
// });

// app.post("/greet", (req, res) => {
//     const name = req.body.Username;
//     res.render("greet_page.ejs", { name }); // Render greeting page
// });

// app.get("/query", (req, res) => {
//     res.render("query.ejs"); // Render query page
// });

// app.get("/events", async (req, res) => {
//     const response = await db.query("SELECT score FROM users WHERE username = $1", [username]);
//     const score = response.rows.length > 0 ? response.rows[0].score : '0';
//     res.render("events.ejs", { name: username, score }); // Render events page
// });

// let quesNumber = 0;
// let currentScore = 0;

// app.get("/quiz", async (req, res) => {
//     const response = await db.query("SELECT * FROM quiz");
//     const quiz = response.rows;
//     res.render("quiz.ejs", { name: username, quiz: quiz[0] }); // Render quiz page
// });

// app.post("/check", async (req, res) => {
//     const response = await db.query("SELECT * FROM quiz");
//     const quiz = response.rows;
//     if (req.body.q1.trim() === quiz[quesNumber].correct.trim()) {
//         currentScore++;
//     }
//     quesNumber++;
//     if (quesNumber < quiz.length) {
//         res.render("quiz.ejs", { name: username, quiz: quiz[quesNumber] }); // Render next question
//     } else {
//         res.redirect("/score"); // Redirect to score page
//     }
// });

// app.get("/score", async (req, res) => {
//     const score = currentScore;
//     await db.query("UPDATE users SET score = $1 WHERE username = $2", [score, username]);
//     quesNumber = 0;
//     currentScore = 0;
//     res.render("quiz_score.ejs", { name: username, score }); // Render score page
// });

// // Start the server
// app.listen(port, () => {
//     console.log("Listening on port " + port);
// });

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "APP",
    password: "123456",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let username;

app.get("/", (req, res) => {
    res.render("signup.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/datasingnup", async (req, res) => {
    username = req.body.Username;
    const email = req.body.Email;
    const password = req.body.password;

    const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (checkUsername.rows.length > 0) {
        res.render("inter_signup.ejs");
    } else {
        await db.query("INSERT INTO users(email, username, password) VALUES ($1, $2, $3)", [email, username, password]);
        res.render("greet_page.ejs", { name: username });
    }
});

app.post("/datalogin", async (req, res) => {
    username = req.body.Username;
    const password = req.body.password;

    const response = await db.query("SELECT password FROM users WHERE username = $1", [username]);
    if (response.rows.length > 0) {
        const checkPassword = response.rows[0].password;
        if (password === checkPassword) {
            res.render("greet_page.ejs", { name: username });
        } else {
            res.send("Your password seems to be wrong. Please retry again.");
        }
    } else {
        res.render("inter_login.ejs");
    }
});

app.get("/home", (req, res) => {
    res.render("home.ejs", { name: username });
});

app.post("/greet", (req, res) => {
    const name = req.body.Username;
    res.render("greet_page.ejs", { name: name });
});

app.get("/query", (req, res) => {
    res.render("query.ejs");
});

app.get("/events", async (req, res) => {
    const response = await db.query("SELECT score FROM users WHERE username = $1", [username]);
    if (response.rows.length > 0) {
        res.render("events.ejs", { name: username, score: response.rows[0].score });
    } else {
        res.render("events.ejs", { name: username, score: '0' });
    }
});

let quesNumber = 0;
let currentScore = 0;

app.get("/quiz", async (req, res) => {
    const response = await db.query("SELECT * FROM quiz");
    const quiz = response.rows;
    res.render("quiz.ejs", { name: username, quiz: quiz[0] });
});

app.post("/check", async (req, res) => {
    const response = await db.query("SELECT * FROM quiz");
    const quiz = response.rows;

    if (req.body.q1.trim() === quiz[quesNumber].correct.trim()) {
        currentScore++;
    }

    quesNumber++;
    res.render("quiz.ejs", { name: username, quiz: quiz[quesNumber] });
});

app.get("/score", async (req, res) => {
    const score = currentScore;
    await db.query("UPDATE users SET score = $1 WHERE username = $2", [score, username]);
    quesNumber = 0;
    currentScore = 0;
    res.render("quiz_score.ejs", { name: username, score: score });
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});
