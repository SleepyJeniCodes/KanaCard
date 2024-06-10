import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

//Queries the database for quiz questions and populates the 'quiz' array
//let quiz = [];
//db.query("SELECT * FROM hiragana", (err, res) => {
  //if (err) {
    //console.error("Error executing query", err.stack);
  //} else {
    //quiz = res.rows; //stores the quiz questions retrieved from the database
  //}
  //db.end();
//});

let totalCorrect = 0;

//Middleware
app.use(bodyParser.urlencoded({ extended: true })); //parses URL-encoded bodies
app.use(express.static("public")); //serves static files from 'public' directory

let currentQuestion = {};

//GET home page
app.get("/", async (req, res) => {
    const charset = req.query.charset || 'hiragana' //default to hiragana if no charset is selected
    totalCorrect = 0; //resets the total correct count for a new session
    await nextQuestion(charset); //fetches next question asynchronously
    console.log(currentQuestion); //logs current question to the console
    res.render("index.ejs", { 
      question: currentQuestion,
      selectedCharset: charset,
      totalScore: totalCorrect
     }); //renders the index.ejs template
  });

// POST a new post
app.post("/submit", async (req, res) => {
    let answer = req.body.answer.trim(); //extracts and trims the submitted answer
    let isCorrect = false; //flag to track whether the answer is correct
    if (currentQuestion.romaji.toLowerCase() === answer.toLowerCase()) {
      totalCorrect++; //increments the total correct count if answer is correct
      console.log(totalCorrect); //logs total correct count to console
      isCorrect = true;
    }

    const charset = req.body.charset || 'hiragana'; // Default to hiragana if no charset is selected
    await nextQuestion(charset); // Fetches the next question based on selected charset
    res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect, //passes whether the answer was correct to the ejs file
        totalScore: totalCorrect, //passes tht total correct count to the template
        selectedCharset: charset // Passes the selected charset to the template
    });
});

//function to fetch the next question
async function nextQuestion(charset) {
    const query = `SELECT * FROM ${charset}`;
    const { rows } = await db.query(query);
    const randomCharacter = rows[Math.floor(Math.random() * rows.length)]; //selects a random question from the 'quiz' array
    currentQuestion = randomCharacter; //sets the current question to the randomly selected question
  }

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); //logs server start message to the console
});