import React, { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';
import { makeRoom } from '../../apis/api/room';
import { useNavigate } from 'react-router-dom';

import DetailContent from './DetailContent';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
import Address from './Address';
import SuggestPayment from './SuggestPayment';

function CreateRoomFunnel() {
  const [filterData, setFilterData] = useState({});
  const [Funnel, setStep] = useFunnel('DETAIL');
  const navigate = useNavigate();

  return (
    <Funnel>
      <Funnel.Step name="DETAIL">
        <DetailContent
          onPrevious={() => {
            navigate(-1);
          }}
          onNext={(title, content) => {
            setStep('DATE');
            setFilterData({
              ...filterData,
              matchTitle: title,
              matchContent: content,
            });
          }}
          matchTitle={filterData.matchTitle}
          matchContent={filterData.matchContent}
        ></DetailContent>
      </Funnel.Step>

      <Funnel.Step name="DATE">
        <TargetDate
          onPrevious={() => {
            setStep('DETAIL');
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
            setStep('PAYMENT');
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

      <Funnel.Step name="PAYMENT">
        <SuggestPayment
          onPrevious={() => {
            setStep('ADDRESS');
          }}
          onNext={payment => {
            const roomData = {
              ...filterData,
              matchPayment: payment,
            };
            setFilterData(roomData);
            makeRoom(
              41,
              roomData.matchTitle,
              roomData.matchContent,
              roomData.matchAddress + ' ' + roomData.matchDetailAddress,
              roomData.matchEndTime - roomData.matchStartTime,
              new Date().toJSON(),
              new Date(
                roomData.matchDate.setHours(
                  parseInt(roomData.matchStartTime),
                  0,
                  0,
                  0,
                ),
              ).toJSON(),
              new Date(
                roomData.matchDate.setHours(
                  parseInt(roomData.matchEndTime),
                  0,
                  0,
                  0,
                ),
              ).toJSON(),
              roomData.matchPayment,
            ).then(response => {
              navigate('/rooms/complete');
            });
          }}
          matchPayment={filterData.matchPayment}
          matchServiceTime={filterData.matchEndTime - filterData.matchStartTime}
        ></SuggestPayment>
      </Funnel.Step>
    </Funnel>
  );
}

export default CreateRoomFunnel;
