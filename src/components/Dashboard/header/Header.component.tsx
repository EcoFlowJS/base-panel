import { useAtom } from "jotai";
import { CiDark, CiLight } from "react-icons/ci";
import {
  Divider,
  FlexboxGrid,
  IconButton,
  Panel,
  Tooltip,
  Whisper,
} from "rsuite";
import themeMode from "../../../store/theme.mode";
import { LuLogOut } from "react-icons/lu";
import styles from "./style";
import initStatusState, {
  isLoggedOut,
} from "../../../store/initStatusState.store";
import { IconWrapper } from "@ecoflow/components-lib";
import logoutHandler from "./logoutHaandler";

export default function DashboardHeader() {
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const [initStatus] = useAtom(initStatusState);
  const [_loggedOut, setLogOut] = useAtom(isLoggedOut);

  const toogleMode = () => setDarkMode(!darkMode);

  return (
    <FlexboxGrid justify="end" align="middle">
      <FlexboxGrid.Item style={{ padding: "1rem" }}>
        <Panel bordered bodyFill style={styles.ModePanel}>
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item style={styles.Modelable}>
              <span>Mode :</span>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Whisper
                placement="bottom"
                speaker={<Tooltip arrow={false}>Toggle Theme</Tooltip>}
              >
                <IconButton
                  appearance="link"
                  size="sm"
                  icon={darkMode ? <CiLight /> : <CiDark />}
                  onClick={toogleMode}
                  style={styles.ModeIcon}
                />
              </Whisper>
            </FlexboxGrid.Item>
            {initStatus.isAuth ? (
              <FlexboxGrid.Item>
                <Divider vertical />
                <Whisper
                  placement="bottom"
                  speaker={<Tooltip arrow={false}>Sign out</Tooltip>}
                >
                  <IconButton
                    appearance="link"
                    title="logout"
                    icon={<IconWrapper icon={LuLogOut} />}
                    style={styles.LogoutIcon}
                    onClick={() => logoutHandler(setLogOut)}
                  />
                </Whisper>
              </FlexboxGrid.Item>
            ) : (
              <></>
            )}
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
