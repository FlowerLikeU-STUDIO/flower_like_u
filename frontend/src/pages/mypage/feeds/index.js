import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import Feed from "@/components/feeds";
import useUser from "@/hooks/useUser";

const MyPageFeeds = () => {
  const { user } = useUser();

  return (
    <MyWrapper>
      <MyHeader />
      <Feed storeId={user.userPk} />
    </MyWrapper>
  );
};

export default MyPageFeeds;
