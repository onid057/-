package com.a407.back.controller;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchSearchRequest;
import com.a407.back.model.service.MatchService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/filter?majorCategory={majorCategory}&gender={gender}&age={age}&grade={grade}&score={score}")
    public ResponseEntity<List<Zipsa>> getZipsas(MatchSearchRequest condition) {
        List<Zipsa> zipsas = matchService.getMatchesByConditions(condition);
        return ResponseEntity.ok(zipsas);
    }
}
