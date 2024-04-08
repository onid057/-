import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';
import {
  getFilteredZipsaData,
  makeFilterSuggestion,
} from '../../apis/api/filter';
import { useNavigate } from 'react-router-dom';

import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import Condition from './Condition';
import ZipsaList from './ZipsaList';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
import Address from './Address';
import Connection from './Connection';
import Detail from './Detail';

import CATEGORY_ID from '../../constants/categoryId';

function FilterFunnel() {
  const [filterData, setFilterData] = useState({});
  const [zipsaData, setZipsaData] = useState([]);
  const [Funnel, setStep] = useFunnel('MAIN_CATEGORY');
  const navigate = useNavigate();

  return (
    <Funnel>
      <Funnel.Step name="MAIN_CATEGORY">
        <MainCategory
          onPrevious={() => {
            navigate('/');
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
            setStep('ZIPSA_LIST');
            const nextFilterData = {
              ...filterData,
              genderCondition: gender,
              ageCondition: age,
              gradeCondition: grade,
              scoreCondition: score,
            };
            setFilterData(nextFilterData);
            getFilteredZipsaData(
              CATEGORY_ID[nextFilterData.matchMainCategory][0],
              nextFilterData.genderCondition,
              nextFilterData.ageCondition,
              nextFilterData.gradeCondition,
              nextFilterData.scoreCondition,
            ).then(response => {
              setZipsaData(response.data);
            });
          }}
          genderCondition={filterData.genderCondition}
          ageCondition={filterData.ageCondition}
          gradeCondition={filterData.gradeCondition}
          scoreCondition={filterData.scoreCondition}
        ></Condition>
      </Funnel.Step>

      <Funnel.Step name="ZIPSA_LIST">
        <ZipsaList
          onPrevious={() => {
            setStep('CONDITION');
          }}
          onNext={data => {
            setStep('DATE');
            setFilterData({ ...filterData, zipsaId: data });
          }}
          zipsaData={zipsaData}
          savedZipsaId={filterData.zipsaId}
        ></ZipsaList>
      </Funnel.Step>

      <Funnel.Step name="DATE">
        <TargetDate
          onPrevious={() => {
            setStep('ZIPSA_LIST');
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
            setStep('CONNECTION');
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

      <Funnel.Step name="CONNECTION">
        <Connection
          onPrevious={() => {
            setStep('ADDRESS');
          }}
          onNext={data => {
            setStep('DETAIL');
            setFilterData({
              ...filterData,
              matchUserId: data,
            });
          }}
          matchUserId={filterData.matchUserId}
        ></Connection>
      </Funnel.Step>

      <Funnel.Step name="DETAIL">
        <Detail
          onPrevious={() => {
            setStep('CONNECTION');
          }}
          onNext={data => {
            const nextMatchDetailData = { ...filterData, matchDetail: data };
            setFilterData(nextMatchDetailData);
            makeFilterSuggestion(
              filterData.matchUserId,
              CATEGORY_ID[filterData.matchMainCategory][1][
                filterData.matchSubCategory
              ],
              '제목 없음',
              nextMatchDetailData.matchDetail,
              filterData.matchAddress + ' ' + filterData.matchDetailAddress,
              filterData.matchEndTime - filterData.matchStartTime,
              new Date().toJSON(),
              new Date(
                filterData.matchDate.setHours(
                  parseInt(filterData.matchStartTime),
                  0,
                  0,
                  0,
                ),
              ).toJSON(),
              new Date(
                filterData.matchDate.setHours(
                  parseInt(filterData.matchEndTime),
                  0,
                  0,
                  0,
                ),
              ).toJSON(),
              zipsaData[0].gradeSalary,
              filterData.zipsaId,
            );
            navigate('/startMatch');
          }}
          matchDetail={filterData.matchDetail}
        ></Detail>
      </Funnel.Step>
    </Funnel>
  );
}

export default FilterFunnel;
