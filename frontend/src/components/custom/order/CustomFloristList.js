import styles from "./CustomFloristList.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { regionKey, regionMap } from "@/lib/utils/addressList";
import FlowerImg from "@/components/common/FlowerImg";
import { Rating } from "@mui/material";
import useFlorist from "@/hooks/useFlorist";

const CustomFloristList = ({ storeId, setStoreId }) => {
  const cx = classNames.bind(styles);
  // *dropdown
  const [sidoActive, setSidoActive] = useState(false);
  const [sigunguActive, setSigunguActive] = useState(false);
  // *전체 선택시
  const [selectSido, setSelectSido] = useState("전체");
  // *선택된 배열
  const [selectSigungu, setSelectSigungu] = useState("전체");
  const [selectedArr, setSelectedArr] = useState(regionMap["전체"]);
  // *search Input
  const [inputText, setInputText] = useState();
  // *휴일
  const holidayList = ["일", "월", "화", "수", "목", "금", "토"];

  // * data 및 page
  const { customFloristList } = useFlorist();
  const [mxPage, setMxPage] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [numLst, setNumLst] = useState([1]); // [1, 2, 3, 4, 5]
  const selectSize = 20;
  const { data, maxPage, mutate } = customFloristList({
    pageIndex,
    selectSize,
    selectSido,
    selectSigungu,
    inputText,
  });

  // *scroll to top
  const scrollTopRef = useRef();
  const scrollToTop = () => {
    scrollTopRef.current.scrollIntoView(true);
  };

  const sidoSelect = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSido(value);
    setSelectSigungu("전체");
    setSelectedArr(regionMap[value]);
    setPageIndex(1);
    if (!data) return;
    mutate();
  };

  const sigunguSelect = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSigungu(value);
    setPageIndex(1);
    if (!data) return;
    await mutate();
  };

  const inputChange = async (e) => {
    if (e.target.value.length > 30) {
      setInputText(inputText.slice(0, 30));
      return;
    }
    setInputText(e.target.value);
    setPageIndex(1);
    if (!data) return;
    await mutate();
  };

  // * dropdownHandler
  const dropdownOpen = () => {
    setSidoActive(!sidoActive);
  };

  const sigunguDropdownOpen = () => {
    setSigunguActive(!sigunguActive);
  };

  const pageIndexChange = async (e) => {
    setPageIndex(e);
    scrollToTop();
    if (!data) return;
    await mutate();
    if (e > numLst[numLst.length - 1]) {
      const mn = (Math.floor(e - 1) / 5) * 5 + 1;
      const mx = (Math.floor(e - 1) / 5) * 5 + 5;
      const tmplst = [];
      for (let i = mn; i <= mx; i++) {
        tmplst.push(i);
      }
      if (mx <= mxPage) {
        setNumLst(tmplst.slice(0, 5));
      } else {
        setNumLst(tmplst.slice(0, mxPage % 5));
      }
    } else if (e < numLst[0] && e % 5 == 0) {
      let copyOfNumLst = [];
      for (let i = numLst[0] - 5; i < numLst[0]; i++) {
        copyOfNumLst.push(i);
      }
      setNumLst(copyOfNumLst);
    }
  };

  useEffect(() => {
    if (maxPage < 6) {
      setNumLst([1, 2, 3, 4, 5].slice(0, maxPage));
    } else {
      if (pageIndex < 6) {
        setNumLst([1, 2, 3, 4, 5]);
      }
    }
  }, [mxPage, pageIndex]);

  useEffect(() => {
    if (!data) {
      setMxPage(1);
    }
    setMxPage(maxPage);
    console.log(data);
  }, [data]);

  return (
    <div className={styles.default}>
      <div className={styles.search__wrapper} ref={scrollTopRef}>
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
          <input
            type="text"
            className={styles.search__input}
            placeholder="Search"
            value={inputText || ""}
            onChange={inputChange}
          />
          <span className={cx("material-icons", "material_icons")}>search</span>
        </div>
      </div>
      <div className={styles.layout}>
        {/* bottom */}
        <div className={styles.florist_list__wrapper}>
          {data ? (
            data.map((florist) => (
              <div
                key={florist.storeId}
                className={cx("florist__wrapper", {
                  [styles.florist__wrapper__true]: florist.storeId === storeId,
                })}
                onClick={() => setStoreId(florist.storeId)}
              >
                <div className={styles.store__img}>
                  <FlowerImg src={florist.profile} />
                </div>
                <div className={styles.store__info}>
                  <p className={styles.store__name}>{florist.storeName}</p>
                  <p className={styles.store__adderss}>{florist.address}</p>
                  <p className={styles.store__days}>
                    {florist.holidays
                      .map((_, index) => _ && holidayList[index] + "요일")
                      .filter((el) => (
                        <span>{el}</span>
                      ))}
                  </p>
                  <div className={styles.store__star}>
                    <Rating
                      defaultValue={florist.rating}
                      size="medium"
                      precision={0.5}
                      readOnly
                      className={styles.starrating}
                    />
                    <span>{florist.rating}점</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>존재하지 않는 결과 입니다.</p>
            </div>
          )}
        </div>
        {/* 페이지네이션 */}
        {data && (
          <div className={styles.main__div}>
            <button
              className={styles.btn}
              onClick={pageIndexChange.bind(pageIndexChange, pageIndex - 1)}
              disabled={pageIndex === 1}
            >
              &lt;
            </button>
            {numLst.map((num, idx) => (
              <button
                className={styles.btn}
                key={idx}
                onClick={pageIndexChange.bind(pageIndexChange, num)}
                disabled={pageIndex === num}
              >
                <a>{num}</a>
              </button>
            ))}
            <button
              className={styles.btn}
              onClick={pageIndexChange.bind(pageIndexChange, pageIndex + 1)}
              disabled={!maxPage || numLst[numLst.length - 1] === maxPage}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFloristList;
