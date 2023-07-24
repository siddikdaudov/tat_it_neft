import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleListCard from "../components/ArticleListCard/ArticleListCard";
import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";
import Filter from "../components/Filter/Filter";

const ArticleList = () => {
  const { articles } = useSelector((state) => state.articles);
  const { filteredArticles } = useSelector((state) => state.articles);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isFiltered, setFiltered] = useState(false);

  const handleNavigate = (id) => {
    navigate(`/${id}`);
  };

  const handleAddArticle = () => {
    setOpen(true);
    setFiltered(false);
  };

  return (
    <>
      <Button
        text="Добавить статью"
        onClick={handleAddArticle}
        style={{ backgroundColor: "#ff4800" }}
      />
      <Filter setFiltered={setFiltered} />
      <ul>
        {isFiltered
          ? filteredArticles.map((article) => (
              <li
                key={article.id}
                onClick={() => handleNavigate(article.id)}
                style={{ borderBottom: "1px solid #dbdada" }}
              >
                <ArticleListCard data={article} showButtons setOpen={setOpen} />
              </li>
            ))
          : articles.map((article) => (
              <li
                key={article.id}
                onClick={() => handleNavigate(article.id)}
                style={{ borderBottom: "1px solid #dbdada" }}
              >
                <ArticleListCard data={article} showButtons setOpen={setOpen} />
              </li>
            ))}
      </ul>
      <Modal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
};

export default ArticleList;
