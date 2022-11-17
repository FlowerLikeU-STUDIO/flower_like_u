import ContentForm from "@/components/feeds/ContentForm";
import ImageForm from "@/components/feeds/ImageForm";
import styled from "styled-components";
import CloseButton from "../CloseButton";
import { useState } from "react";
import { client } from "@/pages/api/client";
import useInput from "@/hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";
import SuccessAlert from "@/lib/SuccessAlert";

const FeedRegisterWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

const RegisterWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  @media screen and (max-width: 720px) {
    width: 100%;
    height: 50%;
  }
`;

const contentData = {
  title: "",
  cost: "",
  desc: "",
};
const FeedRegister = () => {
  const [image, setImage] = useState([]);
  const [content, setContent, onChange] = useInput(contentData);
  const router = useRouter();

  const registerFeed = async () => {
    if (image.length === 0) {
      alert("대표이미지를 선택해주세요.");
      return;
    }
    if (
      content.title.length === 0 ||
      content.cost.length === 0 ||
      content.desc.length === 0
    ) {
      alert("글을 입력해주세요.");
      return;
    }
    const data = {
      name: content.title,
      price: content.cost,
      content: content.desc,
      image: image,
    };

    const { res, status } = await client.post("/feed", data).then((res) => res);
    if (status === 201) {
      SuccessAlert("피드가 등록되었습니다.");
      router.replace("/mypage/feeds");
    }
  };
  return (
    <FeedRegisterWrapper>
      <RegisterWrapper>
        <ImageForm image={image} setImage={setImage} />
      </RegisterWrapper>
      <RegisterWrapper>
        <ContentForm
          registerFeed={registerFeed}
          content={content}
          onChange={onChange}
        />
      </RegisterWrapper>
    </FeedRegisterWrapper>
  );
};

export default FeedRegister;
