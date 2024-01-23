import { styled } from 'styled-components';
import Input from '../components/common/Input';
import ProgressBar from '../components/common/ProgressBar';
import DateTimeInputInput from '../components/common/DateTimeInputInput';
import DateTimeInputSelect from '../components/common/DateTimeInputSelect';
import AddressInput from '../components/common/AddressInput';
import LongInputBox from '../components/common/LongInputBox';
import MainCategory from './filterFunnel/MainCategory';
import SubCategory from './filterFunnel/SubCategory';
import DateTime from './filterFunnel/DateTime';
import Location from './filterFunnel/Location';
import Description from './filterFunnel/Description';
import Condition from './filterFunnel/Condition';

const TestLeeWrapper = styled.div`
  width: 320px;
  height: auto;
  margin: 0 auto;
  padding: 10% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 1.3;
`;

const H2title = styled.h2`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #7e7e7e;
  font-size: small;
  color: white;
`;

function TestLee() {
  return (
    <TestLeeWrapper>
      <h1 style={{ fontWeight: 'bold' }}>수민이(이)의 테스트 페이지</h1>
      <hr style={{ marginBottom: '30px' }}></hr>

      <H2title>수민이가 만든 Input 컴포넌트</H2title>
      <Input
        width="90%"
        labelText="ddd"
        placeholder="장수민"
        commentText={'dsfsf'}
      ></Input>
      <hr style={{ marginBottom: '30px' }}></hr>

      <H2title>프로그ddd래스 바 만들기</H2title>
      <ProgressBar></ProgressBar>
      <hr style={{ marginBottom: '30px' }}></hr>

      <H2title>DateTimeInput 만들기</H2title>
      <DateTimeInputInput></DateTimeInputInput>
      <DateTimeInputSelect></DateTimeInputSelect>

      <H2title>AddressInput 만들기</H2title>
      <AddressInput></AddressInput>

      <H2title>LongInputBox 만들기</H2title>
      <LongInputBox></LongInputBox>

      <H2title>MainCategory 만들기</H2title>
      <MainCategory></MainCategory>

      <H2title>SubCategory 만들기</H2title>
      <SubCategory></SubCategory>

      <H2title>DateTime 만들기</H2title>
      <DateTime></DateTime>

      <H2title>Location 만들기</H2title>
      <Location></Location>

      <H2title>Description 만들기</H2title>
      <Description></Description>

      <H2title>Condition 만들기</H2title>
      <Condition></Condition>
    </TestLeeWrapper>
  );
}

export default TestLee;
