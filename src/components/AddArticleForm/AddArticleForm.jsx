import { useState } from "react";
import styles from "./addArticleForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import { useSelector, useDispatch } from "react-redux";
import { updateArticle, addArticle } from "../../redux/features/articles";
import { deleteEditableArticle } from "../../redux/features/editableArticle";

const Form = ({ setOpen }) => {
  const selectedArticle = useSelector((state) => state.editableArticle);
  const dispatch = useDispatch();
  const [article, setArticle] = useState({
    author: selectedArticle.article.author ?? "",
    theme: selectedArticle.article.theme ?? "",
    created_at:
      selectedArticle.article.created_at?.split(".").reverse().join("-") ?? "",
    title: selectedArticle.article.title ?? "",
    text: selectedArticle.article.text ?? "",
  });

  const form = [
    {
      component: Input,
      props: {
        type: "text",
        label: "Автор",
        value: article.author,
        onChange: (e) => handleChangeArticle(e, "author"),
      },
    },
    {
      component: Input,
      props: {
        type: "text",
        label: "Тема",
        value: article.theme,
        onChange: (e) => handleChangeArticle(e, "theme"),
      },
    },
    {
      component: Input,
      props: {
        type: "date",
        label: "Дата",
        value: article.created_at,
        onChange: (e) => handleChangeArticle(e, "created_at"),
      },
    },
    {
      component: Input,
      props: {
        type: "text",
        label: "Заголовок",
        value: article.title,
        onChange: (e) => handleChangeArticle(e, "title"),
      },
    },
    {
      component: TextArea,
      props: {
        label: "Текст",
        value: article.text,
        onChange: (e) => handleChangeArticle(e, "text"),
      },
    },
  ];

  const handleChangeArticle = (e, key) => {
    setArticle((currentState) => ({
      ...currentState,
      [key]: e.target.value,
    }));
  };

  const onUpdateArticle = (e) => {
    e.preventDefault();
    dispatch(
      updateArticle({
        id: selectedArticle.article.id,
        comments: selectedArticle.article.comments,
        ...article,
        created_at: article.created_at.split("-").reverse().join("."),
      })
    );
    dispatch(deleteEditableArticle());
    setOpen(false);
  };

  const createNewArticle = (e) => {
    e.preventDefault();
    dispatch(addArticle({ ...article, comments: [] }));
    setOpen(false);
  };

  return (
    <form className={styles.form}>
      {form.map((item, index) => (
        <item.component {...item.props} key={index} />
      ))}
      {selectedArticle.article.id ? (
        <Button text="Сохранить" onClick={onUpdateArticle} />
      ) : (
        <Button text="Добавить" onClick={createNewArticle} />
      )}
    </form>
  );
};

export default Form;
