import { PageBackground } from "../PageBackground/PageBackground";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export const PageLayout = ({ className, children }: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <PageBackground />
      <div className={`${styles.pageLayout__content} ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
};
