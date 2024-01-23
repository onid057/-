package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.MatchRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Zipsa> getMatchesByConditions(MatchSearchRequest condition) {
        return matchRepository.findByConditions(condition);
    }

    @Override
    public List<String> getCategoryNamesForZipsa(Zipsa zipsa) {
        return matchRepository.findCategoryNamesByZipsaId(zipsa.getZipsaId().getUserId());
    }

    @Override
    public List<Zipsa> findByIsWorked(boolean isWorked) {
        return matchRepository.findByIsWorked(isWorked);
    }
}
