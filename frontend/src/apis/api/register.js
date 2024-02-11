import axios from '../utils/instance';

// 회원가입
const createAccount = async (
  name,
  gender,
  birth,
  address,
  latitude,
  longitude,
  email,
  password,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: `/users`,
      data: {
        name,
        gender,
        birth,
        address,
        latitude,
        longitude,
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { createAccount };
