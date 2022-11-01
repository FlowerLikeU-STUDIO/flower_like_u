import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";

const Button = (props) => {
  const cx = classNames.bind(styles);

  if (props.link) {
    return (
      // a tag를 사용하지 않는다면, 보이지 않지만 link가 자체적으로 a tag를 렌더링함
      <Link href={props.link}>
        {/* 사용자 지정 스타일을 적용하려면, a 태그를 써줘야함 */}
        <a className={cx("Button", props.size, props.color)}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button onClick={props.onClick} className={cx("Button", props.size, props.color)}>
      {props.children}
    </button>
  );
};

export default Button;
