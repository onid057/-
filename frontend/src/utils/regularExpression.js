const regName = /^[가-힣]{2,5}$/;
const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

export { regName, regEmail, regPassword };
