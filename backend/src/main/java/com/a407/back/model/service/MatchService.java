package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.MatchSearchRequest;
import com.a407.back.dto.Match.MatchSearchResponse;
import com.a407.back.dto.Match.RoomCreateRequest;
import java.util.List;

public interface MatchService {

    List<MatchSearchResponse> getMatchSearchResponses(MatchSearchRequest request);

    List<String> getCategoryNamesForZipsa(Zipsa zipsa);

    Long makeFilterRoom(RoomCreateRequest roomCreateRequest);
}