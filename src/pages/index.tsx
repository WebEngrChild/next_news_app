import Head from 'next/head'
import MainLayout from '../layouts'

// APIKEYを取得
const API_KEY = process.env.NEWS_API_KEY

export default function Home(props) {
  // 記事を取得できているか確認
  console.log(props.topArticles)
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
    </MainLayout>
  )
}


export const getStaticProps = async () => {
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
    revalidate: 60 * 10,
  };
};
