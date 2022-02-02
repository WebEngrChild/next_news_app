import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
// 各コンポーネントを取得
import Article from '../components/article'
import Nav from "../components/nav";
import WeatherNews from "../components/weather-news";
import PickupArticle from "../components/pickup-article";

// 【ルートにアクセスされた際に描画されるページ】
// 関数コンポーネント：ビルド時に事前にデータを取得してPropsに渡す（SSG ）
export const getStaticProps = async () => {
  // APIKEYを取得
  const NEWS_API_KEY = process.env.NEWS_API_KEY
  const WEATHER_API_KEY = process.env.WEAHTER_API_KEY

  // ①NewsAPIのトップ記事の情報を取得
  // 取得したい記事の数
  const pageSize = 10 
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  // ②OpenWeatherMapの天気の情報を取得
  const lat = 35.4122    // 取得したい地域の緯度と経度(今回は東京)
  const lon = 139.4130
  const exclude = "hourly,minutely"   // 取得しない情報(1時間ごとの天気情報と1分間ごとの天気情報)
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${WEATHER_API_KEY}`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // ③NewsAPIのピックアップ記事の情報を取得
  const keyword = "software"   // キーワードで検索(ソフトウェア)
  const sortBy = "popularity"  // 表示順位(人気順)
  const pickupPageSize = 5     // ページサイズ(5)
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${NEWS_API_KEY}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  return {
    // SSGのfetch結果をpropsに渡す
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
    },
    // 指定時間以内のアクセスはISRを無視
    // SSGと異なり、全ページではなく初回アクセス時のみレンダリング、以後は差分をレンダリング
    revalidate: 60 * 10,
  };
};

//  関数コンポーネント：
export default function Home(props) { //getStaticPropsの結果を取得
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
        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
      </div>
    </MainLayout>
  );
}
