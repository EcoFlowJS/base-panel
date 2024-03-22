import { FlexboxGrid, IconButton, IconButtonProps } from "rsuite";
import { Link, LinkProps } from "react-router-dom";

interface DashboardButtonProps extends IconButtonProps {
  labletext?: string;
  linkProps?: LinkProps;
}

export default function Button({
  labletext,
  disabled,
  linkProps = {
    to: "",
  },
  ...props
}: DashboardButtonProps) {
  return (
    <>
      {disabled ? (
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{
            flexDirection: "column",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <FlexboxGrid.Item>
            <IconButton {...props} disabled={disabled} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item style={{ padding: "1rem" }}>
            <strong>
              <span>{labletext}</span>
            </strong>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      ) : (
        <Link {...linkProps}>
          <FlexboxGrid
            justify="center"
            align="middle"
            style={{
              flexDirection: "column",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            <FlexboxGrid.Item>
              <IconButton {...props} disabled={disabled} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              style={{
                padding: "1rem",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              <strong>
                <span>{labletext}</span>
              </strong>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Link>
      )}
    </>
  );
}
