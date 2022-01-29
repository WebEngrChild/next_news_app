import styles from "./index.module.scss";
// 日付を扱うためのmomentライブラリをインポート
import moment from "moment";
import Props from "../types";

// Reactの関数コンポーネントを型定義<引数の型定義＝props型>を示している
const Article: React.FC<Props> = ({ articles, title }) => {
  return (
    <section className={styles.article}>
      <div className={styles.article__heading}>
        <h1>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</h1>
      </div>
      {articles.map((article, index) => {
        const time = moment(article.publishedAt || moment.now()) // モーメントオブジェクトが返される
          .fromNow() // OO時間前等がざっくり返される
          .slice(0, 1); // 数値のみを取得
        return (
          <a href={article.url} key={index} target="_blank" rel="noopener">
            <article className={styles.article__main}>
              <div className={styles.article__title}>
                <p>{article.title}</p>
                <p className={styles.article__time}>
                  {time}
                  時間前
                </p>
              </div>
              {/* &&条件でtrueの時のみ表示させている */}
              {article.urlToImage && (
                <img
                  key={index}
                  src={article.urlToImage}
                  className={styles.article__img}
                  alt={`${article.title} image`}
                />
              )}
            </article>
          </a>
        );
      })}
    </section>
  );
};

export default Article;