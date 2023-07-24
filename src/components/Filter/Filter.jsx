import { useState } from "react";
import styles from "./filter.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { filterArticles } from "../../redux/features/articles";

const Filter = ({ setFiltered }) => {
  const { articles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    title: "",
    theme: "",
    author: "",
    created_at: "",
  });

  const form = [
    {
      component: Input,
      props: {
        type: "text",
        label: "Заголовок",
        value: filter.title,
        onChange: (e) => handleChangeArticle(e, "title"),
      },
    },
    {
      component: Input,
      props: {
        type: "text",
        label: "Тема",
        value: filter.theme,
        onChange: (e) => handleChangeArticle(e, "theme"),
      },
    },
    {
      component: Input,
      props: {
        type: "text",
        label: "Автор",
        value: filter.author,
        onChange: (e) => handleChangeArticle(e, "author"),
      },
    },
    {
      component: Input,
      props: {
        type: "date",
        label: "Дата",
        value: filter.created_at,
        onChange: (e) => handleChangeArticle(e, "created_at"),
      },
    },
  ];

  const handleChangeArticle = (e, key) => {
    setFilter((currentState) => ({
      ...currentState,
      [key]: e.target.value,
    }));
  };

  const search = () => {
    if (
      !filter.title &&
      !filter.author &&
      !filter.theme &&
      !filter.created_at
    ) {
      return;
    }

    const filteredBytitle = filter.title
      ? articles.filter((article) =>
          article.title.toLowerCase().includes(filter.title.toLowerCase())
        )
      : [];
    const filteredByTheme = filter.theme
      ? articles.filter((article) =>
          article.theme.toLowerCase().includes(filter.theme.toLowerCase())
        )
      : [];
    const filteredByAuthor = filter.author
      ? articles.filter((article) =>
          article.author.toLowerCase().includes(filter.author.toLowerCase())
        )
      : [];
    const filteredByDate = filter.created_at
      ? articles.filter(
          (article) =>
            article.created_at ==
            filter.created_at.split("-").reverse().join(".")
        )
      : [];
    dispatch(
      filterArticles([
        ...filteredBytitle,
        ...filteredByTheme,
        ...filteredByAuthor,
        ...filteredByDate,
      ])
    );
    setFiltered(true);
  };

  const reset = () => {
    if (
      !filter.title &&
      !filter.author &&
      !filter.theme &&
      !filter.created_at
    ) {
      return;
    }

    setFilter({
      title: "",
      theme: "",
      author: "",
      created_at: "",
    });
    setFiltered(false);
  };

  return (
    <div className={styles.wrapper}>
      {form.map((item, index) => (
        <item.component {...item.props} key={index} />
      ))}
      <Button
        text="Сбросить"
        style={{ backgroundColor: "rgb(151, 12, 10)" }}
        onClick={reset}
      />
      <Button text="Найти" onClick={search} />
    </div>
  );
};

export default Filter;
