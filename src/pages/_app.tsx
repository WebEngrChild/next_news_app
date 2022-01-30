// グローバルなCSS(全ページ共通)定義を読み込む
import '../styles/globals.scss'

// 全ページ共通の初期化
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp