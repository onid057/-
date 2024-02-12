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
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { doLogIn };
