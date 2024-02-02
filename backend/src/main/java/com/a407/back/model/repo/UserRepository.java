package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.user.UserPhoneNumberAndEmail;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;

public interface UserRepository {

    User findByUserEmail(String email);

    User makeUser(User user);

    List<Notification> findNotificationByUserIdList(Long userId, String type);

    User findByUserId(Long userId);

    List<Zipsa> findNearZipsaList(Long userId);

    List<Room> getUserRecordList(Long userId);

    List<Room> getUserReservationList(Long userId);

    void makeAccount(Long userId, String account);

    void deleteAccount(User user, String account);

    void makePhoneNumber(String phoneNumber, String email);

    void makeAssociation(Long userId, Long associationId);

    List<User> searchAssociationUserList(Long associationId);

    void deleteAssociation(Long userId);

    List<Long> searchAssociationUserIdList(Long associationId);

    boolean findIsAffiliated(Long userId);

    void makeSendMessage(UserPhoneNumberAndEmail userPhoneNumberAndEmail, String code)
            throws JsonProcessingException;

    UserPhoneNumberAndEmail findMessage(String code) throws JsonProcessingException;

    String findCode(String code);
}
