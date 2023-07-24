const initialState = {
  articles: [
    {
      id: 1,
      title: "Очень важный заголовок",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      theme: "Дуэль",
      author: "Александр Сергеевич Пушкин",
      created_at: "24.07.2023",
      comments: [
        {
          id: 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        },
      ],
    },
    {
      id: 2,
      title: "Менее важный заголовок",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      theme: "Mortal Kombat 1",
      author: "Эд Бун",
      created_at: "22.07.2023",
      comments: [
        {
          id: 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        },
        {
          id: 2,
          text: "Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
        },
      ],
    },
  ],
  filteredArticles: [],
};

const ADD_ARTICLE = "ADD_ARTICLE";
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_ARTICLE = "UPDATE_ARTICLE";
const DELETE_ARTICLE = "DELETE_ARTICLE";
const FILTER_ARTICLES = "FILTER_ARTICLES";

export default function articles(state = initialState, action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [
          {
            id: state.articles.length
              ? state.articles.at(-1).id + state.articles[0].id + 1
              : 1,
            ...action.payload,
          },
          ...state.articles,
        ],
      };
    case ADD_COMMENT:
      const currentArticle = state.articles.find(
        (article) => article.id == action.payload.articleId
      );
      const newComment = {
        id: currentArticle.comments.length
          ? currentArticle.comments.at(-1).id +
            currentArticle.comments[0].id +
            1
          : 1,
        text: action.payload.comment,
      };
      currentArticle.comments.unshift(newComment);
      return {
        ...state,
        articles: state.articles.map((article) =>
          currentArticle.id == article.id ? currentArticle : article
        ),
      };
    case DELETE_ARTICLE:
      return {
        filteredArticles: state.filteredArticles.filter(
          (article) => article.id != action.payload
        ),
        articles: state.articles.filter(
          (article) => article.id != action.payload
        ),
      };
    case UPDATE_ARTICLE:
      return {
        filteredArticles: state.filteredArticles.map((article) =>
          action.payload.id == article.id ? action.payload : article
        ),
        articles: state.articles.map((article) =>
          action.payload.id == article.id ? action.payload : article
        ),
      };
    case FILTER_ARTICLES:
      return {
        ...state,
        filteredArticles: action.payload.filter(
          (article, index, array) =>
            index === array.findIndex((item) => item.id === article.id)
        ),
      };

    default:
      return state;
  }
}

export function addArticle(article) {
  return {
    type: ADD_ARTICLE,
    payload: article,
  };
}

export function addComment(id, comment) {
  return {
    type: ADD_COMMENT,
    payload: {
      articleId: id,
      comment,
    },
  };
}

export function updateArticle(article) {
  return {
    type: UPDATE_ARTICLE,
    payload: article,
  };
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: id,
  };
}

export function filterArticles(filterderArticles) {
  return {
    type: FILTER_ARTICLES,
    payload: filterderArticles,
  };
}
