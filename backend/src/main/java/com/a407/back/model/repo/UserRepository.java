package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.User;
import com.a407.back.dto.User.UserAssociationResponse;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
import java.util.List;

public interface UserRepository {

    User findByUserEmail(String email);

    User save(User user);

    List<Notification> findNotificationByUserIdList(Long userId, String type);

    User findByUserId(Long userId);

    UserNearZipsaResponse findNearZipsaList(Long userId);

    UserRecordsResponse findRecordsByUserId(Long userId);
    
    UserReservationResponse findReservationByUserId(Long userId);
    void saveAccount(Long userId, String account);

    void deleteAccount(User user, String account);

    void savePhoneNumber(String phoneNumber, String email);

    void makeAssociation(Long userId, Long associationId);

    List<UserAssociationResponse> searchAssociationUserList(Long associationId);

    void deleteAssociation(Long userId);

    List<Long> searchAssociationUserIdList(Long associationId);

    boolean findIsAffiliated(Long userId);
}
