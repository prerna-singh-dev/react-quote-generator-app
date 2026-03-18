import styles from "./Button.module.css";

function Button({ handleClick, children, ...props }) {
  return (
    <button
      type="button"
      className={styles.quoteBlock__btn}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
