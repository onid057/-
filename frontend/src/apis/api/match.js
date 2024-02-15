import axios from '../utils/instance';

// 업무 시작
const startTask = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/matches/${roomId}/start`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 업무 종료
const endTask = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/matches/${roomId}/end`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { startTask, endTask };
