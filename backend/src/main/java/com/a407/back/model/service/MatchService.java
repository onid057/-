package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import java.util.List;

public interface MatchService {
    List<Zipsa> getMatchesByConditions(MatchSearchRequest condition);
    List<String> getCategoryNamesForZipsa(Zipsa zipsa);
    List<Zipsa> findByIsWorked(boolean isWorked);
}