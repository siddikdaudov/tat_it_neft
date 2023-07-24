import styles from "./input.module.css";

const Input = ({ value, onChange, type, label }) => {
  return (
    <label className={styles.wrapper}>
      {label}
      <input value={value} onChange={onChange} type={type} />
    </label>
  );
};

export default Input;
