package com.a407.back.model.repo;

import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.MatchSearchRequest;
import java.util.List;

public interface MatchRepository {

    List<Zipsa> findByConditions(MatchSearchRequest condition);

    List<String> findCategoryNamesByZipsaId(Long zipsaId);

    Room makeRoom (Room room);

}
