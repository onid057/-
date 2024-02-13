import axios from '../utils/instance';

// 로그인
const doLogIn = async (email, password) => {
  try {
    const response = await axios({
      method: 'post',
      url: `/auth/sign-in`,
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 로그아웃
const doLogOut = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: `/auth/sign-out`,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { doLogIn, doLogOut };
