package com.a407.back.model.repo;

import com.a407.back.domain.SubCategory;

public interface CategoryRepository {

    String findMajorCategoryName(Long majorId);

    SubCategory findBySubCategoryId(Long subCategoryId);

}
