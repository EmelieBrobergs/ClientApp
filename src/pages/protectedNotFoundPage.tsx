import React, { CSSProperties } from "react";


export default function ProtectedNotFoundPage() {
  // TODO: Complete this page, Page used for testing of code now

  // const articles: readonly IArticle[] = useSelector(
  //   (state: ArticleState) => state.articles,O
  //   shallowEqual
  // );

  // const dispatch: Dispatch<any> = useDispatch();

  // const saveArticle = React.useCallback(
  //   (article: IArticle) => dispatch(addArticle(article)),
  //   [dispatch]
  // );
  return (
    <div style={{ ...root }}>
      <h3>Protected / sidan hittades inte som inloggad / gör ngt smart</h3>
      {/* <h1>My Articles</h1>
      <div>
        <AddArticle saveArticle={saveArticle} />
        {articles.map((article: IArticle) => (
          <Article
            key={article.id}
            article={article}
            removeArticle={removeArticle}
          />
        ))}
      </div> */}
    </div>
  );
}

const root: CSSProperties = {
  margin: 20,
};
