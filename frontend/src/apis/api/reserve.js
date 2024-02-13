import axios from '../utils/instance';

// 고객 예약 확인
const getReservationListByUser = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `users/reservations`,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 고객 예약 상세정보 확인
const getReservationDetailInfoByUser = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/reservations/${roomId}`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getReservationListByUser, getReservationDetailInfoByUser };
