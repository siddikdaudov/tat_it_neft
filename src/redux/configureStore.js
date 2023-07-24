import { combineReducers, createStore } from "redux";
import articles from "./features/articles";
import editableArticle from "./features/editableArticle";

export const store = createStore(
  combineReducers({
    articles,
    editableArticle,
  })
);
