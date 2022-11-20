import MyContentBtn from "../common/MyContentBtn";
import useUser from "@/hooks/useUser";
import React from "react";
import HeaderItem from "../common/HeaderItem";

const MyHeader = () => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <>
          <HeaderItem {...user} isMyPage={true} />
          <MyContentBtn props={user.type} />
        </>
      )}
    </>
  );
};

export default React.memo(MyHeader);
