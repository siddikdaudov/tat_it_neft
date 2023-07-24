import Comment from "./Comment";

const Comments = ({ data }) => {
  return (
    <ul>
      {data.map((comment) => (
        <li key={comment.id} style={{ marginBottom: "10px" }}>
          <Comment text={comment.text} />
        </li>
      ))}
    </ul>
  );
};

export default Comments;
