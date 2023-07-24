import styles from "./button.module.css";

const Button = ({ onClick, text, style }) => {
  return (
    <button onClick={onClick} className={styles.button} style={style}>
      {text}
    </button>
  );
};

export default Button;
