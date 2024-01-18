// 20240115 figma 작성
// 프론트 엔드 개발환경 세팅 : Git, Jira

// 20240116
// prettierrc 익스텐션 설치 및 실습
console.log('hihi');
function name(params) {
	console.log('dd');
}

// 20240117 count 함수 만들어보기
import { useState } from 'react';

function counter() {
	const [cnt, setCnt] = useState(0);
	return <button onClick={() => setCnt(cnt + 1)}>하나더하기!</button>;
}
