import styles from "./comments.module.css";

const Comment = ({ text }) => {
  return (
    <div className={styles.comment}>
      <span />
      <p>{text}</p>
    </div>
  );
};

export default Comment;
