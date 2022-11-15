import Head from "next/head";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { regionKey, regionMap } from "@/lib/utils/addressList";
import { client } from "@/pages/api/client";
import { useRouter } from "next/router";

const FloristMap = () => {
  const cx = classNames.bind(styles);
  const router = useRouter();
  // *dropdown
  const [sidoActive, setSidoActive] = useState(false);
  const [sigunguActive, setSigunguActive] = useState(false);
  // *전체 선택시
  const [selectSido, setSelectSido] = useState("대전광역시");
  // *선택된 배열
  const [selectSigungu, setSelectSigungu] = useState("유성구");
  const [selectedArr, setSelectedArr] = useState(regionMap["대전광역시"]);
  // *별점
  const holidayList = ["일", "월", "화", "수", "목", "금", "토"];

  const sidoSelect = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSido(value);
    setSelectSigungu("전체");
    setSelectedArr(regionMap[value]);
  };

  const sigunguSelect = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSigungu(value);
  };

  function makeOverListener(map, overlay) {
    return function () {
      overlay.setMap(map);
    };
  }

  function makeOutListener(overlay) {
    return function () {
      overlay.setMap(null);
    };
  }

  const dataSubmit = () => {
    // ! datsubmit
    const data = {
      sd: selectSido,
      sgg: selectSigungu,
    };
    client.get(`user/stores/region/`, { params: data }).then((res) => {
      console.log(res.data);
      let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(res.data.regionList.avgLatitude, res.data.regionList.avgLongitude), //지도의 중심좌표.
        level: 5, //지도의 레벨(확대, 축소 정도)
      };

      let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      // 마커 이미지의 이미지 주소
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // DataList
      const positions = res.data.regionList.responseList;
      positions.forEach((r) => {
        // 마커 이미지의 이미지 크기
        let imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성
        let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(r.latitude, r.longitude), // positions[i].latlng, // 마커를 표시할 위치
          image: markerImage, // 마커 이미지
        });

        // overlay 생성
        let overlay = new kakao.maps.CustomOverlay({
          map: null,
          position: marker.getPosition(),
        });

        let content = document.createElement("div");
        content.classList.add(`${styles.florist__wrapper}`);

        let img = document.createElement("img");
        img.src = r.profile || "/auth/flowerNone.png";
        img.alt = "너닮꽃 꽃집 이미지";
        img.classList.add(`${styles.store__img}`);
        content.appendChild(img);

        let info = document.createElement("div");
        info.classList.add(`${styles.store__info}`);
        content.appendChild(info);

        let storeName = document.createElement("span");
        storeName.classList.add(`${styles.store__name}`);
        storeName.appendChild(document.createTextNode(r.store));
        info.appendChild(storeName);

        let storeInfo = document.createElement("div");
        storeInfo.classList.add(`${styles.store_information}`);
        storeInfo.appendChild(document.createTextNode(r.bio));
        // !! storeId 추가할것
        storeInfo.addEventListener("click", () => {
          router.push(`/florist/${storeId}/feed`);
        });
        info.appendChild(storeInfo);

        let storeAddress = document.createElement("span");
        storeAddress.classList.add(`${styles.store__adderss}`);
        storeAddress.appendChild(document.createTextNode(r.address));
        info.appendChild(storeAddress);

        let holidayInfo = document.createElement("div");
        holidayInfo.classList.add(`${styles.store__holiday}`);
        info.appendChild(holidayInfo);
        let storeHoliday = document.createElement("span");
        const isHoliday = r.holidays.map((holiday, idx) => {
          if (holiday === true) {
            return holidayList[idx] + "요일";
          } else {
            return;
          }
        });
        const holidayRes = isHoliday.filter((res) => res);
        storeHoliday.appendChild(document.createTextNode(`휴일: ${holidayRes || ""}`));
        holidayInfo.appendChild(storeHoliday);

        let storeRating = document.createElement("span");
        storeRating.classList.add(`${styles.starrating}`);
        storeRating.appendChild(document.createTextNode("평점 " + (r.rating || 0) + "점"));
        info.appendChild(storeRating);

        let closeBtn = document.createElement("button");
        closeBtn.classList.add(`${styles.close__btn}`);
        closeBtn.appendChild(document.createTextNode("X"));
        closeBtn.onclick = function () {
          overlay.setMap(null);
        };
        content.appendChild(closeBtn);

        overlay.setContent(content);

        kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, overlay));
        kakao.maps.event.addListener(marker, "mouseout", makeOutListener(overlay));
      });
    });
  };

  // * dropdownHandler
  const dropdownOpen = () => {
    setSidoActive(!sidoActive);
  };

  const sigunguDropdownOpen = () => {
    setSigunguActive(!sigunguActive);
  };

  useEffect(() => {
    dataSubmit();
  }, []);

  return (
    <div className={styles.florist_background}>
      <div className={styles.layout}>
        <Head>
          <title>너닮꽃 내 주변 꽃가게</title>
          <meta
            name="description"
            content="너닮꽃에서 내 주변 꽃가게를 검색해보세요! 등록된 가게에 커스텀한 꽃다발을 요청할 수 있어요."
          />
        </Head>
        {/* search bar */}
        <div className={styles.search__wrapper}>
          {/* 시도 드롭다운 */}
          <div className={styles.wrapper}>
            <div className={styles.search_box}>
              <div className={styles.dropdown} onClick={dropdownOpen}>
                <div className={styles.default_option}>{selectSido}</div>
                <ul className={sidoActive ? styles.active : ""}>
                  {regionKey.map((sido, idx) => (
                    <button value={sido} key={idx} onClick={sidoSelect}>
                      {sido}
                    </button>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* 시군구 드롭다운 */}
          <div className={styles.wrapper}>
            <div className={styles.search_box}>
              <div className={styles.dropdown} onClick={sigunguDropdownOpen}>
                <div className={styles.default_option}>{selectSigungu}</div>
                <ul className={sigunguActive ? styles.sigungu__active : ""}>
                  {selectedArr.map((sigungu, idx) => (
                    <button value={sigungu} key={idx} onClick={sigunguSelect}>
                      {sigungu}
                    </button>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <span className={cx("material-icons", "material_icons")} onClick={dataSubmit}>
            search
          </span>
        </div>
        {/* 지도 표시 */}
        <div id="map" className={styles.map}></div>
      </div>
    </div>
  );
};

export default FloristMap;
