import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Col, Divider, FlexboxGrid, List, Panel, Text } from "rsuite";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../../../utils/socket.io/socket.io";
import { ISetupValues } from "../../../../pages/SetupPage/SetupValues.interface";
import { SetupImportStatus } from "@ecoflow/types";
import SetupLoading from "../../../Loading/SetupLoading.component";
import { IconWrapper } from "@ecoflow/components-lib";
import { FaCircleCheck } from "react-icons/fa6";
import { GoXCircleFill } from "react-icons/go";

interface ImportSetupProps {
  value?: ISetupValues;
}

export default function ImportSetup({ value }: ImportSetupProps) {
  const rightPanelRef = useRef(null);
  const leftPanelRef = useRef(null);
  const [rightPanelHeight, setRightPanelHeight] = useState(0);
  const [leftPanelHeight, setLeftPanelHeight] = useState(0);
  const [setupStatus, setSetupStatus] = useState<SetupImportStatus>();

  const handleHeight = () => {
    if (rightPanelRef !== null && leftPanelRef !== null)
      if (
        (rightPanelRef.current as any).clientHeight >
        (leftPanelRef.current as any).clientHeight
      ) {
        setLeftPanelHeight((rightPanelRef.current as any).clientHeight);
        setRightPanelHeight((rightPanelRef.current as any).clientHeight);
      } else {
        setLeftPanelHeight((leftPanelRef.current as any).clientHeight);
        setRightPanelHeight((leftPanelRef.current as any).clientHeight);
      }
  };

  useLayoutEffect(() => {
    const IO = connectSocketIO();

    IO.on("importFileSetup", setSetupStatus);

    return disconnectSocketIO(IO);
  }, []);

  useEffect(handleHeight, [leftPanelRef, rightPanelRef]);

  return (
    <>
      <Col xs={12}>
        <Panel
          header="Import File Details :-"
          bordered
          ref={leftPanelRef}
          style={{
            height: leftPanelHeight > 0 ? leftPanelHeight : "auto",
          }}
        >
          <FlexboxGrid justify="space-between" align="middle">
            <FlexboxGrid.Item>Import File :-</FlexboxGrid.Item>
            <FlexboxGrid.Item>
              {value?.importFile ? value.importFile[0].name : ""}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </Col>
      <Col xs={12}>
        <Panel
          header="Import Details :-"
          bordered
          ref={rightPanelRef}
          style={{
            height: rightPanelHeight > 0 ? rightPanelHeight : "auto",
          }}
        >
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>Files To Be Imported</FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <List bordered>
            <List.Item style={{ backgroundColor: "#1e1e1e" }}>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>
                  1.Environment Configurations
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {setupStatus ? (
                    setupStatus.envs === "init" ? (
                      <SetupLoading />
                    ) : setupStatus.envs === "success" ? (
                      <Text color="green">
                        <IconWrapper icon={FaCircleCheck} />
                      </Text>
                    ) : (
                      <Text color="red">
                        <IconWrapper icon={GoXCircleFill} />
                      </Text>
                    )
                  ) : (
                    ""
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
            <List.Item style={{ backgroundColor: "#1e1e1e" }}>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>2.Server Configurations</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {setupStatus ? (
                    setupStatus.config === "init" ? (
                      <SetupLoading />
                    ) : setupStatus.config === "success" ? (
                      <Text color="green">
                        <IconWrapper icon={FaCircleCheck} />
                      </Text>
                    ) : (
                      <Text color="red">
                        <IconWrapper icon={GoXCircleFill} />
                      </Text>
                    )
                  ) : (
                    ""
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
            <List.Item style={{ backgroundColor: "#1e1e1e" }}>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>3.Users Configurations</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {setupStatus ? (
                    setupStatus.users === "init" ? (
                      <SetupLoading />
                    ) : setupStatus.users === "success" ? (
                      <Text color="green">
                        <IconWrapper icon={FaCircleCheck} />
                      </Text>
                    ) : (
                      <Text color="red">
                        <IconWrapper icon={GoXCircleFill} />
                      </Text>
                    )
                  ) : (
                    ""
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
            <List.Item style={{ backgroundColor: "#1e1e1e" }}>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>4.Installed Packages</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {setupStatus ? (
                    setupStatus.packages === "init" ? (
                      <SetupLoading />
                    ) : setupStatus.packages === "success" ? (
                      <Text color="green">
                        <IconWrapper icon={FaCircleCheck} />
                      </Text>
                    ) : (
                      <Text color="red">
                        <IconWrapper icon={GoXCircleFill} />
                      </Text>
                    )
                  ) : (
                    ""
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
            <List.Item style={{ backgroundColor: "#1e1e1e" }}>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>5.Database Connections</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {setupStatus ? (
                    setupStatus.databases === "init" ? (
                      <SetupLoading />
                    ) : setupStatus.databases === "success" ? (
                      <Text color="green">
                        <IconWrapper icon={FaCircleCheck} />
                      </Text>
                    ) : (
                      <Text color="red">
                        <IconWrapper icon={GoXCircleFill} />
                      </Text>
                    )
                  ) : (
                    ""
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
            <List.Item style={{ backgroundColor: "#1e1e1e" }}>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>6.Flow Schematic</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {setupStatus ? (
                    setupStatus.flowSchematic === "init" ? (
                      <SetupLoading />
                    ) : setupStatus.flowSchematic === "success" ? (
                      <Text color="green">
                        <IconWrapper icon={FaCircleCheck} />
                      </Text>
                    ) : (
                      <Text color="red">
                        <IconWrapper icon={GoXCircleFill} />
                      </Text>
                    )
                  ) : (
                    ""
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          </List>
        </Panel>
      </Col>
    </>
  );
}
