package com.a407.back.model.repo;

import com.a407.back.domain.Room;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import com.a407.back.dto.MatchSearchResponse;
import com.fasterxml.jackson.databind.deser.DataFormatReaders.Match;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository {

    List<Zipsa> findByConditions(MatchSearchRequest condition);

    List<String> findCategoryNamesByZipsaId(Long zipsaId);

    Room makeRoom (Room room);

}
