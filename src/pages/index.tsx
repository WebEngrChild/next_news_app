import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'
import Nav from "../components/nav";

// 関数コンポーネント：ビルド時に事前にデータを取得してPropsに渡す（SSG ）
export const getStaticProps = async () => {
  // APIKEYを取得
  const API_KEY = process.env.NEWS_API_KEY
  // 取得したい記事の数
  const pageSize = 10 
  // NewsAPIのトップ記事の情報を取得
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${API_KEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  return {
    // SSGのfetch結果をpropsに渡す
    props: {
      topArticles,
    },
    // 指定時間以内のアクセスはISRを無視
    // SSGと異なり、全ページではなく初回アクセス時のみレンダリング、以後は差分をレンダリング
    revalidate: 60 * 10,
  };
};

//  関数コンポーネント：
export default function Home(props) {
  return (
    // MainLayoutに以下コンポーネントをpropsとして渡している
    <MainLayout>
      {/* HTMLのheadタグ内に記述するためのタグ */}
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          {/* SSG/ISRでセットしたPropsを記事コンポーネントにPropsで渡す */}
          <Article title="headlines" articles={props.topArticles} />
        </div>
      </div>
    </MainLayout>
  )
}
