package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.association.AssociationAdditionCodeResponse;
import com.a407.back.model.service.AssociationService;
import com.a407.back.model.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.Objects;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
@Transactional
class AssociationControllerTest {


    @Autowired
    AssociationService associationService;

    @Autowired
    UserService userService;

    @Autowired
    EntityManager em;

    @Autowired
    @Qualifier("associationRedisTemplate")
    RedisTemplate<String, String> redisTemplate;


    Long userIdOne;
    Long userIdTwo;
    Long userIdThree;

    @BeforeEach
    void beforeEach() {
        User userOne = User.builder().email("userOne@abc.com").name("userOne").password("userOne")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        User userTwo = User.builder().email("userTwo@abc.com").name("userTwo").password("userTwo")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        User userThree = User.builder().email("userThree@abc.com").name("userThree")
            .password("userThree").birth(Timestamp.valueOf("2024-01-01 01:01:01"))
            .gender(Gender.MAN).address("서울시").latitude(36.5).longitude(127.5).isAdmin(false)
            .isAffiliated(false).isBlocked(false).isCertificated(false).build();

        userIdOne = userService.makeUser(userOne);
        userIdTwo = userService.makeUser(userTwo);
        userIdThree = userService.makeUser(userThree);
    }

    @AfterEach
    void afterEach() {
        Objects.requireNonNull(redisTemplate.keys("*")).forEach(key -> redisTemplate.delete(key));
    }

    @Test
    @DisplayName("연동 계정 생성")
    void makeAssociation() {
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();
        associationService.makeAssociation(userIdOne);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isTrue();
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).get(0)
            .getId()).isEqualTo(userIdOne);
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).get(0)
            .getIsRepresentative()).isTrue();
    }

    @Test
    @DisplayName("연동 계정 참가 목록 확인")
    void getAssociationUserList() throws NoSuchAlgorithmException, JsonProcessingException {
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();
        associationService.makeAssociation(userIdOne);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isTrue();
        Long associationId = userService.findByUserId(userIdOne).getAssociationId()
            .getAssociationId();

        AssociationAdditionCodeResponse associationAdditionCodeResponse = associationService.makeAdditionCode(
            userIdOne, "test@test.com", associationId);

        assertThat(associationAdditionCodeResponse.getLeftTime()).isGreaterThan(1700);

        assertThat(userService.findByUserId(userIdTwo).getIsAffiliated()).isFalse();

        associationService.changeAssociation(userIdTwo,
            associationAdditionCodeResponse.getAdditionCode());
        em.flush();
        em.clear();

        assertThat(associationService.getAssociationUserList(associationId)).hasSize(2);
        assertThat(
            userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).isEqualTo(
            userService.findByUserId(userIdTwo).getAssociationId().getAssociationId());


    }

    @Test
    @DisplayName("연동 계정 삭제")
    void deleteAssociation() {
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();
        associationService.makeAssociation(userIdOne);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isTrue();
        Long associationId = userService.findByUserId(userIdOne).getAssociationId()
            .getAssociationId();
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).get(0)
            .getId()).isEqualTo(userIdOne);

        associationService.deleteAssociation(userIdOne);
        em.flush();
        em.clear();

        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();

        assertThat(associationService.getAssociationUserList(associationId)).isEmpty();

//        Assertions.assertThrows(NullPointerException.class,
//            () -> associationService.getAssociationUserList(associationId));

    }

    @Test
    @DisplayName("연동 계정 참가 코드 생성")
    void makeAdditionCode() throws NoSuchAlgorithmException, JsonProcessingException {
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();
        associationService.makeAssociation(userIdOne);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isTrue();
        Long associationId = userService.findByUserId(userIdOne).getAssociationId()
            .getAssociationId();

        AssociationAdditionCodeResponse associationAdditionCodeResponse = associationService.makeAdditionCode(
            userIdOne, "test@test.com", associationId);

        assertThat(associationAdditionCodeResponse.getLeftTime()).isGreaterThan(1700);

    }

    @Test
    @DisplayName("연동 계정 참가")
    void changeAddition() throws NoSuchAlgorithmException, JsonProcessingException {

        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();
        associationService.makeAssociation(userIdOne);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isTrue();
        Long associationId = userService.findByUserId(userIdOne).getAssociationId()
            .getAssociationId();

        AssociationAdditionCodeResponse associationAdditionCodeResponse = associationService.makeAdditionCode(
            userIdOne, "test@test.com", associationId);

        assertThat(associationAdditionCodeResponse.getLeftTime()).isGreaterThan(1700);

        assertThat(userService.findByUserId(userIdTwo).getIsAffiliated()).isFalse();

        associationService.changeAssociation(userIdTwo,
            associationAdditionCodeResponse.getAdditionCode());
        em.flush();
        em.clear();

        assertThat(associationService.getAssociationUserList(associationId)).hasSize(2);
        assertThat(
            userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).isEqualTo(
            userService.findByUserId(userIdTwo).getAssociationId().getAssociationId());

    }

    @Test
    @DisplayName("대표 변경")
    void changeAssociationRepresentative()
        throws NoSuchAlgorithmException, JsonProcessingException {
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isFalse();
        associationService.makeAssociation(userIdOne);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userIdOne).getIsAffiliated()).isTrue();
        Long associationId = userService.findByUserId(userIdOne).getAssociationId()
            .getAssociationId();

        AssociationAdditionCodeResponse associationAdditionCodeResponse = associationService.makeAdditionCode(
            userIdOne, "test@test.com", associationId);

        assertThat(associationAdditionCodeResponse.getLeftTime()).isGreaterThan(1700);

        assertThat(userService.findByUserId(userIdTwo).getIsAffiliated()).isFalse();

        associationService.changeAssociation(userIdTwo,
            associationAdditionCodeResponse.getAdditionCode());
        em.flush();
        em.clear();

        assertThat(associationService.getAssociationUserList(associationId)).hasSize(2);
        assertThat(
            userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).isEqualTo(
            userService.findByUserId(userIdTwo).getAssociationId().getAssociationId());
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).get(0)
            .getIsRepresentative()).isTrue();
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdTwo).getAssociationId().getAssociationId()).get(1)
            .getIsRepresentative()).isFalse();
        associationService.changeAssociationRepresentative(userIdOne, userIdTwo);
        em.flush();
        em.clear();
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdOne).getAssociationId().getAssociationId()).get(0)
            .getIsRepresentative()).isFalse();
        assertThat(associationService.getAssociationUserList(
                userService.findByUserId(userIdTwo).getAssociationId().getAssociationId()).get(1)
            .getIsRepresentative()).isTrue();

    }
}