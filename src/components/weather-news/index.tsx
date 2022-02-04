import Image from "next/image";
import styles from "../weather-news/index.module.scss";
import Link from "next/link";
import Props from "../types";

// 日曜日のindexを0として順に格納
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 関数コンポーネント
// types.tsのweatherNewsが渡される
const WeatherNews: React.FC<Props> = ({ weatherNews }) => {
  const currentWeatherMain = weatherNews.current.weather[0].main // clouds
  const currentWeatherTemp = weatherNews.current.temp // 4.73
  const currentWeatherIcon = weatherNews.current.weather[0].icon.slice(0, 2) + "d"; // 04d ※api側でフリー素材

  return (
    <section className={styles.weather}>
      <h1>Tokyo</h1>
      <div className={styles.weather__main}>
        <div className={styles.weather__top}>
          <div className={styles.weather__heading}>
            <a>{currentWeatherMain}</a>
            <p>
              {currentWeatherTemp.toString().slice(0, 1)}
              <span>˚c</span>
            </p>
          </div>
          <Image
            className={styles.weather__icon}
            src={`/img/weatherIcons/${currentWeatherIcon}.png`}
            alt="Tokyo's weather icon"
            loading="eager"
            width={52}
            height={52}
            priority
          />
        </div>
        <div className={styles.weather__weekly}>
          <ul className={styles.weather__weekly__list}>
            {weatherNews.daily.map((date, index) => {
              // new Date(1970年1月1日(UTC)からのミリ秒に変換)
              // 1643767200 -> Wed Feb 02 2022 11:00:00 GMT+0900 (日本標準時)
              const time = new Date(date.dt * 1000); 

              // getdayで曜日を数値で取得 -> 数値がweek関数の順番に適応
              // 3
              let day = week[time.getDay()];
              // new Date()で本日の日付を取得
              const nowDay = week[(new Date()).getDay()];
              if (day ==  nowDay) {
                day = "Today"
              }

              // 4日分のみの表示のため早期リターン
              if (index > 4) {
                return;
              }

              return (
                <li key={index}>
                  <p>{day}</p>
                  <span>
                    <Image
                      src={`/img/weatherIcons/${date.weather[0].icon}.png`}
                      className={styles.weatehr__icon}
                      alt={`${day}'s weather icon`}
                      loading="eager"
                      width={41}
                      height={41}
                      priority
                    />
                  </span>
                  <div className={styles.weather__temp}>
                    <p className={styles.weather__temp__high}>
                      {/* 日本に合わせた文字列に変換->文字列を10進数に変換 */}
                      {/* "9.65" -> 9 ※少数点切り捨てに使用しているが非推奨 */}
                      {parseInt(date.temp.max.toLocaleString(), 10)}˚c
                    </p>
                    <p className={styles.weather__temp__low}>
                      {parseInt(date.temp.min.toLocaleString(), 10)}˚c
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.weather__bottom}>
          <Link href="https://weathernews.jp/onebox/">
            <a target="_blank" rel="noopener">
              ウェザーニュース
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeatherNews;