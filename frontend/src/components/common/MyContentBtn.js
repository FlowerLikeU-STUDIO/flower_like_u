import styles from "./MyContentBtn.module.scss";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyContentBtn = ({ props }) => {
  const pagePath = { consumer: ["reservation", "order", "design"], seller: ["feeds", "reviews", "order-manage"] };
  if (!props) return;
  const path = pagePath[props];
  const router = useRouter();
  const currentPath = router.pathname.split("mypage/")[1];

  return (
    <div className={styles.btn__div}>
      <Button
        size="medium"
        color={path[0] === currentPath ? "solid_pink_active" : "solid_pink"}
        link={`/mypage/${path[0]}`}
      >
        {path[0]}
      </Button>
      <Button
        size="medium"
        color={path[1] === currentPath ? "solid_pink_active" : "solid_pink"}
        link={`/mypage/${path[1]}`}
      >
        {path[1]}
      </Button>
      <Button
        size="medium"
        color={path[2] === currentPath ? "solid_pink_active" : "solid_pink"}
        link={`/mypage/${path[2]}`}
      >
        {path[2]}
      </Button>
    </div>
  );
};

export default MyContentBtn;
