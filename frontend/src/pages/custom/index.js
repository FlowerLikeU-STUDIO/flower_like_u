import classes from "./index.module.scss";
import ProfileImage from "@/components/mypage/common/ProfileImage";

const Custom = () => {
  return (
    <div className={classes.testbox}>
      custom
      <ProfileImage url="/home/centerFlower.png" size="extra_large"></ProfileImage>
    </div>
  );
};

export default Custom;