import styles from "./florist-list.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { regionKey, regionMap } from "@/lib/utils/addressList";
import FlowerImg from "@/components/common/FlowerImg";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";

const FloristList = () => {
  const cx = classNames.bind(styles);
  const router = useRouter();
  // *최신순 필터
  const [currentSort, setCurrentSort] = useState(1);
  // *dropdown
  const [sidoActive, setSidoActive] = useState(false);
  const [sigunguActive, setSigunguActive] = useState(false);
  // *전체 선택시
  const [selectSido, setSelectSido] = useState("전체");
  // *선택된 배열
  const [selectSigungu, setSelectSigungu] = useState("전체");
  const [selectedArr, setSelectedArr] = useState(regionMap["전체"]);

  const sidoSelect = (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSido(value);
    setSelectSigungu("전체");
    setSelectedArr(regionMap[value]);
  };

  const sigunguSelect = (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSigungu(value);
  };

  const dropdownOpen = () => {
    setSidoActive(!sidoActive);
  };

  const sigunguDropdownOpen = () => {
    setSigunguActive(!sigunguActive);
  };

  // /api/store/list?page=1&param1={시/도}
  // /api/store/list?page=1&param1={시/도}&param2={시/군/구}
  // /api/store/list?page=1&param1={시/도}&param2={시/군/구}&param3={검색 키워드}

  const currentFloristList = [
    {
      storeId: 1,
      storeName: "너닮꽃집11",
      profile: "",
      rating: 4.33,
      address: "대전광역시 유성구",
    },
    {
      storeId: 2,
      storeName: "너닮꽃집22",
      profile: "",
      rating: 4.06,
      address: "대전광역시 서구",
    },
    {
      storeId: 3,
      storeName: "너닮꽃집11",
      profile: "",
      rating: 4.33,
      address: "대전광역시 유성구",
    },
    {
      storeId: 4,
      storeName: "너닮꽃집22",
      profile: "",
      rating: 4.06,
      address: "대전광역시 서구",
    },
    {
      storeId: 5,
      storeName: "너닮꽃집11",
      profile: "",
      rating: 4.33,
      address: "대전광역시 유성구",
    },
    {
      storeId: 6,
      storeName: "너닮꽃집22",
      profile: "",
      rating: 4.06,
      address: "대전광역시 서구",
    },
    {
      storeId: 7,
      storeName: "너닮꽃집11",
      profile: "",
      rating: 4.33,
      address: "대전광역시 유성구",
    },
    {
      storeId: 8,
      storeName: "너닮꽃집22",
      profile: "",
      rating: 4.06,
      address: "대전광역시 서구",
    },
    {
      storeId: 9,
      storeName: "09999991",
      profile: "",
      rating: 4.33,
      address: "대전광역시 유성구",
    },
  ];

  const maxPage = 3;

  return (
    <div className={styles.layout}>
      {/* top */}
      <div className={styles.top__div}>
        <h1>너닮꽃 플로리스트</h1>
        <div>
          너닮꽃을 다채롭게 만들어주는 소중한 플로리스트 분들입니다. <hr />
          프로필을 눌러서 플로리스트 분들의 작품을 구경해보세요!
        </div>
        <div>
          <button
            className={cx("sort__btn__item", {
              ["activate"]: currentSort === 1,
            })}
            onClick={() => setCurrentSort(1)}
          >
            최신순
          </button>
          <button
            className={cx("sort__btn__item", {
              ["activate"]: currentSort === 2,
            })}
            onClick={() => setCurrentSort(2)}
          >
            별점순
          </button>
          <button
            className={cx("sort__btn__item", {
              ["activate"]: currentSort === 3,
            })}
            onClick={() => setCurrentSort(3)}
          >
            주문량 많은순
          </button>
        </div>
      </div>

      {/* search div */}
      <div className={styles.search__wrapper}>
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
        {/* searchbar */}
        <div className={styles.search_field}>
          <input type="text" className={styles.search__input} placeholder="Search" />
          <span className={cx("material-icons", "material_icons")}>search</span>
        </div>
      </div>
      {/* bottom */}
      <div className={styles.florist_list__wrapper}>
        {currentFloristList.map((florist) => (
          <div
            key={florist.storeId}
            className={styles.florist__wrapper}
            onClick={() => router.push(`/florist/${florist.storeId}`)}
          >
            <div className={styles.store__img}>
              <FlowerImg src={florist.profile} />
            </div>
            <div className={styles.store__info}>
              <p className={styles.store__name}>가나다라 꽃집</p>
              <p className={styles.store__adderss}>
                대전시 구암동 가나다라마나나다라마ㅏ마마마ㅏ마마마만ㅇ가나다라 꽃집
              </p>
              <div className={styles.store__star}>
                <Rating defaultValue="3.3" size="medium" precision={0.5} readOnly className={styles.starrating} />
                <span>5.5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* pagenation */}
      <div>페이지네이션</div>
    </div>
  );
};

export default FloristList;
/*
/api/store/list?page=1&param1={시/도}

/api/store/list?page=1&param1={시/도}&param2={시/군/구}

/api/store/list?page=1&param1={시/도}&param2={시/군/구}&param3={검색 키워드}
*/
