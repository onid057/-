package com.a407.back.dto.Zipsa;

import com.a407.back.domain.Report;
import com.a407.back.dto.util.ReportSearchResult;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class ReportSearchResponse {

    private final List<ReportSearchResult> list;


    @Override
    public String toString() {
        return "ReportSearchResponse{" +
            "list=" + list +
            '}';
    }

    public ReportSearchResponse(List<Report> reports) {
        this.list = new ArrayList<>();
        for (Report report : reports) {
            this.list.add(new ReportSearchResult(report));
        }
    }
}
