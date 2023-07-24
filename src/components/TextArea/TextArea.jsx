import styles from "./textArea.module.css";

const TextArea = ({ onChange, value, label }) => {
  return (
    <label className={styles.wrapper}>
      {label}
      <textarea
        placeholder="Введите..."
        className={styles.textArea}
        onChange={onChange}
        value={value}
      ></textarea>
    </label>
  );
};

export default TextArea;
