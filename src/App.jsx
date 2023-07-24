import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleList from "./routes/ArticleList";
import Article from "./routes/Article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ArticleList />,
  },
  {
    path: "/:id",
    element: <Article />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
