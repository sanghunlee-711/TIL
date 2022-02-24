# Next JS

## Static Image

- Static 이미지는 Public밑에 들어가면 됨
- 만약 이미지 경로가 public/asset/img/test.png

```javascript
import Image from 'next/image';
  <Image src="/assets/img/test.png" >
```

위코드처럼 사용 시 빌드 후 생성된 static파일을 불러올 수 있다고 함

## favIcon

- icon은 public 폴더 아래에 favicon.ico로 작성하면 알아서 만들어줌
- link태그를 쓸 필요없음 ㅎ

## SEO

- 기술적: 웹사이트 크롤링 잘 되고 성능 최적화를 위함
- 생산적: 특정 키워드를 위한 컨텐츠 생산 전략을 만들 수 있음
- 유명세: 웹사이트 존재감을 검색엔진에서 올릴 수 있고 엔진은 믿을만한 소스라는걸 인지할 수 있도록 해줘야함
  - 내 사이트로 돌아오게 만들어주는 [backllinks](https://moz.com/learn/seo/backlinks)라는 third-party-site를 통해 진행된다고 함
  - 쉽게 말하면 다른사이트에서 내 사이트로 가는 링크를 많이 걸어주는 것이 보이면 검색엔진에서 좋은 결과를 낼 수 있는 것

### 검색 시스템

- Crawling: 웹 페이지 훑어보고 모든 웹사이트의 컨텐츠를 파싱함, 350 million domains가 있으므로 겁나 큰 작업임
- Indexing: 크롤링단계에서 모은 데이터를 접근할 수 있도록 저장할 위치를 찾음.
- Rendering: 페이지의 어떤소스를 한번 실행해봄(모두다 하는 것은 아님) 컨텐츠가 실제로 인덱싱 되기전에 실행할 수 도 있고 인덱싱 후에 일어날 수 도 있음(컨텐츠 없어서 안돌아가면)
- Rnaking: 데이터를 유저가 입력한 값 기반으로 관련된 페이지를 쿼리함. 검색엔진마다 다름

### 어떻게 해볼까

구글 크롤러 기준임

#### robots.txt

- [링크](https://developers.google.com/search/docs/advanced/robots/create-robots-txt)
- public 밑에 robots.txt를 만들어서 어떤 페이지나 파일에 크롤러가 접근하고 크롤링할 수 있는지를 나타내어줄 수 있다.

#### sitemap

- 크롤링 실행 시 어떤 url이 해당사이트에 포함되어있는지 알려주기 위함

#### Meta robot tag

- 로봇 태그 넣음으로서 인덱싱 쉬워지게 할 수 있음
- 얘나 robots.txt 나 directives하고 항상 지시하고 obey(순종) 될 수 있다 ? (뭔소리임 도대체)
- Canonical tag는 구글이 obey하거나 말거나에 대한 결정을 추천해줄 수 있는 수단임

```html
<meta name="robots" content="noindex,nofollow" />
<!-- 아래랑 같은 거임 -->
<meta name="robots" content="all" />
```

- 검색결과에서 보여주고 싶지 않은 페이지는 noindex메타 태그를 넣으면 됨(안넣으면 알아서 크롤링함)
- 페이지에 있는 링크를 크롤링하고 싶지 않을때 nofollow 메타 태그 넣으면 됨

```html
<meta name="googlebot" content="noindex,nofollow" />
```

- 구글 크롤러에만 특별하게 세팅을 하고 싶은경우 다른 세팅으로 robots와 중복해서 사용하면 되지만
  - 잘못쓰면 충돌 날 수 도 있다고 함.

#### Canonical Tags?

- 사이트 내 url주소가 다르지만 동일한 내요으이 중복 페이지라고 판단될 때 페이지에 코드를 삽입해 대표가 되는 url주소를 알려주는 태그임

```html
<link rel="canonical" href="https://test.app.app/test" />
```

예를들어 next js에서 test라는 path를 가진 페이지가 query,params를 통해서 다른 컨텐츠만 보여준다고 했을때
해당 쿼리파람들을 배제한 url로 크롤러에게 항상 이페이지에 관한 인덱싱이라고 여겨지게 만들어주는것임
