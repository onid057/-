import axios from '../utils/instance';

// 고객/집사 상태 변경
const changeUserState = async helperId => {
  try {
    const response = await axios({
      method: 'patch',
      url: `/helpers/${helperId}/reversal`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 고객/집사 상태 불러오기
const getUserState = async helperId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/${helperId}/status`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { changeUserState, getUserState };
