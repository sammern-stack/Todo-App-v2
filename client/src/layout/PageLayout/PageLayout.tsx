import styles from "./PageLayout.module.scss";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import type { PropsWithChildren } from "react";

interface PageLayoutProps extends PropsWithChildren {
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PageLayout = ({ children, header, footer }: PageLayoutProps) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>{header ?? <Header />}</header>
      <main className={styles.layout__main}>{children}</main>
      <footer className={styles.layout__footer}>{footer ?? <Footer />}</footer>
    </div>
  );
};
