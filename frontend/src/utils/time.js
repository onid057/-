// json 형식을 시로 변환
const convertToHour = data => {
  return new Date(data).getHours();
};

// 현재를 기준으로 예약 날짜와의 차이 계산하기(며칠 전, 후, 오늘, 내일, 모레)
const calculateRemainDate = data => {
  const todayDate = new Date();
  const reservedDate = new Date(data);

  const rawDiffDate =
    (reservedDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);
  const diffDate =
    rawDiffDate < 0 ? Math.ceil(rawDiffDate) : Math.floor(rawDiffDate);

  if (diffDate < 0) return `${Math.abs(diffDate)}일 전`;
  else if (diffDate === 0) return '오늘';
  else if (diffDate === 1) return '내일';
  else if (diffDate === 2) return '모레';
  else return `${diffDate}일 후`;
};

// yyyy.mm.dd 형식으로 변환
const converToyyyymmdd = data => {
  const date = new Date(data);

  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 <= 9
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate())
  );
};

const calculateReportWritingTime = createdAt => {
  const currentTime = new Date();
  const convertedCreatedAt = new Date(createdAt);
  const diff = currentTime.getTime() - convertedCreatedAt.getTime();

  const elapsedDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const elapsedHours = Math.floor(diff / (1000 * 60 * 60));
  const elapsedMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (diff < 1000 * 60) {
    return '방금 전';
  } else if (elapsedDays >= 7) {
    return converToyyyymmdd(createdAt);
  } else if (elapsedDays === 0) {
    if (elapsedHours === 0) return `${elapsedMinutes}분 전`;
    else return `${elapsedHours}시간 전`;
  } else {
    return `${elapsedDays}일 전`;
  }
};

export {
  convertToHour,
  calculateRemainDate,
  converToyyyymmdd,
  calculateReportWritingTime,
};
