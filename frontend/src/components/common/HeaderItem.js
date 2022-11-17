import styles from "./HeaderItem.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import Contents from "./Contents";
import Link from "next/link";
import React from "react";

const HeaderItem = ({ ...props }) => {
  console.log(props);
  return (
    <div className={styles.header__main}>
      <ProfileImage url={props.profile} size="medium" />
      <div className={styles.flexdiv}>
        <div>
          {props.type === "store" ? (
            <span className={styles.userName}>
              {props.storeName || props.name}
            </span>
          ) : (
            <span className={styles.userName}>
              {props.nickname || props.name}
            </span>
          )}
          {props.isMyPage ? (
            <Link href="/mypage/settings">
              <a className={styles.settings}>
                <span className="material-icons-outlined">settings</span>
              </a>
            </Link>
          ) : (
            <></>
          )}
        </div>
        {props.type === "store" && (
          <div className={styles.profile_seller}>
            <Contents
              rating={props.rating}
              introduce={props.introduce}
              feedsNum={props.feedNum}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderItem;
