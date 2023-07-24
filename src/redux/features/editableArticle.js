const initialState = {
  article: {},
};

const SELECT_EDITABLE_ARTICLE = "SELECT_EDITABLE_ARTICLE";
const DELETE_EDITABLE_ARTICLE = "DELETE_EDITABLE_ARTICLE";

export default function editableArticle(state = initialState, action) {
  switch (action.type) {
    case SELECT_EDITABLE_ARTICLE:
      return {
        article: action.payload,
      };
    case DELETE_EDITABLE_ARTICLE:
      return {
        article: action.payload,
      };

    default:
      return state;
  }
}

export function selectEditableArticle(article) {
  return {
    type: SELECT_EDITABLE_ARTICLE,
    payload: article,
  };
}

export function deleteEditableArticle() {
  return {
    type: DELETE_EDITABLE_ARTICLE,
    payload: {},
  };
}
