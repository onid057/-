import axios from '../api/instance';

// filterFunnel을 통해 얻은 매치 데이터를 활용하여 집사 리스트 get
const getFilteredHelperData = async (
  majorCategoryId,
  genderStr,
  age,
  grade,
  scoreAverage,
) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/matches/filter',
      params: {
        majorCategoryId,
        genderStr,
        age,
        grade,
        scoreAverage,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getFilteredHelperData };
