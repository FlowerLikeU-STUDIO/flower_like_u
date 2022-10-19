

# CICD



## Docker

컨테이너 기반의 오픈소스 가상화 플랫폼

프로그램을 외부 환경과 격리하여 구동할 수 있게 해주는 소프트웨어

기본적으로 리눅스 환경 기반

#### 컨테이너(Container)

OS상에 논리적인 영역(컨테이너)을 구축

Application과 필요한 파일이나 라이브러리 등 종속 항목을 포함하여 별도의 서버처럼 동작

배포를 위해 생성되는 이미지의 용량이 작아진다.

필요한 요소만으로 구성되어있어 오버헤드가 적어진다.

![image-20221018235408814](C:\Users\multicampus\Desktop\Git\S07P31B209\Back\summary\CSY\CICD.assets\image-20221018235408814.png)



### Ubuntu에 Docker 설치

`sudo` 권한 혹은 `root`권한을 소유한 계정에서 설치를 진행한다.



커널 버전 확인

```bash
$ uname -r
```



#### 설치

✔ 업데이트 및 HTTP 패키지 설치

```bash
$ sudo apt update
$ sudo apt-get install -y ca-certificates \ 
    curl \
    software-properties-common \
    apt-transport-https \
    gnupg \
    lsb-release
```



✔ GPG 키 및 저장소 추가

```bash
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```



✔ 도커 엔진 설치

❗ docker

* CE(Community Edition): (무료)
* EE(Enterprise Edition): 기업용(유료)

CE버전: 핵심적인 컨테이너 기술은 동일하다.

➡ 패키지가 제공하는 latest 버전의 도커 엔진과 컨테이너 데몬 서비스를 설치한다.

```bash
$ sudo apt update
$ sudo apt install docker-ce docker-ce-cli containerd.io
```



다음과 같은 경우의 설치 방법은 생략

✔ 특정 버전의 설치

✔ 파일을 통해 설치

✔ 웹에서 설치 스크립트를 통해 설치



#### 설치 확인

✔ 도커의 버전 확인

```bash
$ sudo docker version
```



✔ 컨테이너 실행

`container-name` 컨테이너를 실행하여 도커 엔진 설치를 확인

* --rm 명령어를 통해 컨테이너 실행 후 삭제

```bash
$ sudo docker run --rm container-name
```



#### 도커 엔진 제거

✔ 도커 엔진 및 관련 패키지 제거

```bash
$ sudo apt-get purge docker-ce docker-ce-cli containerd.io
```



✔ 잔여 호스트 이미지, 볼륨, 컨테이너 제거

```bash
$ sudo rm -rf /var/lib/docker
$ sudo rm -rf /var/lib/containerd
```



참고: https://docs.docker.com/engine/install/ubuntu/



## Jenkins

### Jenkins 설치(Docker Container) 및 계정 생성

#### docker-compose로 Jenkins Container 생성

```bash
$ vim docker-compose.yml
```

vim을 통해 `docker-compose.yml`파일을 생성



**docker-compose.yml**

```yml
version: '3'

services:
    jenkins:
        image: jenkins/jenkins:lts
        container_name: jenkins
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
            - /jenkins:/var/jenkins_home
        ports:
            - "9090:8080"
        privileged: true
        user: root
```

* servies: Container service
* jenkins: Name of Service
* image: 컨테이너 생성시 사용하는 Image
  * jenkins/jenkins:lts 를 사용
  * jenkins의 lts 버전을 의미
* container_name: Name of Container
* volumes:
  * 이하 둘을 연결
    * AWS의 /var/run/docker.sock
    * 컨테이너 내부의 :/var/run/docker.sock
  * 이하 둘을 연결
    * /jenkins 폴더
    * /var/jenkins_home 폴더
* ports: 포트 매핑, AWS의 9090포트와 Container의 8080 포트를 연결
* privileged: 컨테이너 시스템의 주요 자원에 연결 가능한 여부
  * 기본값은 False
* user: Jenkins에 접속할 유저의 계정
  * root: 관리자



**✔ Container 생성**

```bash
$ sudo docker-compose up -d
```



**✔ Contain 확인**

```bash
$ sudo docker ps
```



**🎈 젠킨스 계정 생성 및 플러그인 설치**

참고



### Jenkins Project 생성 WebHook 설정, 자동 빌드 테스트

참고: https://zunoxi.tistory.com/106



**✔ Git Repository 생성**

* 구성

**✔ Jenkins Project 생성**

1. 새로운 Item
2. Project 이름 => Freestyle project :ok:
3. **소스 코드 관리** - Git - Repository URL 입력
   1. Credentials - add => jenkins
   2. Kind: Username with password
      * Username
      * Password
      * ID: Credential을 구분한 텍스트로 임의로 지정
      * **Add** 버튼
   3. 만들어진 Credential 선택
      * 이 때 오류메시지 사라진다.
4. **빌드 유발**
   1. Build when a change is pushed to GitLab webhook URL
      1. Enable GitLab triggers
         * 옵션 중 trigger의 기준이 되는 항목을 체크
      2. 고급
         1. Secret token => Generate
         2. token 생성된다.
         3. 이 toekn은 Git과 WebHook을 연결 시 사용되므로 저장해둔다.
5. **Build**
   1. Add build step => Execute Shell
      * 필요한 명령어를 입력
6. 저장



**✔ 프로젝트 화면**

* `지금 빌드` 버튼 클릭 => 수동 빌드 진행
  * 초록 체크표시: 완료
* Build History
  * Console Output
    * 빌드에 성공한 console 창을 확인할 수 있다.
    * Execute Shell에 작성한 명령어의 작동여부도 확인 가능하다.



**✔ Git WebHook 연결**

배포할 프로젝트의 Git에서 `Setting` => `Webhooks`페이지로 이동

* URL
* Secret token
* Trigger
  * Push events: master

`Add webhook`: webhook 생성



✔ 생성 후 빌드 테스를 위해 생성된 WebHook에서 test를 누르고 Push event를 선택

**Hook executed successfully: HTTP 200** : 결과 확인



✔ Jenkins와 Git 연결완료

**=> 연결된 Git의 master branch 이벤트 발생시 Jenkins에서 build 수행**
