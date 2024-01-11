import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 1;

const QuizContext = createContext();

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

function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        numQuestions,
        maxPossiblePoints,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
