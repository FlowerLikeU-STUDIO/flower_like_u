import styles from "./imagesave.module.scss";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const ImageSave = () => {
  const onDownloadBtn = () => {
    const capture = document.querySelector("#capture");
    html2canvas(capture).then((canvas) => {
      saveAs(canvas.toDataURL("image/jpg"), "image.jpg");
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.image} id="capture">
        <button className={styles.button} onClick={() => onDownloadBtn()}>
          save
        </button>
      </div>
    </div>
  );
};

export default ImageSave;
