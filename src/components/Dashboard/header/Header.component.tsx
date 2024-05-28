import { useAtom, useAtomValue } from "jotai";
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
import initStatusState, {
  isLoggedOut,
} from "../../../store/initStatusState.store";
import { IconWrapper } from "@ecoflow/components-lib";
import userSignoutService from "../../../service/user/userSignout.service";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ApiResponse } from "@ecoflow/types";

export default function DashboardHeader() {
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const initStatus = useAtomValue(initStatusState);
  const [_loggedOut, setLogOut] = useAtom(isLoggedOut);

  const toogleMode = () => setDarkMode(!darkMode);

  const logoutHandler = (setLogout: any) => {
    userSignoutService().then((response: ApiResponse) => {
      if (response.success) setLogout(true);
    });
  };

  return (
    <FlexboxGrid justify="end" align="middle">
      <FlexboxGrid.Item style={{ padding: "1rem" }}>
        <Panel
          bordered
          bodyFill
          style={{ padding: "0.5rem", borderWidth: "2px" }}
        >
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item>
              <Whisper
                placement="bottom"
                speaker={<Tooltip arrow={false}>Toggle Theme</Tooltip>}
              >
                <IconButton
                  appearance="link"
                  size="sm"
                  icon={
                    <IconWrapper icon={darkMode ? MdLightMode : MdDarkMode} />
                  }
                  onClick={toogleMode}
                  style={{
                    fontSize: "1.2rem",
                    padding: "0",
                    color: "var(--rs-text-primary)",
                  }}
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
                    style={{
                      fontSize: "1.2rem",
                      padding: "0",
                      color: "var(--rs-text-primary)",
                    }}
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
