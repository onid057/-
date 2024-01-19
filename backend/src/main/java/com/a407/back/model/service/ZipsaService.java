package com.a407.back.model.service;

import com.a407.back.dto.ReportCreateRequest;
import java.io.IOException;

public interface ZipsaService {

    Long saveReport(ReportCreateRequest reportCreateRequest) throws IOException;

}
