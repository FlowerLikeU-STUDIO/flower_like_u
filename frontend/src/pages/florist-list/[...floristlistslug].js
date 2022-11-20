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
import { isEmpty } from "lodash";

const FloristList = (props) => {
  const cx = classNames.bind(styles);
  const router = useRouter();
  // const currentRoute = router.query.floristlistslug;
  // console.log(currentRoute);
  // @ 현재 데이터 props
  const [currentData, setCurrentData] = useState(props.floristData);
  const [currentMaxPage, setCurrentMaxPage] = useState(props.maxPage);
  // *현재 페이지
  const [pageIndex, setPageIndex] = useState(1);
  // const pageIndex = Number(currentRoute[0]) || 1;
  // *최신순 필터
  const [currentSort, setCurrentSort] = useState("reg");
  // const currentSort = currentRoute[1] || "reg";
  // *dropdown
  const [sidoActive, setSidoActive] = useState(false);
  const [sigunguActive, setSigunguActive] = useState(false);
  // *전체 선택시
  const [selectSido, setSelectSido] = useState("전체");
  // const selectSido = currentRoute[2] || "전체";
  // *선택된 배열
  const [selectSigungu, setSelectSigungu] = useState("전체");
  // const selectSigungu = currentRoute[3] || "전체";
  const [selectedArr, setSelectedArr] = useState(regionMap["전체"]);
  // const selectedArr = regionMap[selectSido];
  // *search Input
  const [inputText, setInputText] = useState();
  // * data 및 page
  const { floristList } = useFlorist();
  const [numLst, setNumLst] = useState([1]); // [1, 2, 3, 4, 5]
  const selectSize = 8;
  const { data, maxPage, loading } = floristList({
    pageIndex,
    selectSize,
    selectSido,
    selectSigungu,
    inputText,
    currentSort,
  });

  const holidayList = ["일", "월", "화", "수", "목", "금", "토"];

  const inputChange = async (e) => {
    if (e.target.value.length > 30) {
      setInputText(inputText.slice(0, 30));
      return;
    }
    setInputText(e.target.value);
    // nextJs에서 routing이 일어나면 getStaticProps...를 야기함
    // 이를 실행시키지 않기 위해 shallowRouting으로 url을 업데이트함 -> 불필요한 서버연산을 최소화
    // 주의할 점: 한 페이지 내에서 실행해야함.
    router.push(`/florist-list/1/${currentSort}/${selectSido}/${selectSigungu}`, undefined, { shallow: true });
    if (!data) return;
  };

  // * dropdownHandler
  const dropdownOpen = () => {
    setSidoActive(!sidoActive);
  };

  const sigunguDropdownOpen = () => {
    setSigunguActive(!sigunguActive);
  };

  const pageIndexChange = async (e) => {
    router.push(`/florist-list/${e}/${currentSort}/${selectSido}/${selectSigungu}`, undefined, { shallow: true });
    if (!data) return;
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

  const updateRoute = async (currentRoute) => {
    setPageIndex(Number(currentRoute[0]) || 1);
    setCurrentSort(currentRoute[1] || "reg");
    setSelectSido(currentRoute[2] || "전체");
    setSelectSigungu(currentRoute[3] || "전체");
    setSelectedArr(regionMap[currentRoute[2]]);
  };

  useEffect(() => {
    if (isEmpty(router.query.floristlistslug)) return;
    const currentRoute = router.query.floristlistslug;
    const fun = async (currentRoute) => {
      await updateRoute(currentRoute);
    };
    fun(currentRoute);
  }, [router.query.floristlistslug]);

  useEffect(() => {
    if (isEmpty(router.query.floristlistslug)) return;
    if (loading) return;
    if (!data) {
      setCurrentData(null);
      setCurrentMaxPage(null);
    }
    setCurrentData(data);
    setCurrentMaxPage(maxPage);
  }, [data]);

  useEffect(() => {
    if (isEmpty(router.query.floristlistslug)) return;
    if (!maxPage) return;
    if (maxPage < 6) {
      setNumLst([1, 2, 3, 4, 5].slice(0, maxPage));
    } else {
      if (pageIndex < 6) {
        setNumLst([1, 2, 3, 4, 5]);
      }
    }
    // }, [currentMaxPage, pageIndex]);
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
            >
              <Link href={`/florist-list/1/reg/${selectSido}/${selectSigungu}`}>
                <a>최신순</a>
              </Link>
            </button>

            <button
              className={cx("sort__btn__item", {
                ["activate"]: currentSort === "rating",
              })}
            >
              <Link href={`/florist-list/1/rating/${selectSido}/${selectSigungu}`}>
                <a>별점순</a>
              </Link>
            </button>
            <button
              className={cx("sort__btn__item", {
                ["activate"]: currentSort === "order",
              })}
            >
              <Link href={`/florist-list/1/order/${selectSido}/${selectSigungu}`}>
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
                    <Link href={`/florist-list/1/${currentSort}/${sido}/전체`}>
                      <a value={sido} key={sido + idx}>
                        {sido}
                      </a>
                    </Link>
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
                    <Link href={`/florist-list/1/${currentSort}/${selectSido}/${sigungu}`}>
                      <a value={sigungu} key={sigungu + idx}>
                        {sigungu}
                      </a>
                    </Link>
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

        <main className={styles.florist_list_pagenation_wrapper}>
          {/* bottom */}
          <div className={styles.florist_list__wrapper}>
            {/* {!currentData && loading && <Spinner />} */}
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
                      {florist.holidays && "휴무일: "}
                      {isEmpty(florist.holidays.filter((res) => res === true)) && <span>미정</span>}
                      {florist.holidays
                        .map((_, index) => _ && holidayList[index] + "요일 ")
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
                // <Link href={`/florist-list/${num}/${currentSort}/${selectSido}/${selectSigungu}`}>
                <button
                  className={styles.btn}
                  key={"페이지네이션" + idx}
                  onClick={pageIndexChange.bind(pageIndexChange, num)}
                  disabled={pageIndex === num}
                >
                  {num}
                </button>
                // </Link>
              ))}
              <button
                className={styles.btn}
                onClick={pageIndexChange.bind(pageIndexChange, pageIndex + 1)}
                disabled={!maxPage || pageIndex === currentMaxPage}
              >
                &gt;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FloristList;

export async function getStaticProps({ params }) {
  const page = Number(params.floristlistslug[0]);
  const sort = params.floristlistslug[1];
  const sd = params.floristlistslug[2];
  const sgg = params.floristlistslug[3];
  const size = 8;
  // const sd = "";
  // const sgg = "";
  const sn = "";

  const response = await axios.get(
    `${BASE_URL}user/stores?page=${page}&size=${size}&sd=${sd}&sgg=${sgg}&sn${sn}=&sort=${sort}`
    // `${BASE_URL}user/stores?page=${page}&size=${size}&sd=${sd}&sgg=${sgg}&sn${sn}=&sort=${sort}`
  );
  // const response = await axios.get(`${BASE_URL}user/stores?page=${page}&size=#&sd=2&sgg=&sn=&sort=${sort}`);

  if (!response) {
    return { notFound: true };
  }
  if (!response.data) {
    return { notFound: true };
  }
  if (response.data.result === "fail") {
    return {
      props: {
        floristData: null,
        maxPage: null,
      },
    };
  }
  const data = response.data.storeInfo;

  return {
    props: {
      floristData: data.list,
      maxPage: data.maxPage,
    },
    //html생성 후 10초동안 사용자에게 같은 html 제공
    //10초 후 GET요청 들어올 시, 기존 html응답과 동시에 새로운 html regenerate -> 이후 GET요청부턴 갱신된 html 응답
    revalidate: 10, // seconds
  };
}

export async function getStaticPaths() {
  return {
    fallback: true, // 일부 페이지만 사전 렌더링
    paths: [
      { params: { floristlistslug: ["1", "reg", "전체", "전체"] } },
      { params: { floristlistslug: ["1", "order", "전체", "전체"] } },
      { params: { floristlistslug: ["1", "rating", "전체", "전체"] } },
    ],
  };
}
