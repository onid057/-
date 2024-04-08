CREATE TABLE USER
(
    user_id bigint auto_increment primary key,
    association_id int,
    email varchar(30) not null,
    password varchar(100) not null,
    name varchar(20) not null,
    birth date not null,
    gender ENUM('MAN', 'WOMAN') not null,
    phone_number varchar(20),
    address varchar(50) not null,
    profile_image varchar(120),
    is_certificated boolean not null default false,
    latitude double not null,
    longitude double not null,
    account varchar(20),
    is_blocked boolean not null default false,
    is_admin boolean not null default false,
    is_affiliated boolean not null default false,
    service_count int not null default 0
) default character set utf8 collate utf8_general_ci;

CREATE TABLE ASSOCIATION (
    association_id bigint auto_increment primary key,
    user_id bigint not null,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references USER(user_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE GRADE (
    grade_id bigint auto_increment primary key,
    name varchar(20) not null,
    salary int not null
) default character set utf8 collate utf8_general_ci;

CREATE TABLE ZIPSA (
    zipsa_id bigint primary key,
    grade_id bigint not null default 1,
    description varchar(100) not null,
    account varchar(20) not null,
    is_worked boolean not null default false,
    prefer_tag varchar(100) not null,
    service_count int default 0,
    reply_average double default 0,
    reply_count int default 0,
    kindness_average double default 0,
    skill_average double default 0,
    rewind_average double default 0,
    foreign key (zipsa_id) references USER(user_id),
    foreign key (grade_id) references GRADE(grade_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE BOARD (
    board_id bigint auto_increment primary key,
    user_id bigint not null,
    title varchar(50) not null,
    content varchar(300) not null,
    updated_at timestamp default current_timestamp,
    foreign key (user_id) references USER(user_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE TAG (
    tag_id bigint auto_increment primary key,
    name varchar(20) not null
) default character set utf8 collate utf8_general_ci;

CREATE TABLE BOARD_TAG (
    board_id bigint not null,
    tag_id bigint not null,
    constraint board_tag_pk primary key (board_id, tag_id),
    foreign key (board_id) references BOARD(board_id),
    foreign key (tag_id) references TAG(tag_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE COMMENT (
    comment_id bigint auto_increment primary key,
    board_id bigint not null,
    user_id bigint not null,
    content varchar(100) not null,
    updated_at timestamp not null default current_timestamp,
    foreign key (board_id) references BOARD(board_id),
    foreign key (user_id) references USER(user_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE MAJOR_CATEGORY (
    major_category_id bigint auto_increment primary key,
    name varchar(20) not null
) default character set utf8 collate utf8_general_ci;

CREATE TABLE SUB_CATEGORY (
    sub_category_id bigint auto_increment primary key,
    major_category_id bigint not null,
    name varchar(30) not null,
    foreign key (major_category_id) references MAJOR_CATEGORY(major_category_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE ZIPSA_CATEGORY (
    zipsa_id bigint not null,
    major_category_id bigint not null,
    constraint zipsa_category_pk primary key (zipsa_id, major_category_id),
    foreign key (zipsa_id) references ZIPSA(zipsa_id),
    foreign key (major_category_id) references MAJOR_CATEGORY(major_category_id)
) default character set utf8 collate utf8_general_ci;


CREATE TABLE ROOM (
    room_id bigint auto_increment primary key,
    user_id bigint not null,
    zipsa_id bigint,
    sub_category_id bigint not null,
    title varchar(30),
    content varchar(200) not null,
    place varchar(50) not null,
    estimate_duration int not null,
    room_created_at timestamp default current_timestamp,
    match_created_at timestamp,
    is_reported boolean not null default false,
    report_cycle int default 0,
    is_public boolean not null default false,
    notification_count int not null,
    started_at timestamp,
    ended_at timestamp,
    expectation_pay int not null,
    expectation_started_at timestamp not null,
    expectation_ended_at timestamp not null,
    total_pay int default 0,
    is_complained boolean not null default false,
    is_reviewed boolean not null default false,
    status ENUM('CREATE', 'BEFORE', 'ONGOING', 'END', 'BROKEN') default 'CREATE',
    foreign key (user_id) references USER(user_id),
    foreign key (zipsa_id) references ZIPSA(zipsa_id),
    foreign key (sub_category_id) references SUB_CATEGORY(sub_category_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE NOTIFICATION (
    notification_id bigint auto_increment primary key,
    room_id bigint not null,
    send_id bigint not null,
    receive_id bigint not null,
    is_read boolean not null default false,
    created_at timestamp default current_timestamp,
    type ENUM('USER', 'ZIPSA', 'ASSOCIATION') not null,
    status ENUM('STANDBY', 'ACCEPT', 'REJECT', 'CLOSE', 'CONFIRM') default 'STANDBY',
    foreign key (room_id) references ROOM(room_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE COMPLAIN (
    complain_id bigint auto_increment primary key,
    room_id bigint not null,
    content varchar(50) not null,
    is_processed boolean not null default false,
    foreign key (room_id) references ROOM(room_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE REPORT (
    report_id bigint auto_increment primary key,
    room_id bigint not null,
    process_image varchar(120) not null,
    process_content varchar(50) not null,
    created_at timestamp default current_timestamp,
    foreign key (room_id) references ROOM(room_id)
) default character set utf8 collate utf8_general_ci;

CREATE TABLE REVIEW (
    review_id bigint auto_increment primary key,
    user_id bigint not null,
    zipsa_id bigint not null,
    content varchar(50) not null,
    kindness_score int not null,
    skill_score int not null,
    rewind_score int not null,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references USER(user_id),
    foreign key (zipsa_id) references ZIPSA(zipsa_id)
) default character set utf8 collate utf8_general_ci;