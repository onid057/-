// 천 단위로 쉼표를 붙이고 마지막에 원 단위 표시
const convertToWon = data => {
  return ('' + data).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
};

export { convertToWon };
