import { styled } from 'styled-components';
import { Input } from '../components/common/Input';
import { Notice } from '../components/common/Notice';
import ProgressBar from '../components/common/ProgressBar';
import DateTimeInput from '../components/common/DateTimeInput';

const TestLeeWrapper = styled.div`
  width: 320px;
  height: 568px;
  margin: 0 auto 20px;
  padding: 10% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 1.3;
`;

function TestLee() {
  return (
    <TestLeeWrapper>
      <h1 style={{ fontWeight: 'bold' }}>수민이(이)의 테스트 페이지</h1>
      <hr style={{ marginBottom: '30px' }}></hr>

      <h2>수민이가 만든 Input 컴포넌트</h2>
      <Input></Input>
      <hr style={{ marginBottom: '30px' }}></hr>

      <h2>수민이가 만든 Notice 컴포넌트</h2>
      <Notice></Notice>
      <hr style={{ marginBottom: '30px' }}></hr>

      <h2>프로그래스 바 만들기</h2>
      <ProgressBar></ProgressBar>
      <hr style={{ marginBottom: '30px' }}></hr>

      <h2>DateTimeInput 만들기</h2>
      <DateTimeInput></DateTimeInput>
    </TestLeeWrapper>
  );
}

export default TestLee;
