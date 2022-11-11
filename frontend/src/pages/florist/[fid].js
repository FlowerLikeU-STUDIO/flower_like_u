import { useRouter } from "next/router";
import React from "react";

const FloristProfile = () => {
  const router = useRouter();
  const storeId = router.query.fid;

  return <div>FloristProfile</div>;
};

export default FloristProfile;
