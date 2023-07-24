import styles from "./articleListCard.module.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../redux/features/articles";
import { selectEditableArticle } from "../../redux/features/editableArticle";

const ArticleListCard = ({ data, style, showButtons, setOpen }) => {
  const { articles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteArticle(data.id));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    const article = articles.find((article) => article.id == data.id);
    dispatch(selectEditableArticle(article));
    setOpen(true);
  };

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.header}>
        <p className={styles.author}>Автор: {data.author}</p>
        <p className={styles.theme}>Тема: {data.theme}</p>
        <p className={styles.date}>{data.created_at}</p>
      </div>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.text} style={style}>
        {data.text}
      </p>
      {showButtons && (
        <div className={styles.buttons}>
          <Button text="Редактировать" onClick={handleEdit} />
          <Button
            text="Удалить"
            style={{ backgroundColor: "#970c0a" }}
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleListCard;
