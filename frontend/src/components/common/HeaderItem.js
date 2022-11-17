import styles from "./HeaderItem.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import Contents from "./Contents";
import Link from "next/link";
import React from "react";

const HeaderItem = ({ ...props }) => {
  return (
    <div className={styles.header__main}>
      <ProfileImage url={props.profile} size="medium" />
      <div className={styles.flexdiv}>
        <div className={styles.store__mypage}>
          <div>
            {props.type === "store" ? (
              <span className={styles.userName}>{props.storeName || props.name}</span>
            ) : (
              <span className={styles.userName}>{props.nickname || props.name}</span>
            )}
            {props.isMyPage && (
              <>
                <Link href="/mypage/settings">
                  <a className={styles.settings}>
                    <span className="material-icons-outlined">settings</span>
                  </a>
                </Link>
              </>
            )}
          </div>
          {props.type === "store" && props.isMyPage && (
            <button
              className={styles.feed}
              onClick={() => {
                console.log("피드등록 로직");
              }}
            >
              피드 등록하기
            </button>
          )}
        </div>
        {props.type === "store" && (
          <div className={styles.profile_seller}>
            <Contents rating={props.rating} introduce={props.introduce} feedsNum={props.feedNum} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderItem;
