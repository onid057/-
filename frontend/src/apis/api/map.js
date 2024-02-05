import axios from '../utils/instance';

// 고객 회원가입 시 등록한 위도, 경도 기반으로 2km 반경 내에 집사 목록 불러오기
const getZipsaListFromMap = async userId => {
  try {
    const response = await axios({
      method: 'post',
      url: `/users/helpers-map/${userId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getZipsaListFromMap };
