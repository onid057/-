import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DateTimeWrapper = styled.div`
  box-sizing: border-box;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const InsideWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 21px;
`;

const TitleBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-weight: light;
  font-size: 16px;
  color: gray;
  background-color: #ffffff;
  border-radius: 25px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LongSelectBox = styled.select`
  width: 70px;
  border: none;
  /* border-bottom: 1px solid rgb(0, 0, 0, 0.3); */
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  -webkit-appearance: none;
  appearance: none;
`;

const ShortSelectBox = styled.select`
  width: 40px;
  border: none;
  /* border-bottom: 1px solid rgb(0, 0, 0, 0.3); */
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  -webkit-appearance: none;
  appearance: none;
`;

const SelectDefault = styled.option`
  display: none;
  font-size: bold;
  color: #d3d3d0;
`;

function DateTimeInputSelect() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  const yearList = [2024, 2025, 2026];
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dayList = Array.from({ length: 31 }, (_, index) => index + 1);
  const hourList = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const minuteList = [0, 10, 20, 30, 40, 50];
  const termList = [1, 2, 3, 4, 5];

  return (
    <DateTimeWrapper>
      <InsideWrapper>
        <TitleBox>
          <span>날짜</span>
        </TitleBox>

        <ContentBox style={{ padding: '30px' }}>
          <InnerContainer>
            <LongSelectBox required>
              <SelectDefault disabled hidden selected>
                {year}
              </SelectDefault>
              {yearList.map((item, index) => {
                return <option value={item}>{item}</option>;
              })}
            </LongSelectBox>
            <span>년</span>
          </InnerContainer>
          <InnerContainer>
            <ShortSelectBox required>
              <SelectDefault disabled hidden selected>
                {month}
              </SelectDefault>
              {monthList.map((item, index) => {
                return <option value={item}>{item}</option>;
              })}
            </ShortSelectBox>
            <span>월</span>
          </InnerContainer>
          <InnerContainer>
            <ShortSelectBox required>
              <SelectDefault disabled hidden selected>
                {date}
              </SelectDefault>
              {dayList.map((item, index) => {
                return <option value={item}>{item}</option>;
              })}
            </ShortSelectBox>
            <span>일</span>
          </InnerContainer>
        </ContentBox>

        <TitleBox>
          <span>시간</span>
        </TitleBox>

        <ContentBox>
          <InnerContainer>
            <ShortSelectBox required>
              <SelectDefault disabled hidden selected>
                00
              </SelectDefault>
              {hourList.map((item, index) => {
                return <option value={item}>{item}</option>;
              })}
            </ShortSelectBox>
            <span>시</span>
            <ShortSelectBox required>
              <SelectDefault disabled hidden selected>
                00
              </SelectDefault>
              {minuteList.map((item, index) => {
                return <option value={item}>{item}</option>;
              })}
            </ShortSelectBox>
            <span>분</span>
          </InnerContainer>
          <span>부터</span>
        </ContentBox>

        <ContentBox>
          <InnerContainer>
            <ShortSelectBox required>
              <SelectDefault disabled hidden selected>
                0
              </SelectDefault>
              {termList.map((item, index) => {
                return <option value={item}>{item}</option>;
              })}
            </ShortSelectBox>
            <span>시간</span>
          </InnerContainer>
          <span>동안</span>
        </ContentBox>
      </InsideWrapper>
    </DateTimeWrapper>
  );
}

export default DateTimeInputSelect;
