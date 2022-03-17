import { CSSProperties } from "react";

const ActiveStylesPage = () => {
  return (
    <div style={{ ...root }}>
      This is the Active Styles page
    </div>
  );
};

export default ActiveStylesPage;

const root: CSSProperties = {
  margin: 20,
};
