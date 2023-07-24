import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment } from "../redux/features/articles";
import ArticleListCard from "../components/ArticleListCard/ArticleListCard";
import Comments from "../components/Comments/Comments";
import TextArea from "../components/TextArea/TextArea";
import Button from "../components/Button/Button";

const Article = () => {
  const { id } = useParams();
  const { articles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedArticle = articles.find((article) => article.id == id);
  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment) return;
    dispatch(addComment(id, comment));
    setComment("");
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <button
        style={{
          background: "transparent",
          border: "none",
          margin: "15px 0 0 15px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#2e80a5",
        }}
        onClick={() => navigate(-1)}
      >
        ↩️ Назад к списку
      </button>
      <ArticleListCard
        data={selectedArticle}
        style={{ whiteSpace: "initial", cursor: "default" }}
      />
      <div style={{ padding: "0px 15px" }}>
        <h4 style={{ margin: "10px 0 20px 0" }}>Комментарии:</h4>
        <Comments data={selectedArticle.comments} />
        <form style={{ marginTop: "30px" }}>
          <TextArea
            onChange={handleChangeComment}
            value={comment}
            label="Добавьте свой комментарий"
          />
          <Button
            text="Добавить"
            style={{ margin: "15px 0 0 auto", display: "flex" }}
            onClick={handleAddComment}
          />
        </form>
      </div>
    </>
  );
};

export default Article;
