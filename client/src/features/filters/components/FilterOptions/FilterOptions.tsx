import styles from "./FilterOptions.module.scss";
import { useFiltersStore } from "../../stores/filterStore";
import { todoFilterOptions } from "./filterOptions.config";
import { Button } from "@/shared/components";

export const FilterOptions = () => {
  const filters = useFiltersStore((s) => s.filters);
  const setFilters = useFiltersStore((s) => s.setFilters);

  return (
    <div className={styles.filters}>
      {todoFilterOptions.map(({ filter }) => (
        <Button
          key={filter}
          variant="selectable"
          isSelected={filters === filter}
          onClick={() => setFilters(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};
