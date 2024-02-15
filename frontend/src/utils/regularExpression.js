const regName = /^[가-힣]{2,5}$/;
const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

function maskKoreanAddress(address) {
  const addressRegex = /^(.*?[시도군구])(.*?[시군구])(.*?[읍면동])(.*)$/;
  const match = address.match(addressRegex);

  if (match) {
    const maskedAddress =
      match[1] + maskString(match[2]) + maskString(match[3]) + match[4];
    return maskedAddress;
  } else {
    return address;
  }
}

function maskString(str) {
  const length = str.length;
  const maskedStr = '*'.repeat(length);
  return maskedStr;
}

export { regName, regEmail, regPassword, maskKoreanAddress };
