package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Table(name = "USER")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", updatable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "association_id")
    private Association associationId;

    @Column(name = "email", nullable = false, length = 30)
    private String email;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "birth", nullable = false, columnDefinition = "TIMESTAMP")
    private Timestamp birth;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "address", nullable = false, length = 50)
    private String address;

    @Lob
    @Column(name = "profile_image", columnDefinition = "MEDIUMBLOB")
    private byte[] profileImage;

    @Column(name = "is_certificated")
    private boolean isCertificated;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "account", length = 20)
    private String account;

    @ColumnDefault("false")
    @Column(name = "is_blocked", nullable = false)
    private boolean isBlocked;

    @ColumnDefault("false")
    @Column(name = "is_admin", nullable = false)
    private boolean isAdmin;

    @ColumnDefault("false")
    @Column(name = "is_affiliated", nullable = false)
    private boolean isAffiliated;

    @Column(name = "service_count")
    private int serviceCount;


    @Builder
    public User(Long userId, Association associationId, String email, String password, String name,
        Timestamp birth, Gender gender, String address, byte[] profileImage, boolean isCertificated,
        Double latitude, Double longitude, String account, boolean isBlocked, boolean isAdmin,
        boolean isAffiliated, int serviceCount) {
        this.userId = userId;
        this.associationId = associationId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
        this.address = address;
        this.profileImage = profileImage;
        this.isCertificated = isCertificated;
        this.latitude = latitude;
        this.longitude = longitude;
        this.account = account;
        this.isBlocked = isBlocked;
        this.isAdmin = isAdmin;
        this.isAffiliated = isAffiliated;
        this.serviceCount = serviceCount;
    }

    public enum Gender {
        man, woman
    }

}
