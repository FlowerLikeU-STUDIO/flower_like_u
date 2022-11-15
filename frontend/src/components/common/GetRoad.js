import React, { useState } from "react";
import styles from "./GetRoad.module.scss";
//https://postcode.map.daum.net/guide

const GetRoadAdr = ({ adr, setAdr }) => {
  const [roadDetail, setRoadDetail] = useState("");

  function sample4_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수
        // var isLatitude = ""; //위도
        // var isLogitude = ""; //경도

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        document.getElementById("sample4_postcode").value = data.zonecode;
        document.getElementById("sample4_roadAddress").value = roadAddr;
        // *상세주소 추가로직
        // document.getElementById("sample4_detailAddress").value = extraRoadAddr;

        // *카카오 지도 관련
        var geocoder = new kakao.maps.services.Geocoder();
        const addressSearch = (address) => {
          return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                resolve(result);
              } else {
                reject(status);
              }
            });
          });
        };

        (async () => {
          try {
            const result = await addressSearch(roadAddr);
            setAdr({
              zipCode: data.zonecode,
              street: roadAddr,
              details: roadDetail,
              sigunguCode: data.sigunguCode,
              latitude: result[0].y,
              longitude: result[0].x,
            });
            return;
          } catch (e) {
            setAdr({
              zipCode: data.zonecode,
              street: roadAddr,
              details: roadDetail,
              sigunguCode: data.sigunguCode,
              latitude: "",
              longitude: "",
            });
            return;
          }
        })();
      },
    }).open();
  }

  const getDetail = (e) => {
    const value = e.target.value;
    if (value.length >= 50) {
      setRoadDetail(value.slice(0, 49));
      alert("50자 내로 입력해주세요.");
      return;
    }
    setRoadDetail(value);
    setAdr({ ...adr, details: value });
  };

  return (
    <div className={styles.road__flex}>
      <div className={styles.post__flex}>
        <input type="text" id="sample4_postcode" placeholder="우편번호" disabled />
        <input type="button" onClick={sample4_execDaumPostcode} className={styles.post__btn} value="우편번호 찾기" />
      </div>
      <textarea id="sample4_roadAddress" className={styles.address__detail} placeholder="도로명주소" disabled />
      <textarea
        id="sample4_detailAddress"
        className={styles.address__detail}
        placeholder="상세주소를 입력해주세요."
        onChange={getDetail}
        value={roadDetail}
        autoComplete="off"
      />
    </div>
  );
};

export default GetRoadAdr;
