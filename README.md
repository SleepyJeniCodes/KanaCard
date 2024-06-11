# KanaCard Quiz App

KanaCard is a web application designed to help users practice and test their knowledge of Japanese characters. Users can select between Hiragana and Katakana character sets, and anser quiz questions. 

## Table of Contents

- [KanaCard Quiz App](#kanacard-quiz-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Demo](#demo)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Quiz yourself on Hiragana and Katakana characters.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/kanacard.git
    cd kanacard
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and add your database credentials:**

    ```
    PG_USER=your_pg_user
    PG_HOST=your_pg_host
    PG_DATABASE=your_pg_database
    PG_PASSWORD=your_pg_password
    PG_PORT=your_pg_port
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

    The app will be running at `http://localhost:3000`.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Select a character set (Hiragana or Katakana) from the dropdown menu.
3. Answer the quiz questions by entering the romaji and submitting.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - EJS (Embedded JavaScript templates)

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - PostgreSQL

## Future Features

I plan to add more features to KanaCard, including:
- Flashcards for practicing characters.
- Quizzes on Kanji characters.
- Common Japanese phrases for learning practical language usage.
- Tracking for right and wrong answer when quiz ends
- A leaderboard to track high scores.
- User accounts to save progress and preferences.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.