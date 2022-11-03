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
        // !저장 로직
        setAdr({ zipCode: data.zonecode, street: roadAddr, detail: roadDetail, sigunguCode: data.sigunguCode });
      },
    }).open();
  }

  const getDetail = (e) => {
    const value = e.target.value;
    if (value.length > 50) {
      setRoadDetail(roadDetail.slice(0, 50));
      alert("50자 내로 입력해주세요.");
      return;
    }
    setRoadDetail(value);
    setAdr({ ...adr, detail: value });
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
      />
    </div>
  );
};

export default GetRoadAdr;
