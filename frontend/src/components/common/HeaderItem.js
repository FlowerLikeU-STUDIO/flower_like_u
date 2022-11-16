import styles from "./HeaderItem.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import Contents from "./Contents";
import Link from "next/link";

const HeaderItem = ({ ...props }) => {
  // console.log(props.isMyPage); // mypage에선 props.isMyPage=true

  return (
    <section className={styles.layout}>
      <div className={styles.header__main}>
        <ProfileImage url={props.profile} size="medium" />
        <div className={styles.flexdiv}>
          <div>
            {props.type === "store" ? (
              <span className={styles.userName}>{props.storeName || props.name}</span>
            ) : (
              <span className={styles.userName}>{props.nickname || props.name}</span>
            )}
            {props.isMyPage && (
              <Link href="/mypage/settings">
                <a className={styles.settings}>
                  <span className="material-icons-outlined">settings</span>
                </a>
              </Link>
            )}
          </div>
          {props.type === "store" && (
            <div className={styles.profile_seller}>
              <p>판매자 프로필 하단</p>
              <Contents rating={props.rating} introduce={props.introduce} feedsNum={props.feedsNum} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderItem;
