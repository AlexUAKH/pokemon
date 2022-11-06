import { FC, useMemo } from "react";

interface TypesFilterItemProps {
  name: string;
  active?: boolean;
  check: (name: string) => void;
}

const TypesFilterItem: FC<TypesFilterItemProps> = ({
  name,
  active = false,
  check,
}) => {
  const classes = useMemo(
    () => ["type-filter__item", active ? "active" : ""].join(" "),
    [active]
  );

  return (
    <div className={classes} onClick={() => check(name)}>
      {name}
    </div>
  );
};

export default TypesFilterItem;
