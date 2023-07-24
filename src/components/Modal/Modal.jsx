import styles from "./modal.module.css";
import Form from "../AddArticleForm/AddArticleForm";
import { useDispatch } from "react-redux";
import { deleteEditableArticle } from "../../redux/features/editableArticle";

const Modal = ({ isOpen, setOpen }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modal}>
        <Form setOpen={setOpen} />
        <button
          className={styles.close}
          onClick={() => {
            dispatch(deleteEditableArticle());
            setOpen(false);
          }}
        >
          ✕
        </button>
      </div>
      <div className={styles.backdrop} />
    </>
  );
};

export default Modal;
