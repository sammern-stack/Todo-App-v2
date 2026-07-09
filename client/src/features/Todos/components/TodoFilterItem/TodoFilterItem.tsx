import styles from "./TodoFilterItem.module.scss";
import { type Filter, useTodosStore } from "@/stores/useTodosStore";

export const TodoFilterItem = ({ label }: { label: Filter }) => {
  const filter = useTodosStore((s) => s.filter);
  const setFilter = useTodosStore((s) => s.setFilter);

  const handleSelectFilter = () => setFilter(label);

  const filterClasses = [
    styles.filter,
    filter === label ? styles["filter--active"] : "",
  ].join(" ");

  return (
    <button className={filterClasses} onClick={handleSelectFilter}>
      {label}
    </button>
  );
};
