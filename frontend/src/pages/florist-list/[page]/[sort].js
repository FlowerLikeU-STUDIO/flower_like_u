import Head from "next/head";
import styles from "./florist-list.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { regionKey, regionMap } from "@/lib/utils/addressList";
import FlowerImg from "@/components/common/FlowerImg";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import useFlorist from "@/hooks/useFlorist";
import { BASE_URL } from "@/pages/api/client";
import axios from "axios";
import Link from "next/link";

const FloristList = (props) => {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const currentRoute = router.query.sort;
  // @ 현재 데이터
  const [currentData, setCurrentData] = useState(props.floristData);
  // *최신순 필터
  const [currentSort, setCurrentSort] = useState(currentRoute);
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
  // * data 및 page
  const { floristList } = useFlorist();
  const [currentMaxPage, setCurrentMaxPage] = useState(props.maxPage);
  const [pageIndex, setPageIndex] = useState(1);
  const [numLst, setNumLst] = useState([1]); // [1, 2, 3, 4, 5]
  const selectSize = 8;
  const { data, maxPage, mutate } = floristList({
    pageIndex,
    selectSize,
    selectSido,
    selectSigungu,
    inputText,
    currentSort,
  });

  const holidayList = ["일", "월", "화", "수", "목", "금", "토"];

  const curSortChange = async (e) => {
    setCurrentSort(e);
    setPageIndex(1);
    if (!data) return;
    await mutate();
  };

  const sidoSelect = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSido(value);
    setSelectSigungu("전체");
    setSelectedArr(regionMap[value]);
    router.push(`/florist-list/1/${currentSort}`);
    setPageIndex(1);
    if (!data) return;
    mutate();
  };

  const sigunguSelect = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectSigungu(value);
    router.push(`/florist-list/1/${currentSort}`);
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
    if (!data) return;
    await mutate();
    console.log("현재 클릭", e);
    console.log("현재 클릭", numLst);
    if (e > numLst[numLst.length - 1]) {
      const mn = (Math.floor(e - 1) / 5) * 5 + 1;
      const mx = (Math.floor(e - 1) / 5) * 5 + 5;
      const tmplst = [];
      for (let i = mn; i <= mx; i++) {
        tmplst.push(i);
      }
      if (mx <= currentMaxPage) {
        setNumLst(tmplst.slice(0, 5));
      } else {
        setNumLst(tmplst.slice(0, currentMaxPage % 5));
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
  }, [currentMaxPage, pageIndex]);

  useEffect(() => {
    if (!data) {
      setCurrentData(null);
      setCurrentMaxPage(1);
    }
    setCurrentData(data);
    setCurrentMaxPage(maxPage);
  }, [data]);

  return (
    <div className={styles.florist_background}>
      <div className={styles.layout}>
        <Head>
          <title>너닮꽃 플로리스트</title>
          <meta
            name="description"
            content="너닮꽃을 다채롭게 만들어주는 소중한 플로리스트 분들입니다. 프로필을 눌러서 플로리스트 분들의 작품을 구경해보세요!"
          />
        </Head>
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
                ["activate"]: currentSort === "reg",
              })}
              onClick={curSortChange.bind(curSortChange, "reg")}
            >
              <Link href={`/florist-list/1/reg`}>
                <a>최신순</a>
              </Link>
            </button>

            <button
              className={cx("sort__btn__item", {
                ["activate"]: currentSort === "rating",
              })}
              onClick={curSortChange.bind(curSortChange, "rating")}
            >
              <Link href={`/florist-list/1/rating`}>
                <a>별점순</a>
              </Link>
            </button>
            <button
              className={cx("sort__btn__item", {
                ["activate"]: currentSort === "order",
              })}
              onClick={curSortChange.bind(curSortChange, "order")}
            >
              <Link href={`/florist-list/1/order`}>
                <a>주문량 많은순</a>
              </Link>
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
        {/* bottom */}
        <div className={styles.florist_list__wrapper}>
          {currentData ? (
            currentData.map((florist) => (
              <div
                key={florist.storeId}
                className={styles.florist__wrapper}
                onClick={() => router.push(`/florist/${florist.storeId}/feed`)}
              >
                <div className={styles.store__img}>
                  <FlowerImg src={florist.profile} florist={"florist"} />
                </div>
                <div className={styles.store__info}>
                  <p className={styles.store__name}>{florist.storeName}</p>
                  <p className={styles.store__days}>
                    {florist.holidays
                      .map((_, index) => _ && holidayList[index] + "요일")
                      .filter((el) => (
                        <span>{el}</span>
                      ))}
                  </p>
                  <p className={styles.store__adderss}>{florist.address}</p>
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
        {currentData && (
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
                <Link href={`/florist-list/${num}/${currentSort}`}>
                  <a>{num}</a>
                </Link>
              </button>
            ))}
            <button
              className={styles.btn}
              onClick={pageIndexChange.bind(pageIndexChange, pageIndex + 1)}
              disabled={!maxPage || pageIndex === maxPage}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloristList;

export async function getStaticProps({ params }) {
  const page = params.page;
  const sort = params.sort;

  const response = await axios.get(`${BASE_URL}user/stores?page=${page}&size=#&sd=2&sgg=&sn=&sort=${sort}`);

  if (!response) {
    return { notFound: true };
  }
  const data = response.data.storeInfo;
  return {
    props: {
      floristData: data.list,
      maxPage: data.maxPage,
    },
    revalidate: 10, // seconds
  };
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      { params: { page: "1", sort: "reg" } },
      { params: { page: "1", sort: "rating" } },
      { params: { page: "1", sort: "order" } },
    ],
  };
}
