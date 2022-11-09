import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const ImageFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 720px) {
    margin-top: 50px;
    justify-content: flex-start;
    width: 100%;
  }
`;
const LableStyle = styled.label`
  border: 1px dashed #949494;
  height: 70%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & input {
    display: none;
    outline: none;
  }
  &.boder_none {
    border: none;
  }
  @media screen and (max-width: 720px) {
    width: 90%;
  }
`;

const ThumbnailWrapper = styled.div`
  height: 70%;
  width: 70%;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
`;
const UploadListWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 20%;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  @media screen and (max-width: 720px) {
    height: 80px;
  }
`;

const UploadListItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  margin-top: 20px;
  cursor: pointer;
`;
const DeleteButton = styled.button`
  display: flex;
  position: absolute;
  top: -10px;
  right: -12px;
  justify-content: center;
  align-items: center;
  background-color: #ffa7a5;
  color: white;
  border-radius: 100%;
  font-size: 12px;
  width: 20px;
  height: 20px;
  z-index: 10;
`;

const AddLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & input {
    display: none;
  }
`;
const ImageForm = ({ image, setImage }) => {
  const [thumnailImage, setThumnailImage] = useState(0);

  const onDelete = (e, idx) => {
    if (idx !== 0 && parseInt(idx) === image.length - 1) {
      setThumnailImage(parseInt(idx) - 1);
    }
    e.preventDefault();
    const newImage = image.filter((imageSrc, i) => i !== idx);
    setImage(newImage);
  };
  const onHandleInput = (e) => {
    if (image.length + e.target.files.length > 5) {
      alert("이미지는 최대 5개까지 가능합니다.");
      return;
    }
    const fileBlobs = e.target.files;
    for (let imageFile of fileBlobs) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage((prevState) => {
          return [...prevState, reader.result];
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const changeThumbnail = (idx) => {
    setThumnailImage(idx);
  };

  return (
    <ImageFormWrapper>
      {image.length === 0 ? (
        <LableStyle
          onChange={onHandleInput}
          className={image.length !== 0 ? "boder_none" : ""}
        >
          <Image src={"/bouquet.png"} width={220} height={220} />
          <span>사진을 등록해보세요.</span>
          <input type={"file"} multiple accept="image/*" />
        </LableStyle>
      ) : (
        <ThumbnailWrapper>
          <Thumbnail>
            {image.length !== 0 && image[thumnailImage] ? (
              <Image
                src={image[thumnailImage]}
                layout={"fill"}
                objectFit={"contain"}
              />
            ) : (
              <></>
            )}
          </Thumbnail>
          <UploadListWrapper>
            {image.map((src, idx) => (
              <UploadListItem key={src + idx}>
                <DeleteButton onClick={(e) => onDelete(e, idx)}>X</DeleteButton>
                <Image
                  src={src}
                  layout={"fill"}
                  objectFit={"contain"}
                  onClick={() => changeThumbnail(idx)}
                />
              </UploadListItem>
            ))}
            {image.length < 5 ? (
              <UploadListItem>
                <AddLabel onChange={onHandleInput}>
                  <span>+</span>
                  <input type={"file"} multiple accept="image/*" />
                </AddLabel>
              </UploadListItem>
            ) : (
              <></>
            )}
          </UploadListWrapper>
        </ThumbnailWrapper>
      )}
    </ImageFormWrapper>
  );
};

export default ImageForm;
