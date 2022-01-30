// HTMLのheadタグ内に記述するためのタグ
import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'

// ビルド時に事前にデータを取得してPropsに渡す（SSG ）
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
    props: {
      topArticles,
    },
    // 指定時間以内のアクセスはISRを無視
    // SSGと異なり、全ページではなく初回アクセス時のみレンダリング、以後は差分をレンダリング
    revalidate: 60 * 10,
  };
};

export default function Home(props) {

  return (
    <MainLayout>
      {/* MainLayoutに以下コンポーネントをpropsとして渡している */}
      <Head>
        <title>Simple News</title>
      </Head>

      {/* Articleコンポーネントを追加 */}
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
      </div>
    </MainLayout>
  )
}
