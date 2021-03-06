# package.json 정리

| Dependencies                                             | Dev Dependencies                                                           | Peer Dependencies                                                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 프로젝트가 작동하는 데 필요한 라이브러리.                | 개발 중에만 필요로 하는 패키지.                                            | 패키지가 npm 패키지의 특정 버전과 호환되도록 지정                                                                             |
| 설치하면 node_modules 디렉토리에 패키지가 자동으로 추가. | 패키지를 설치하면 npm이 자동으로 개발 종속성을 설치합니다.                 | peerDependencies는 자동으로 설치되지 않음. 피어 종속성을 추가하려면 package.json 파일을 수동으로 수정                         |
| 코드를 실행할 때 필요한 라이브러리.                      | 개발 프로세스 중 어느 시점에서 필요할 수 있지만 실행 중에는 필요하지 않음. | 피어 종속성은 자신의 패키지를 게시할 때, 즉 다른 프로그램에서 사용할 코드를 개발할 때만 발생.(영향을 끼친다고 해석하면 될 듯) |
| 최종 코드 번들에 포함됩니다.                             | 최종 코드 번들에 포함됩니다.                                               | 자체 패키지를 게시하는 경우에만 포함될 수 있습니다.                                                                           |
| npm install <package_name>                               | npm install <package_name> --save-dev                                      | package.json 파일을 수동으로 변경합니다                                                                                       |

## 요약

- peerDependencies 는 npm에 패키지를 배포하거나 해당 프로젝트가 다른프로젝트와 호환되거나 그 위에 돌아가게 되는 경우에 꼭 신경써줘야 하는 문제임(styled-component로 문제의 맛을 봄)
- devDependencies의 코드가 최종코드 번들에 포함된다는건 참조되는 일정 부분만 번들되는 것으로 이해하면 될 것 같음

##참고

- [geeksforgeeks](https://www.geeksforgeeks.org/difference-between-dependencies-devdependencies-and-peerdependencies/)
