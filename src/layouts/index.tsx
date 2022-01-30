import Header from "../components/header"
import styles from "./index.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

//親のHomeからコンポーネントが引数として渡される
function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {/* componentsのスタイルを'classname=hoge'で設定 */}
      {/* 親から受けたコンポーネントを{children}の形で引き受ける */}
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default MainLayout;