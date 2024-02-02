package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.MatchSearchRequest;
import com.a407.back.dto.match.MatchSearchResponse;
import com.a407.back.dto.match.RoomCreateRequest;
import java.util.List;

public interface MatchService {

    List<MatchSearchResponse> getFilteredZipsaList(MatchSearchRequest matchSearchRequest);

    List<String> getCategoryNamesForZipsa(Zipsa zipsa);

    Long changeMatchStartedAt(Long roomId);

    Long changeMatchEndedAt(Long roomId);

    void changeMatchStatus(Long roomId, String status);

    Long makeFilterRoom(RoomCreateRequest roomCreateRequest);
}