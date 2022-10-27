import classNames from "classnames";
import "./Button.module.scss";
const Button = ({ children, size, color }) => {
  return <button className={classNames("Button", size, color)}>{children}</button>;
};

export default Button;

Button.defaultProps = {
  size: "medium",
  color: "blue",
};
