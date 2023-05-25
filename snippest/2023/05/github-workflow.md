## Github Workflow

TIL
• 어떤걸 느꼈다.
CI/CD는 재밌는데 자주하고 싶진않다(테스트가 너무 어려움)
• 어떤걸 배웠다.
github workflow로 npm 라이브러리 배포하기
yarn이 자동지원됨,
registry 주소는 해당 라이브러리 주소가 아니라 기본 주소로 잡으면 알아서 package.json값 가져다 씀
node 버전12는 deprecated됨 (인터넷 샘플 믿을게 안됨)
uses 키워드는 이미 공개되어서 사용되는 웹훅같은것을 활용할 수 있는 것임.
한 일 (optional)
• github workflow로 npm 라이브러리 배포하기
질문 (optional)
• 자동으로 main 브랜치에 가면 버전을 올릴순 없을까 고민중..

```yml
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://help.github.com/actions/language-and-framework-guides/publishing-nodejs-packages

name: Node.js Package

on: # 메인브랜치에 push가 일어날 때 해당 yml이 작동하도록 지정.
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest # 실행환경
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: yarn install --immutable --immutable-cache --check-cache
      - run: yarn build
      # - run: npm test

  publish-npm:
    needs: build #빌드가 먼저 되고 실행 됨.
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3 # uses는 기본적으로 제공되는 웹훅과 같은 라이브러리를 사용할 수 있게 도와주는 키워드
      - uses: actions/setup-node@v3
        with:
          node-version: 16 # 노드 버전 12는 deprecated
          registry-url: https://registry.npmjs.org/ #npm 배포시에는 해당 도메인에 서브 도메인으로 package.json 이름이 딸려들어가서 배포 됨.
      - run: npm publish # yarn publish로 바꿔도 될지 알아봐야 함.
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}} # 해당 레포 Setting에 npm에서 발급한 automation용 토큰을 넣으면 됨.


  #아래는 깃헙 노드 모듈에 배포하기 위해서 사용하는 것이므로 제외 가능
  # publish-gpr:
  #   needs: build
  #   runs-on: ubuntu-latest
  #   steps:
  #     - uses: actions/checkout@v2
  #     - uses: actions/setup-node@v1
  #       with:
  #         node-version: 12
  #         registry-url: $registry-url(npm)
  #     - run: npm ci
  #     - run: npm publish
  #       env:
  #         NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

## PR Template

`pull_request_template.md`라는 이름으로 .github 폴더 밑에 넣어 놓으면 자동으로 PR template 생성이 가능
