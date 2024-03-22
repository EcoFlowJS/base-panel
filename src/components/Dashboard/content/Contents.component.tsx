import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FlexboxGrid, Stack } from "rsuite";
import { RiAdminLine } from "react-icons/ri";
import { BsDatabaseFill } from "react-icons/bs";
import { TbBinaryTree2 } from "react-icons/tb";
import styles from "./style";
import Button from "./button/Button";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userPermissions } from "../../../store/users.store";
import { useEffect } from "react";

export default function DashboardContents() {
  const [permissions] = useAtom(userPermissions);

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
            linkProps={{ to: { pathname: "/admin" }, target: "_parent" }}
          />
          <Button
            color="orange"
            appearance="primary"
            icon={<BsDatabaseFill />}
            labletext="Schema Panel"
            style={styles.IconButton}
            circle
            linkProps={{ to: { pathname: "/editor/schema" }, target: "_blank" }}
            disabled={!permissions.administrator && !permissions.schemaEditor}
          />
          <Button
            color="yellow"
            appearance="primary"
            icon={<TbBinaryTree2 />}
            style={{ ...styles.IconButton, rotate: "-90deg" }}
            circle
            labletext="Flow Panel"
            linkProps={{ to: { pathname: "/editor/flow" }, target: "_blank" }}
            disabled={!permissions.administrator && !permissions.flowEditor}
          />
        </Stack>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
