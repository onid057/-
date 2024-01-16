// 20240115 프론트엔드 개발 환경 구성 완료

// prettier 설정 확인
import { useReducer } from 'react';

const init = () => {
	return { value: 43 };
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { value: state.value + 1 };
		case 'DECREMENT':
			return { value: state.value - 1 };
		default:
			return state;
	}
};

export function page() {
	const [state, dispatch] = useReducer(reducer, { value: 42 }, init);

	return (
		<>
			<div>{state.value}</div>
			<button onClick={dispatch('INCREMENT')}>+</button>
			<button onClick={dispatch('DECREMENT')}>-</button>
		</>
	);
}
