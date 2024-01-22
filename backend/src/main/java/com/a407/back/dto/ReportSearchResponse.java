package com.a407.back.dto;

import com.a407.back.domain.Report;
import java.io.IOException;
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

    public ReportSearchResponse(List<Report> reports) throws IOException {
        this.list = new ArrayList<>();
        for (Report report : reports) {
            this.list.add(new ReportSearchResult(report));
        }
    }
}
