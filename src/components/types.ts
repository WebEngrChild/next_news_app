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
        // conditionsという配列の一要素（実態はオブジェクト）。配列なので複数可能。明示的に名前付しているだけ。
        conditions: {
          main: string;
          icon: string;
        }
      ];
    };

    
    daily: [
      // dateという配列の一要素（実態はオブジェクト）。配列なので複数可能。明示的に名前付しているだけ。
      date: {
        dt: number;
        clouds: number;
        temp: {
          min: number;
          max: number;
        };
        weather: [
          // conditionsという配列の一要素（実態はオブジェクト）。配列なので複数可能。明示的に名前付しているだけ。
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