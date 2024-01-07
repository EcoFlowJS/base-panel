import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FlexboxGrid, Stack } from "rsuite";
import { RiAdminLine } from "react-icons/ri";
import { BsDatabaseFill } from "react-icons/bs";
import { TbBinaryTree2 } from "react-icons/tb";
import styles from "./style";
import Button from "./button/Button";

export default function DashboardContents() {
  return (
    <FlexboxGrid
      justify="center"
      align="middle"
      style={styles.FlexBoxDirection}
    >
      <FlexboxGrid.Item style={{ ...styles.Paddings, ...styles.LogoFontSize }}>
        <MdOutlineDashboardCustomize />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item style={styles.Paddings}>
        <h2>Dashboard</h2>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Stack spacing={20} style={{ paddingTop: "6rem" }}>
          <Button
            appearance="primary"
            icon={<RiAdminLine />}
            labletext="Admin Panel"
            style={styles.IconButton}
            circle
          />
          <Button
            color="orange"
            appearance="primary"
            icon={<BsDatabaseFill />}
            labletext="Schema Panel"
            style={styles.IconButton}
            circle
          />
          <Button
            color="yellow"
            appearance="primary"
            icon={<TbBinaryTree2 />}
            style={{ ...styles.IconButton, rotate: "-90deg" }}
            circle
            labletext="Flow Panel"
          />
        </Stack>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
