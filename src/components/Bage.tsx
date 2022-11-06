import { FC, ReactNode, useMemo } from "react";

import { colors } from "../colors";

interface BageProps {
  title?: string;
  children?: ReactNode;
}

const Bage: FC<BageProps> = ({ title = null, children = null }) => {
  const styles = useMemo(() => {
    const colorInd = Math.round(
      Math.random() * (Object.keys(colors).length - 1)
    );
    const backgroundColor = Object.values(colors)[colorInd];

    return {
      backgroundColor,
      color: "#ffffff",
    };
  }, []);

  return (
    <div className="bage" style={styles}>
      {title ? title : children ? children : null}
    </div>
  );
};

export default Bage;
