import styles from "../styles/SignupHeader.module.scss";

// コンポーネント
export default function SignupHeader(props) {
  return (
    <div className={styles.signupHeader}>
      <div className={styles.numBox}>
        <div
          className={
            styles.num + " " + styles[props.enable == 1 ? "enable" : "disable"]
          }
        >
          1
        </div>
        <div className={styles.line}></div>
        <div
          className={
            styles.num + " " + styles[props.enable == 2 ? "enable" : "disable"]
          }
        >
          2
        </div>
        <div className={styles.line}></div>
        <div
          className={
            styles.num + " " + styles[props.enable == 3 ? "enable" : "disable"]
          }
        >
          3
        </div>
      </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}
