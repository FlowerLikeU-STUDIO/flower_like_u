

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



### Jenkin와 연결된 Git Project로 Docker 이미지 Build

Jenkins에 Docker build를 위해서는 Jenkins Container 안에 Docker 설치가 필요하다.

도커 설치 방법은 EC2에 docker를 설치하는 경우와 동일하다.



**✔ Jenkins bash shell에 접근**

```bash
$ sudo docker exec -it jenkins bash
```



정상 접속 확인 후 docker를 다시 설치

**✔ 사전 패키지 설치**

```
apt update
apt-get install -y ca-certificates \
    curl \
    software-properties-common \
    apt-transport-https \
    gnupg \
    lsb-release
```

❗ root 계정으로 접속되어 있으므로 Jenkins container 내부에서는 명령어에 sudo를 지워야한다.



**✔ gpg key 다운로드**

```
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
```



Jenkins에 gpg 키를 다운받는 경우 변경사항

![image-20221020200118552](C:\Users\multicampus\Desktop\Git\S07P31B209\Back\summary\CSY\CICD.assets\image-20221020200118552.png)

Jenkins container 내부에 설치된 `os`를 확인하는 명령어 `cat /etc/issue`을 통해 `os`를 확인

**Debian**을 확인

기종 링크에서 제공한 방식은 `ubuntu os`에 대한 `gpg`키를 다운로드 하는 것이기 때문에, 이를 `debin`으로 바꾸어주어야 한다.

❗ 이를 변경하지 않는 경우 패키지를 찾지 못하는 에러가 발생

기존 명령어의 `ubuntu` ➡ `debin` 변경



**✔ Docker 설치**

```
apt update
apt install docker-ce docker-ce-cli containerd.io docker-compose
```



여기까지 완료하면 `Jenkins Container`에 `Docker`설치가 완료



**✔ project에 DockerFile 작성**

Git의 각 프로젝트 폴더에 DockerFile을 생성하여 명령어를 입력해준다.

✔ Django와 React의 작성 코드는 다음을 참고

https://url.kr/rgntk6



**✔ Jenkins에서 DockerFile을 이용하여 Docker 이미지 생성**

**구성**

**Build**

* Execute shell

  ```
  docker image prune -a --force
  mkdir -p /var/jenkins_home/images_tar
  cd /var/jenkins_home/workspace/deploytest/testproject_react/
  docker build -t react .
  docker save react > /var/jenkins_home/images_tar/react.tar
  
  cd /var/jenkins_home/workspace/deploytest/testproject/
  docker build -t django .
  docker save django > /var/jenkins_home/images_tar/django.tar
  
  ls /var/jenkins_home/images_tar
  ```

  * 위 명령어에 대한 개별 설명
    - docker image prune -a --force : 사용하지 않는 이미지 삭제
    - mkdir -p /var/jenkins_home/images_tar : 도커 이미지 압축파일을 저장할 폴더 생성
    - cd /var/jenkins_home/workspace/deploytest/testproject_react : 해당 경로로 이동(react 프로젝트 폴더)
    - docker build -t react . : 도커 이미지 빌드(React 프로젝트)
    - docker save react > /var/jenkins_home/images_tar/react.tar : 도커 이미지를 react.tar로 압축하여 위에서 생성한 폴더에 저장
    - cd /var/jenkins_home/workspace/deploytest/testproject/ : 해당 경로로 이동(django 프로젝트 폴더)
    - docker build -t django . : 도커 이미지 빌드(Django 프로젝트)
    - docker save django > /var/jenkins_home/images_tar/django.tar : 도커 이미지를 django.tar로 압축하여 위에서 생성한 폴더에 저장
    - ls /var/jenkins_home/images_tar : 해당 폴더에 있는 파일 목록 출력(잘 압축되어 저장되었는지 확인)

* 저장

**지금 빌드**

**Push event** 시 Finished: SUCCESS을 통해 빌드 성공 확인



Jenkins container 안의 `/var/jenkins_home/images_tar` 폴더 안에 2개의 tar 파일이 생성되고 폴더를 공유하는 EC2dml `Jenkins/images_tar`에도 동일하게 2개의 tar 파일이 생성된 것을 확인할 수 있다.



여기까지 완료하면 `Jenkins`에서 `Docker`이미지를 build하여 tar 압축파일로 생성까지 완료



### Jenkins에서 SSH 명령어 전송을 통해 Build한 Docker 이미지를 베이스로 Container 생성(기본 배포 완료)

**✔ Jenkins SSH 연결 설정 (Publish over SSH)**

Jenkins에서 AWS로 SSH 명령어를 정송하기 위해서 AWS 인증기(EC2 생성 시 사용한 pem 파일) 등록이 필요

**Jenkins 관리**

* 시스템 설정

**Publish over SSH - SSH Server 추가버튼**

* Name

* Hostname

  * 서버 공인 IP

* Username

  * EC2 유저네임 입력
  * ubuntu의 경우 ubuntu 입력

* 고급

  * Use password authentication, or use a different key 체크박스 체크

  * Key

    ```
    pem파일을 열러 텍스트 내용을 복사 붙여넣기
    ```

* Test Configuration 버튼
  * Success가 나오면 성공

**SSH 연결 오류 해결 방법**

참고

https://url.kr/rgntk6



