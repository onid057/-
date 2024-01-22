package com.a407.back.model.repo;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import com.fasterxml.jackson.databind.deser.DataFormatReaders.Match;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository {

    List<Zipsa> findByConditions(MatchSearchRequest condition);

    Zipsa save(Zipsa zipsa);

    List<String> findCategoryNamesByZipsaId(Long zipsaId);

}
