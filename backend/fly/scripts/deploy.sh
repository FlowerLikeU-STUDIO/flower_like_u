echo $PASSWORD | docker login -u $USERNAME --password-stdin
RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://i7b306.p.ssafy.io/fly)
echo "> 응답 코드 $RESPONSE_CODE"