**✔ Jenkins build 후 조치로 SSH 명령어 전송(EC2에 Docker Container 생성)**

**구성**

* 빌드 후 조치

  * 빌드 후 조치 추가 - Send build artifacts over SSH

  * Send build artifacts over SSH

    * Source files

      * Container에서 AWS로 파일을 전송하는 부분
      * 필수 사항이나 큰 의미가 있지 않는 것으로 생각됨

    * Exec command

      ```
      sudo docker load < /jenkins/images_tar/react.tar
      sudo docker load < /jenkins/images_tar/django.tar
      
      if (sudo docker ps | grep "react"); then sudo docker stop react; fi
      if (sudo docker ps | grep "django"); then sudo docker stop django; fi
      
      sudo docker run -it -d --rm -p 80:80 -p 443:443 --name react react
      echo "Run testproject_react"
      sudo docker run -it -d --rm -p 8080:8080  --name django django
      echo "Run testproject"
      ```

      * 이 코드는 이전 react.tar와 django.tar을 만든 경우의 예시로 Spring사용시 변경 필요
      * 명령어 간단 설명 (django와 중복되는 명령어는 한 개만 설명)
        - sudo docker load < /jenkins/images_tar/react.tar : react.tar을 압축 해제하여 docker 이미지로 등록
        - if (sudo docker ps | grep "react then sudo docker stop react; fi : react 컨테이너가 만약 동작중이면 stop 시키기
        - sudo docker run -it -d --rm -p 80:80 -p 443:443 --name react react : 컨테이너 생성하기 80, 443 포트로 연결, 컨테이너 이름은 react로

**저장**

**지금 빌드**

* Console에서 결과 혹인이 가능
* 서버 IP 접속 시 서비스를 확인 가능



### Nginx을 통해 React와 Django 경로 설정

이 작업의 필요성

미작업한 경우

* HTTPS 설정을 할 때 높은 확률로 번거로운 작업이 추가된다.
* FE는 HTTPS에 성공하였으나 BE가 HTTPS적용에 실패한 경우 HTTPS => HTTP의 크로스 도메인 오류로 인해 백엔드 API를 불러올 수 없는 오류 발생한다.

따라서 하나의 도메인, 한개의 Port에서 두 서비스를 구분 짓는 것이 필요하다.



**✔ Nginx 설정**

기존 FE와 포트가 분리되어 다른 포트로 접속이 가능한 BE 서비스를 동일한 포트를 통해 접속할 수 있도록 변경시켜주는 작업



**✔ nginx.conf 파일 생성**

EC2 Ubuntu 콘솔에서 콘솔에서 `cd /jenkins/workspace/deploytest/FE프로젝트` 명령으로 디렉토리를 이동

`sudo mkdir deploy_conf` 명령어로 디렉토리를 생성

`cd deploy_conf`를 이용해 이동

`sudo vim nginx.conf` 명령어로 nginx.conf 파일을 생성하고 편집기로 이동 



**nginx.conf 파일**

```
upstream backend{
	ip_hash;
	server 172.31.62.140:8080;
}

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

	location /api {
        proxy_pass http://backend/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

✨ 위에서부터 3번째 줄, 172.31.62.140 ip 주소는 EC2 인스턴스의 Private ip 주소



**코드 설명**

upstream 을 통해서 backend를 로컬 ip:8080 주소와 연결시키고, 해당 주소를 location /api 에 연결

기존 프론트 프로젝트는 location / 에 연결

결과적으로 공인 ip주소/api로 요청을 하게 되면 Nginx에서 백엔드서버로 연결

nginx와 백엔드 서버사이의 통신은 로컬에서 이루어지기 때문에 공인 IP를 등록할 필요가 없다.

따라서 가장 처음에에 EC2에 접근 허용했던 8080포트를 막아버리면, 외부에서 백엔드 서버로는 직접 접속이 불가능하고, nginx(80포트)를 통해서만 접속 가능하게 된다.

`nginx.conf` 파일 작성을 마쳤다면 `esc, :wq` 를 통해 파일을 저장



**✔ Docker 파일 수정**

```
FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/deploytest/testproject_react
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
```

앞서 DockerFile 만들 때, #으로 주석처리 했던 nginx 설정 파일을 nginx 이미지로 옮기는 명령어의 주석을 해제



**✔ 최종 build test**

Docker file 수정사항을 반영시키기 위해 Git에 Push 필요

수정사항을 `master Branch`에 **Push**

`jenkins`에서 `push trigger`를 받아 `build`를 수행



결과적으로 `http://공인ip/` 접속 시 FE 서버가 `http://공인ip/api` 접속시 BE 서버가 실행되는 것 확인 가능



## Finally

여기까지 완료하면 `Jenkins을 이용한 CICD 자동배포 완료

1. Git의 지정한 Push Event가 발생 시
2. Jenkins에서 WebHook을 통해 자동으로 build 실행
3. Jenkins에서 FE, BE의 각 project 내부의 Dockerfile을 이용하여 Dockerimage 생성(tar 압축파일)
4. Jenkins에서 SSH 연결을 통해 AWS에 DockerConatiner 생성
5. 외부에서 접속: Docker container에 올라간 Nginx에서 FE와 BE을 각각 '/', '/api'로 구분하여 연결
