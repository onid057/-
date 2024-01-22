package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.MatchRepository;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MatchService {

    private final MatchRepository matchRepository;
    private final CategoryRepository categoryRepository;

    public MatchService(MatchRepository matchRepository, CategoryRepository categoryRepository) {
        this.matchRepository = matchRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Zipsa> getMatchesByConditions(MatchSearchRequest condition) {
        return matchRepository.findByConditions(condition);
    }


    public List<String> getCategoryNamesForZipsa(Zipsa zipsa) {
        return matchRepository.findCategoryNamesByZipsaId(zipsa.getZipsaId().getUserId());
    }
}
