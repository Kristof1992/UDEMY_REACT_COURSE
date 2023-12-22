import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { useEffect, useReducer } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const SECS_PER_QUESTION = 1;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

// State
// prettier-ignore
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { 
        ...state, 
        questions: action.payload, 
        status: "ready"
    };  
    case "dataFailed":
      return {
        ...state,
        status: "error",
    };
    case "start":
        return { 
          ...state, 
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION
    };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state, 
        answer: action.payload,
        points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points
    }
    case "nextQuestion":
      return {
        ...state, 
        index: state.index + 1, 
        answer: null
      }
    case "finish":
      return {
        ...state,
        highscore: state.points > state.highscore ? state.points : state.highscore, 
        status: "finished"
      }
    case "restart":
      return {
        ...initialState, 
        questions: state.questions,
        status: "ready"
      }

      // return {
      //   ...state, 
      //   index: 0, 
      //   score: 0, 
      //   points: 0, 
      //   answer: null, 
      //   status: "ready"
      // }
    case "tick":
      return {
        ...state, 
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'active' : state.status
    }

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
