import styles from "./Button.module.css";

function Button({ handleClick, children }) {
  return (
    <button
      type="button"
      className={styles.quoteBlock__btn}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
