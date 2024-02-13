import axios from '../utils/instance';

// 고객/집사 상태 변경
const changeUserState = async () => {
  try {
    const response = await axios({
      method: 'patch',
      url: `/helpers/reversal`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 고객/집사 상태 불러오기
const getUserState = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/status`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { changeUserState, getUserState };
