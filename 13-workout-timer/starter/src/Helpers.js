import clickSound from "./ClickSound.m4a";

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function playSound() {
  const sound = new Audio(clickSound);
  sound.play();
}

export { formatTime, playSound };
