# Deploy_Setting

인증키(.pem)파일 보안설정

**권한 설정**

🐬 PEM파일 > 속성 > 보안 > 고급 > 상속 사용

![image-20221025090650467](C:\Users\multicampus\Desktop\Git\S07P31B209\backend\summary\CSY\Deploy_Setting.assets\image-20221025090650467.png)

✅ 이 개체에서 상속된 사용권한을 모두 제거합니다.

![image-20221025090749196](C:\Users\multicampus\Desktop\Git\S07P31B209\backend\summary\CSY\Deploy_Setting.assets\image-20221025090749196.png)

✅ 보안 주체 선택

![image-20221025090817667](C:\Users\multicampus\Desktop\Git\S07P31B209\backend\summary\CSY\Deploy_Setting.assets\image-20221025090817667.png)

✅ 입력 후 `이름 확인(C)` -> 입력 내용이 변경된다 -> 확인

✅ 확인



접속 방법: 제공된 인증키(.pem)를 사용하여 ubuntu 계정으로 SSH 접속

**Windows**에서의 방법

**Windows PowerShell**

```shell
$ ssh -i 인증키.pem EC2서버
```

✔ 위치는 pem파일의 위치



**첫 접속**

```shell
The authenticity of host 'EC2 서버 주소 (3.38.96.168)' can't be established.

...

Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

**yes**

Welcome to Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)

**🎈 접속 성공**



K7B209T.pem파일의 상속제거 후 보안을 위해



**❗ 주의 사항**

별도의 웹 콘솔이 제공되지 않고 원격 터미널만 접속이 가능하기 때문에 방화벽 설정에 주의가 필요

* 방화벽 기본 설정: 비활성
* 방화벽을 사용하려면 활성화 전 SSH포트를 오픈 설정 必
* SSH 접속 시 기본포트: 22



```shell
# SSH 포트 22번 오픈(허용): TCP/UDP 22번 포트를 모두 허용
sudo ufw allow ssh
# 우분투 방화벽(UFW) 활성화
sudo ufw enable
```

`sudo ufw allow ssh`  와  `sudo ufw allow 22/tcp`는 동일



**우분투 방화벽(UFW) 설정**

UFW는 기본 비활성화 상태

![image-20221024223533540](C:\Users\multicampus\Desktop\Git\S07P31B209\backend\summary\CSY\Deploy_Setting.assets\image-20221024223533540.png)



**❗ 주의 사항**

* /home 및 시스템 디렉토리의 퍼미션 임의 변경 금지
* 퍼블릭 클라우드의 서버는 외부에서 쉽게 접근 가능하므로 중요한 파일 저장 및 계정, DB 등의 패스워드 설정에 주의
* SSH 포트 차단, 공개키 삭제, 퍼미션 임의 변경 등으로 접속 불가 시 또는 해킹, 악성코드 감염 시 복구 불가(초기화 요청만 가능)



✔ 제공받은 두개의 서버 모두 SSH포트를 오픈 설정 후 방화벽 활성화 完