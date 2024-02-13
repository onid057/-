import axios from '../utils/instance';

// 2km 반경 내에 있는 모든 집사의 위치 불러오기
const getZipsaPositionWithinTwoKilos = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/helpers-map`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 고객 회원가입 시 등록한 위도, 경도 기반으로 2km 반경 내에 집사 목록 불러오기
const getZipsaListFromMap = async (lat, lng) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/users/helpers-map',
      data: {
        lat: lat,
        lng: lng,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getZipsaPositionWithinTwoKilos, getZipsaListFromMap };
