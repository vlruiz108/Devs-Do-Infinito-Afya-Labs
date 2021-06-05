function validateTime(hour) {
  const pattern = /^([0-1][0-9]|[2][0-3]):[0-5][0-9]$/;
  const time = hour.match(pattern);
  return time;
}

export {validateTime};