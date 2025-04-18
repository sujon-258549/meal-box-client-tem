// import "./loading.css";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div>
      <div className={styles.loadingContainer}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
