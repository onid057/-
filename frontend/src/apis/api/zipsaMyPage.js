import axios from '../utils/instance';

// (세부)집사 정보 조회하기
const getDetailedZipsaInfo = async helperId => {
  try {
    const response = await axios({
      method: 'get',
      url: `helpers/${helperId}/detail`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getDetailedZipsaInfo };
