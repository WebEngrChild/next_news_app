import Head from "next/head";
import { useRouter } from "next/router";
import Article from '../../components/article'
import Nav from '../../components/nav'
import MainLayout from "../../layouts/index";
import styles from "../../styles/Home.module.scss";
// 【各トピックスにアクセスされた際のページ】
// ①Pathにアクセスされた際のビルド設定：
export async function getStaticPaths() {
  return {
    // 動的ルートを使用するページ([id].tsx等)でISRを利用する際はpathには空配列を渡す
    // 都度ビルドのISR設定（revalidate）したとしてもpathに渡されたパスには全ビルドのSSGが走る
    paths: [],
    fallback: true,
  };
}

// ②Pathにアクセスされた際のデータ取得設定：
export async function getStaticProps({ params }) {
  // Paramsには/topics/[id].tsxが入ってくるex./topix/business
  // params.idで取得できるex.params.id = business
  const API_KEY = process.env.NEWS_API_KEY
  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=${API_KEY}`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    // propsにfetchしたデータを渡す
    props: { topicArticles, title },
    // ISR設定
    revalidate: 60 * 10,
  };
}

// ③レンダリング設定
function Topic(props) {
  // 事前ビルドしていないページのアクセスの際はrouter.isFallbackがtrue
  // レンダリング中は404を表示させずにfall backページを表示
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // 取得したPropsを元にコンポーネントを表示
  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav} >
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} style={{marginRight:"10%"}}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Topic;