# 이용민 - Week2 - 과제

프리온보딩 2주차에 진행한 과제물입니다.  
기간 : 2023.08.29. ~ 2023.09.01.  

## 배포 링크

[배포 링크](https://wanted-pre-onboarding-0213.du.r.appspot.com/)

## 수행자

<table border>
  <tbody>
    <tr>
      <td align="center" width="100px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/68311202?s=96&v=4" alt="이용민"/>
        <a href="https://github.com/slowteady">
          <img src="https://img.shields.io/badge/이용민-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>

## 실행 방법

1. 로컬 환경에 프로젝트 복사본 생성

```bash
git clone https://github.com/slowteady/wanted-pre-onboarding-2th-task.git
```

2. 프로젝트 폴더로 이동

```bash
cd wanted-pre-onboarding-2th-task
```

3. 프로젝트 종속성 설치

```bash
npm install
```

4. 프로젝트 실행

```bash
npm start
```

## 기술 스택

![React](https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![styledComponents](https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white)
![GoogleCloud](https://img.shields.io/badge/GoogleCloud-4285F4?style=for-the-badge&logo=GoogleCloud&logoColor=white)

## 프로젝트 구조

```bash
src/
  ├── api/
  │   ├── apiClient.js
  │   └── issuesApi.js
  ├── components/
  │   ├── issues/
  │   │   ├── AdBanner.jsx
  │   │   ├── IssuesItem.js
  │   │   └── IssuesList.jsx
  │   └── loading/
  │       └── Loading.jsx
  ├── hooks/
  │   └── useRequests.js
  ├── page/
  │   ├── error/
  │   │   └── Error.jsx
  │   └── issues/
  │       ├── Issues.jsx
  │       └── IssuesDetail.jsx
  ├── router/
  │   ├── Router.jsx
  │   └── routerPaths.js
  ├── utils/
  │   └── message/
  │       └── errorMessage.js
  ├── App.jsx
  └── index.jsx
```
