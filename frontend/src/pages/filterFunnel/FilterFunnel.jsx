import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';
import {
  getFilteredHelperData,
  makeFilterSuggestion,
} from '../../apis/api/match';

import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import Condition from './Condition';
import HelperList from './HelperList';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
import Address from './Address';
import Detail from './Detail';

import CATEGORY_ID from '../../constants/categoryId';

function FilterFunnel() {
  const [filterData, setFilterData] = useState({});
  const [helperData, setHelperData] = useState([]);
  const [Funnel, setStep] = useFunnel('MAIN_CATEGORY');

  console.log(filterData);

  return (
    <Funnel>
      <Funnel.Step name="MAIN_CATEGORY">
        <MainCategory
          onPrevious={() => {
            setStep('CONDITION');
          }}
          onNext={data => {
            setStep('SUB_CATEGORY');
            setFilterData({ ...filterData, matchMainCategory: data });
          }}
          matchMainCategory={filterData.matchMainCategory}
        ></MainCategory>
      </Funnel.Step>

      <Funnel.Step name="SUB_CATEGORY">
        <SubCategory
          onPrevious={() => {
            setStep('MAIN_CATEGORY');
          }}
          onNext={data => {
            setStep('CONDITION');
            setFilterData({ ...filterData, matchSubCategory: data });
          }}
          matchMainCategory={filterData.matchMainCategory}
          matchSubCategory={filterData.matchSubCategory}
        ></SubCategory>
      </Funnel.Step>

      <Funnel.Step name="CONDITION">
        <Condition
          onPrevious={() => {
            setStep('SUB_CATEGORY');
          }}
          onNext={(gender, age, grade, score) => {
            setStep('HELPER_LIST');
            const nextFilterData = {
              ...filterData,
              genderCondition: gender,
              ageCondition: age,
              gradeCondition: grade,
              scoreCondition: score,
            };
            setFilterData(nextFilterData);
            getFilteredHelperData(
              CATEGORY_ID[nextFilterData.matchMainCategory][0],
              nextFilterData.genderCondition,
              nextFilterData.ageCondition,
              nextFilterData.gradeCondition,
              nextFilterData.scoreCondition,
            ).then(response => {
              console.log(response);
              setHelperData(response.data);
            });
          }}
          genderCondition={filterData.genderCondition}
          ageCondition={filterData.ageCondition}
          gradeCondition={filterData.gradeCondition}
          scoreCondition={filterData.scoreCondition}
        ></Condition>
      </Funnel.Step>

      <Funnel.Step name="HELPER_LIST">
        <HelperList
          onPrevious={() => {
            setStep('CONDITION');
          }}
          onNext={data => {
            setStep('DATE');
            setFilterData({ ...filterData, helperId: data });
          }}
          helperData={helperData}
          savedHelperId={filterData.helperId}
        ></HelperList>
      </Funnel.Step>

      {/* 여기까지 플로우 완성 */}

      <Funnel.Step name="DATE">
        <TargetDate
          onPrevious={() => {
            setStep('HELPER_LIST');
          }}
          onNext={data => {
            setStep('TIME');
            setFilterData({ ...filterData, matchDate: data });
          }}
          matchDate={filterData.matchDate}
        ></TargetDate>
      </Funnel.Step>

      <Funnel.Step name="TIME">
        <TargetTime
          onPrevious={() => {
            setStep('DATE');
          }}
          onNext={(startTime, endTime) => {
            setStep('ADDRESS');
            setFilterData({
              ...filterData,
              matchStartTime: startTime,
              matchEndTime: endTime,
            });
          }}
          matchStartTime={filterData.matchStartTime}
          matchEndTime={filterData.matchEndTime}
        ></TargetTime>
      </Funnel.Step>

      <Funnel.Step name="ADDRESS">
        <Address
          onPrevious={() => {
            setStep('TIME');
          }}
          onNext={(address, detailAddress) => {
            setStep('DETAIL');
            setFilterData({
              ...filterData,
              matchAddress: address,
              matchDetailAddress: detailAddress,
            });
          }}
          matchAddress={filterData.matchAddress}
          matchDetailAddress={filterData.matchDetailAddress}
        ></Address>
      </Funnel.Step>

      <Funnel.Step name="DETAIL">
        <Detail
          onPrevious={() => {
            setStep('ADDRESS');
          }}
          onNext={data => {
            // setStep('CONDITION');
            // setFilterData({ ...filterData, matchDetail: data });
            makeFilterSuggestion(
              1,
              CATEGORY_ID[filterData.matchMainCategory][1][
                filterData.matchSubCategory
              ],
              '도움이 필요합니다!',
              filterData.Detail,
              filterData.address + ' ' + filterData.detailAddress,
              filterData.endTime - filterData.startTime,
              new Date().toJSON(),
              new Date(
                filterData.matchDate.setHours(filterData.startTime, 0, 0, 0),
              ).toJSON(),
              new Date(
                filterData.matchDate.setHours(filterData.endTime, 0, 0, 0),
              ).toJSON(),
              helperData.gradeSalary,
              filterData.helperId,
            ).then(response => {
              console.log(response);
            });
          }}
          matchDetail={filterData.matchDetail}
        ></Detail>
      </Funnel.Step>
    </Funnel>
  );
}

export default FilterFunnel;
