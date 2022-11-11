import styles from "./PageNation.module.scss";

const PageNation = ({ setPageIndex, selectNumLst, pageIndex, maxPage }) => {
  return (
    <div className={styles.main__div}>
      <button className={styles.btn} onClick={() => setPageIndex(pageIndex - 1)} disabled={selectNumLst[0] === 1}>
        &lt;
      </button>

      {selectNumLst.map((num, idx) => (
        <button className={styles.btn} key={idx} onClick={() => setPageIndex(num)} disabled={pageIndex === num}>
          {num}
        </button>
      ))}

      <button
        className={styles.btn}
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={selectNumLst[selectNumLst.length - 1] === maxPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default PageNation;
