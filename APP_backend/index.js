import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
//import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3000;
env.config();

// console.log(process.env.API_KEY);

//const genAI = new GoogleGenerativeAI(process.env.API_GOOGLE);

// async function run() {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // const prompt = "Tell me a bit about yourself";

//     const prompt = "I am sending a request related to my energy conservation website, where I will provide user actions toward energy conservation. Please analyze the provided action and assign points out of 10 based on the user's input.Return the points and also return message to the user appreciating them or telling them to do better next time.The query is : I din't do anything today";

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     console.log(text);
// }

// run();

async function dayEnd(query) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `I am sending a request related to my energy conservation website, where I will provide user actions toward energy conservation. Please analyze the provided action and assign points out of 10 based on the user's input.

Return the output in the following format:

*Points:* X/Y  
*Message to the User:* "Your message goes here."

Where X is the points assigned out of Y (which is always 10), and the message should appreciate the user's actions or encourage them to do better next time.

The query is: ${query}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text); // Log the complete response text for debugging

  // Updated regex patterns to match the output format
  const pointsMatch = text.match(/\\*Points:\\\s(\d+)\s*\/\s*\d+/); // Match the format "*Points:* 0/10" and capture only X
  const messageMatch = text.match(/\\*Message to the User:\\\s"([^"]+)"/); // Match message inside quotes

  const points = pointsMatch ? pointsMatch[1] : "Not found"; // Extract only "X" format
  const message = messageMatch ? messageMatch[1] : "Not found"; // Extract message content

  return { points, message }; // Return points and message as an object
}

// Example usage

// (async () => {
//     const { points, message } = await dayEnd("I didn't do anything today");
//     console.log("Points:", points);  // Output: Points: 0
//     console.log("Message:", message); // Output: The message content
// })();

const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: "localhost",
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var username;
var currentUser;
var data;

app.get("/", (req, res) => {
  res.render("signup.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/datasingnup", async (req, res) => {
  username = req.body.Username;
  var email = req.body.Email;
  var password = req.body.password;

  var checkUsername = await db.query(
    "Select * from users where username = $1",
    [username]
  );
  if (checkUsername.rows.length > 0) {
    res.render("inter_signup.ejs");
  } else {
    await db.query(
      "Insert into users(email,username,password) values ($1,$2,$3)",
      [email, username, password]
    );
    data = await db.query("select * from users where username = $1", [
      username,
    ]);
    currentUser = data.rows[0];

    res.render("greet_page.ejs", { name: username });
  }
});

app.post("/datalogin", async (req, res) => {
  username = req.body.Username;
  var password = req.body.password;

  var response = await db.query(
    "Select password from users where username = $1",
    [username]
  );
  if (response.rows.length > 0) {
    var checkPassword = response.rows[0].password;
    if (password == checkPassword) {
      data = await db.query("select * from users where username = $1", [
        username,
      ]);
      currentUser = data.rows[0];
      res.render("greet_page.ejs", { name: username });
    } else {
      res.send("Your password seems to be wrong Please retry again");
    }
  } else {
    res.render("inter_login.ejs");
  }
});

app.get("/home", (req, res) => {
  res.render("home.ejs", { name: username });
});

app.get("/games", (req, res) => {
  res.render("games.ejs", { name: username });
});

app.post("/greet", (req, res) => {
  var name = req.body.Username;
  res.render("greet_page.ejs", { name: name });
});

app.get("/query", (req, res) => {
  res.render("query.ejs");
});

app.get("/events", async (req, res) => {
  var response = await db.query("Select score from users where username = $1", [
    username,
  ]);
  if (response.rows.length > 0) {
    res.render("events.ejs", { name: username, score: response.rows[0].score });
  } else {
    res.render("events.ejs", { name: username, score: "0" });
  }
});

var quesNumber = 0;
var currentScore = 0;

app.get("/quiz", async (req, res) => {
  var response = await db.query("select * from quiz");
  var quiz = response.rows;
  res.render("quiz.ejs", { name: username, quiz: quiz[0] });
});

app.post("/check", async (req, res) => {
  var response = await db.query("select * from quiz");
  var quiz = response.rows;
  // console.log(typeof(req.body.q1));
  // console.log(typeof(quiz[quesNumber].correct));
  if (req.body.q1.trim() == quiz[quesNumber].correct.trim()) {
    currentScore++;
    // console.log(currentScore);
  }
  // console.log(currentScore);
  quesNumber++;
  res.render("quiz.ejs", { name: username, quiz: quiz[quesNumber] });
});

app.get("/score", async (req, res) => {
  var score = currentScore;
  await db.query("update users set score = $1 where username = $2", [
    score,
    username,
  ]);
  quesNumber = 0;
  currentScore = 0;
  res.render("quiz_score.ejs", { name: username, score: score });
});

var blogData;

app.get("/blogs", async (req, res) => {
  data = await db.query(
    "select heading,username,content,posteddate from blogs inner join users on blogs.userid = users.id"
  );
  blogData = data.rows;
  // console.log(currentUser.username);

  res.render("blog.ejs", { blogs: blogData, user: currentUser });
});

app.get("/new-blog", async (req, res) => {
  res.render("createBlog.ejs", { user: currentUser });
});

app.post("/post-blog", async (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  await db.query(
    "insert into blogs(userid, heading, content, posteddate) values($1,$2,$3,CURRENT_DATE)",
    [currentUser.id, title, content]
  );
  res.redirect("/blogs");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
