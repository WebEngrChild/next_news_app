type Props = {
  articles?: [
    // articleという要素（実態はオブジェクト）。配列なので複数可能。
    article: {
      author: string;
      title: string;
      publishedAt: string;
      url: string;
      urlToImage: string;
    }
  ];

  title?: string;
  
  weatherNews?: {
    current: {
      temp: number;
      clouds: number;
      weather: [
        // conditionsという要素（実態はオブジェクト）
        conditions: {
          main: string;
          icon: string;
        }
      ];
    };
    daily: [
      // 配列に格納されるそれぞれの要素はdateという名前（実態はオブジェクト）
      // dateはkey => value型ではなく単なる配列の一要素
      // 連想配列の場合であれば{ key => value }
      date: {
        dt: number;
        clouds: number;
        temp: {
          min: number;
          max: number;
        };
        weather: [
          // conditionsという要素（実態はオブジェクト）。配列なので複数可能。
          conditions: {
            id: number;
            icon: string;
          }
        ];
      }
    ];
  };
};

export default Props