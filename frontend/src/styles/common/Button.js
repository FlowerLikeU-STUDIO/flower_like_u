import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const Button = ({ children, size, color, onClick }) => {
  const cx = classNames.bind(styles);

  const clickBtn = () => {
    onClick();
  };

  return (
    <button onClick={clickBtn} className={cx("Button", size, color)}>
      {children}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  size: "medium",
  color: "blue",
};
