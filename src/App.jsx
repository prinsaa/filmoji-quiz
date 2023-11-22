import { useState } from "react";
import "./App.css";

const list = [
  {
    front: "Start",
    back: "Press the Next Card button to start! :)",
  },
  {
    front: "🕷️👨",
    back: "Spiderman",
    difficulty: "easy",
  },
  {
    front: "💑🚢🥶",
    back: "Titanic",
    difficulty: "easy",
  },
  {
    front: "🌊1️⃣1️⃣",
    back: "Ocean's 11",
    difficulty: "medium",
  },
  {
    front: "🦖🦕🏞️",
    back: "Jurassic Park",
    difficulty: "easy",
  },
  {
    front: "📈🤑👔🧑🏻‍💼",
    back: "The Wolf of Wall Street",
    difficulty: "medium",
  },
  {
    front: "🌌💫🧑‍🚀👨‍🚀👩‍",
    back: "Interstellar",
    difficulty: "hard",
  },
  {
    front: "❤️🥇🛍️🏫🧨🙅🏻‍♀️❤️",
    back: "The Breakfast Club",
    difficulty: "hard",
  },
  {
    front: "🧹👸💃🕛👠",
    back: "Cinderella",
    difficulty: "easy",
  },
  {
    front: "🔟💑😡👎",
    back: "10 Things I Hate About You",
    difficulty: "hard",
  },
  {
    front: "🦁👑🐒🐗",
    back: "The Lion King",
    difficulty: "medium",
  },
];

const App = () => {
  const [currentIndex, setIndex] = useState(0);
  const [showFront, setToFront] = useState(true);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [inputClassName, setInputClassName] = useState("input-box");
  const [score, setScore] = useState(0);

  const currentCard = list[currentIndex];

  const updateQuestion = (direction) => {
    if (direction == "forward" && currentIndex < list.length - 1) {
      setIndex(currentIndex + 1);
    } else if (direction == "back" && currentIndex > 0) {
      setIndex(currentIndex - 1);
    }

    setToFront(true);
    setUserGuess("");
    setFeedback("");
    setInputClassName("input-box");
  };

  const showAnswer = () => {
    if (userGuess.toLowerCase() == currentCard.back.toLowerCase()) {
      setFeedback("Correct!");
      setScore(score + 1);
      setInputClassName("input-box correct-answer");
    } else {
      setFeedback("Incorrect. Try again!");
      setInputClassName("input-box incorrect-answer");
    }

    setToFront(!showFront);
  };

  return (
    <div className="App">
      <h2 style={{ color: "#d62929" }}>Filmoji Quiz</h2>
      <h3 style={{ fontSize: "25px" }}>
        Wanna test your wit? Translate the emojis to a Hollywood movie! The
        background colour of each card indicates the difficulty level.
      </h3>
      <h4 style={{ fontSize: "20px" }}>
        There are 10 cards in total to guess from! GOOD LUCK!{" "}
      </h4>
      <div className="container" onClick={showAnswer}>
        <div
          className={`card ${showFront ? "" : "card-flip"} ${
            currentCard.difficulty
          }`}
        >
          {showFront ? (
            <div className="question">
              <h1>{currentCard.front}</h1>
            </div>
          ) : (
            <div className="answer">
              <h2 className="back">{currentCard.back}</h2>
            </div>
          )}
        </div>
      </div>
      {currentIndex !== 0 && ( // Show the user input section only when not on the first card
        <div>
          <input
            type="text"
            placeholder="Enter your answer"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className={inputClassName}
          />
          <button onClick={showAnswer}>Submit</button>
          <p>{feedback}</p>
        </div>
      )}

      <button
        style={{ marginRight: "10px" }}
        onClick={() => updateQuestion("back")}
        disabled={currentIndex === 0}
      >
        Previous
      </button>

      <button
        onClick={() => updateQuestion("forward")}
        disabled={currentIndex === list.length - 1}
      >
        Next
      </button>

      <h2>
        Here's your score: <span style={{ color: "#00A36C" }}>{score}</span>
      </h2>
    </div>
  );
};

export default App;
