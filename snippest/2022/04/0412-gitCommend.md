너무 매일 찾아봐서 이참에 정리해놓는게 맞는 것 같음

# 커밋한거 되돌리기

- 내가 커밋한 해쉬 바로 이전의 커밋을 복사
- `git reset --soft [HASH]` 커밋 취소 및 해당 파일 "staged" 상태로 워킹 디렉토리에 "보존"
- `git reset --mixed [HASH]` 커밋 취소 및 해당 파일 "unstaged" 상태로 워킹 디렉토리에 "보존"
- `git reset --hard [HASH]` 커밋 취소 및 해당 파일 "unstaged" 상태로 워킹 디렉토리서 "삭제"

# 현재 브랜치에 변경된 사항을 커밋하지 않은상태에서 다른브랜치로 옮기고 싶은 경우

```md
git stash // 커밋하지 않은 변경사항 임시 저장
git checkout anotherbranch // 다른 브랜치로 이동
git stash pop //임시로 저장한 변경사항을 해당브랜치에서 복원
```

# 커밋 메시지 수정 하려면

```md
git commit --amend
```

# Staging 되지 않은 파일 삭제

- git clean -df
  Cleans the working tree by recursively removing files that are not under version control, starting from the current directory.

- -d: Remove untracked directories in addition to untracked files
  디렉토리 및 파일까지 다 지워줌.
  - -x
    Don’t use the standard ignore rules read from .gitignore (per directory) and $GIT_DIR/info/exclude, but do still use the ignore rules given with -e options. This allows removing all untracked files, including build products. This can be used (possibly in conjunction with git reset) to create a pristine working directory to test a clean build.
    이렇게 하면 빌드 제품을 포함하여 추적되지 않은 모든 파일을 제거할 수 있습니다.
    필요한 것도 날아갈 수 있으니 사용하지 말자.
- -f: Force (might be not necessary depending on clean.requireForce setting)
  강제

```
git clean -fdx
```
