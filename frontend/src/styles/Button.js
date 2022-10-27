import classNames from "classnames";
import "./Button.module.scss";

const Button = ({ children, size, color }) => {
  // return <button className={classNames("Button", size, color)}>{children}</button>;
  /*
  <div className={[customStyle.test, customStyle.active].join(" ")}></div>
<div className={`${customStyle.test} ${customStyle.active}`}></div>
  */
  // return <button className={[Button.color, Button.size].join(" ")}>{children}</button>;
  return <button className={`${Button.color} ${Button.size}`}>{children}</button>;
};

export default Button;

Button.defaultProps = {
  size: "medium",
  color: "blue",
};
