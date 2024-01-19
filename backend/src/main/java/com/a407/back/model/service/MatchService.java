package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import com.a407.back.model.repo.MatchRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public List<Zipsa> getMatchesByConditions(MatchSearchRequest condition) {
        return matchRepository.findByConditions(condition);
    }
}
