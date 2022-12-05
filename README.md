<div align="center">

# 프로그래머스 쇼핑몰 SPA 🛍

![image](https://user-images.githubusercontent.com/87167786/205582178-7d3dd8fe-4c8f-4e92-8f3f-a05896516157.png)
프로그래머스 2021 Dev-Matching: 웹 프론트엔드 개발자(하반기) 기출 문제

</div>

해당 레퍼지토리는 [2021 Dev-Matching: 웹 프론트엔드 개발자(하반기)' 기출 문제](https://school.programmers.co.kr/skill_check_assignments/199)를 복기한 결과물입니다. 
라이브러리와 프레임워크 없이 순수 자바스크립트로 단일 페이지 어플리케이션(Single Page Application)을 구현했습니다. 구현 사항은 [해당 링크](https://www.notion.so/eunddodi/SPA-a7a05c2770d142cc971ca95680883a98)에 정리되어 있습니다.

## 컴포넌트

컴포넌트 클래스를 구현했습니다. 리액트 컴포넌트의 라이프사이클과, 개발자 황준일님의 [Vanilla Javascript로 웹 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%E1%84%8B%E1%85%B4-%E1%84%90%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A2%E1%86%BC) 포스팅을 참고했습니다.

[👉 코드 바로가기](https://github.com/eunddodi/VanillaSPA/blob/main/src/core/Component.js)

> 관련 블로그 포스팅 및 PR
  * [“DOM을 직접 조작한다” 의 의미와 컴포넌트의 본질](https://meoweundi.tistory.com/32)
  * [Vanilla Javascript로 컴포넌트 만들기](https://meoweundi.tistory.com/40)
  * PR [[feat]setup, 컴포넌트 정의, 라우팅, ProductListPage](https://github.com/dengoyoon/cute-shopping-mall/pull/6)

## 라우팅

[React Router](https://reactrouter.com/en/main)의 사용법을 모티프로 라우터를 구현했습니다. History API를 사용했습니다.

```javascript

// 라우트 등록하기
router.addRoute(path, component)

// 경로 이동하기: key-value 형태의 파라미터를 전달할 수 있습니다.
router.push(path, params)

// useParams: 최근 url에서 전달한 파라미터를 리턴합니다.
const { myKey } = useParams();
```

[👉 코드 바로가기](https://github.com/eunddodi/VanillaSPA/blob/main/src/core/router.js)

> 관련 블로그 포스팅
* [Vanilla Javascript로 SPA 구현하기(프로그래머스 쇼핑몰 SPA)](https://velog.io/@eunddodi/Vanilla-Javascript%EB%A1%9C-SPA-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%87%BC%ED%95%91%EB%AA%B0-SPA)
