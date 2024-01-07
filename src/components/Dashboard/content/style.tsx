import { CSSProperties } from "react";

interface Style {
  Paddings: CSSProperties;
  LogoFontSize: CSSProperties;
  FlexBoxDirection: CSSProperties;
  IconButton: CSSProperties;
}

const styles: Style = {
  Paddings: { paddingTop: "1.8rem" },
  LogoFontSize: { fontSize: "3rem" },
  FlexBoxDirection: { flexDirection: "column" },
  IconButton: {
    width: "5.5rem",
    height: "5.5rem",
    fontSize: "2.4rem",
  },
};

export default styles;
