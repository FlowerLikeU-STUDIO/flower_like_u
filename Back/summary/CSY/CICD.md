

# CICD



## Docker

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
