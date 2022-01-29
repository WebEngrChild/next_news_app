import Header from "../components/header"
import styles from "./index.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {/* componentsのスタイルを'classname=hoge'で設定 */}
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default MainLayout;