import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

let intervalID;

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      if (secondsRemaining === 0) {
        dispatch({ type: "finish" });
      }

      // Makes sure last interval has been stopped no more state updates after 0
      if (secondsRemaining > 0) {
        intervalID = setInterval(function () {
          // console.log(intervalID);
          dispatch({ type: "tick" });
        }, 1000);
      }

      return () => {
        clearInterval(intervalID);
      };
    },
    [secondsRemaining, dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
