package com.a407.back.dto.zipsa;

import com.a407.back.dto.util.ReportListDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportResponse {

    private String userName;
    private String zipsaName;
    private List<ReportListDto> reportList;

}
