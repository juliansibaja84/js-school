export function formatIfDigit(number) {
  /*
    Format a number (n) passed.
    If it is a digit it will add a 0 before the number, and return it.
    Else it will return the same number.
  */
  if (number / 10 < 1) return `0${number}`;
  return number;
}

export function formatTime(t, duration) {
  /*
    Format the time (t) passed in seconds depending of that time or a duration if specified.
    It will have one of the following structures H:mm:ss, mm:ss, m:ss, ss.
  */
  if (t > 3599 || duration > 3599) {
    return `${Math.floor(t / 3600)}:${formatIfDigit(Math.floor((t % 3600) / 60))}:${formatIfDigit((t % 3600) % 60)}`;
  }
  return `${Math.floor(t / 60)}:${formatIfDigit(Math.floor(t % 60))}`;
}
