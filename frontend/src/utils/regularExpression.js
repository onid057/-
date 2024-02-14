const regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

export { regEmail, regPassword };
