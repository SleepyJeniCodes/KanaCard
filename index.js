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

let quiz = [];
let currentQuestion = {};
let totalCorrect = 0;
let selectedCharset = ""; //default to empty

//queries data based off of selected set
async function fetchSet(charset) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${charset}`, (err, res) => {
      if (err) {
        console.error("Error executing query", err.stack);
        reject(err);
      } else {
        resolve(res.rows); //stores the quiz questions retrieved from the database
      }
    })
  })
};


//Middleware
app.use(bodyParser.urlencoded({ extended: true })); //parses URL-encoded bodies
app.use(express.static("public")); //serves static files from 'public' directory

//GET home page
app.get("/", async (req, res) => {
    totalCorrect = 0; //resets the total correct count for a new session
    await nextQuestion(); //fetches next question asynchronously
    console.log(currentQuestion); //logs current question to the console
    res.render("index.ejs", { 
      question: null,
      selectedCharset,
      totalScore: totalCorrect
     }); //renders the index.ejs template
  });

// POST a new post
app.post("/", async (req, res) => {
  if (req.body.charset && req.body.charset !== selectedCharset) {
    selectedCharset = req.body.charset; // update selected character set
    quiz = await fetchSet(selectedCharset); // fetch new set of questions
    totalCorrect = 0; // reset the score
    await nextQuestion(); // fetch the next question
    
    res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: undefined, // clear the wasCorrect flag for new set selection
        totalScore: totalCorrect, // reset the total score
        selectedCharset // passes the selected charset to the template
        });
      } else if (req.body.answer) {
        let answer = req.body.answer.trim(); // extracts and trims the submitted answer
        let isCorrect = false; // flag to track whether the answer is correct
        if (currentQuestion.romaji.toLowerCase() === answer.toLowerCase()) {
          totalCorrect++; // increments the total correct count if answer is correct
          isCorrect = true;
        }
        await nextQuestion(); // fetches the next question
        console.log(currentQuestion);
        res.render("index.ejs", {
          question: currentQuestion,
          wasCorrect: isCorrect, // passes whether the answer was correct to the ejs file
          totalScore: totalCorrect, // passes the total correct count to the template
          selectedCharset // passes the selected charset to the template
          });
        } else {
          res.redirect('/'); // redirect to home if neither charset nor answer is present
          }
        });

//function to fetch the next question
async function nextQuestion() {
    const randomJapanese = quiz[Math.floor(Math.random() * quiz.length)]; //selects a random question from the 'quiz' array
    currentQuestion = randomJapanese; //sets the current question to the randomly selected question
  }

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); //logs server start message to the console
});