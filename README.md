# 한집사

## 개요
### 한집사

**한**동네 **집**근처 **사**람 만나기

고령화 사회가 심각해지고 바쁜 생활에서 부모님을 모시고 병원 동행을 할 수 있는 가족이 없는 경우에 부모님과 동행을 할 수 있는 사람 혹은 간단한 심부름 할 사람을 구하는 서비스 입니다.


### 프로젝트 진행 기간
2024.01.03(수) ~ 2024.02.16(금) (45일간 진행)

## 개발 환경

### Back
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/SpringBoot-236DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Querydsl](https://img.shields.io/badge/Querydsl-black?style=for-the-badge)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![nurigo](https://img.shields.io/badge/nurigo-black?style=for-the-badge)


### Front
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Dom](https://img.shields.io/badge/React%20Dom-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=React)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Router Dom](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![axios](https://img.shields.io/badge/axios-d1d1d1?style=for-the-badge&logo=axios&logoColor=violet)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)


### Infra
![EC2](https://img.shields.io/badge/EC2-E95420?style=for-the-badge&logo=amazonec2&logoColor=white)
![S3](https://img.shields.io/badge/S3-%23009639?style=for-the-badge&logo=amazons3&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)


### IDE
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)


### Management Tool
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Mattermost](https://img.shields.io/badge/Mattermost-000000?style=for-the-badge&logo=Mattermost&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![GitLab](https://img.shields.io/badge/gitlab-E95420.svg?style=for-the-badge&logo=gitlab&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)


## 서비스 화면

메인 부터 매칭까지~~~

## 주요 기능

|기능|설명|
|----|----|
|필터링 매칭|성별, 나이, 집사 등급, 평균 점수 등 다양한 조건을 설정한 후 조건에 부합하는 집사들의 목록중 원하는 집사에게 업무 제안하여 사용자가 원하는 집사를 선택 하여 업무를 제안 합니다.|
|지도 기반 매칭|현재 사용자 근처에서 활동중인 집사들을 찾아서 빠르게 집사에게 업무를 제안을 합니다.|
|공개 방 생성|필터링 매칭과 지도 기반 매칭에서 원하는 업무를 하는 집사가 없는 경우 사용자가 공개 방을 생성한 후 조건들을 설정하고 사용자의 조건들을 집사가 확인 후 신청을 하면 업무가 이루어 질 수 있습니다.|

## 기술 소개

### 프론트
|기술명|개선사항|
|---|---|
|공통 컴포넌트|모바일에서 사용되는 유사한 UI 요소를 공통 컴포넌트로 추출하고, 합성을 통해 페이지를 구축 하여 적절한 확장성을 고려하는데 어려움이 있었지만 동일한 코드가 반복적으로 작성되는 것을 방지 하였습니다.|
|useFunnel|일반적으로 웹 어플리케이션에서 회원가입과 같이 복잡한 절차를 거칠 때 한 페이지 안에서 form을 모두 작성하고 한 번 submit하지만 이는 사용자에게 매우 큰 부담으로 이를 개선하기 위햇 여러 페이지에서 절차를 진행하고 데이터를 효율적으로 관리할 수 있습니다.|

### 백엔드
|기술명|개선사항|
|---|---|
|SSE|현재 접속한 사용자들에게 실시간으로 알림을 전송하여 사용자의 편의성을 개선하였습니다.|
|AWS Lambda|이미지 리사이징 처리를 백엔드에서 진행을 하였을 때 사용자가 이미지를 업로드 한 이후로 대기를 해야 했지만 AWS Lambda를 이용해 사용자의 대기 시간을 줄여 편의성을 개선하였습니다.|
## 설계 문서

ERD

![ERD](/uploads/0a21f5a0b94347efecbca148653d47a9/ERD.png)


아키텍처 설계

![A407](/uploads/39e18ae76ebb232b19db140461d346ec/A407.png)


Figma

![figma_fix](/uploads/b7294680372fc3af2bcf1c4e5dc2d813/figma_fix.png)


## 팀원 소개


|이름|역할|
|----|----|
|곽희웅(팀장)|인프라, 백엔드 리더|
|김세리|인프라, 백엔드|
|강태연|백엔드|
|장수민|프론트 리더|
|이수민|프론트|
|황준식|프론트|
