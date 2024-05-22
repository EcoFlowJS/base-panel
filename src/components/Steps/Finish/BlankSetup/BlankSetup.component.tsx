import { Col, Divider, FlexboxGrid, Panel, Toggle } from "rsuite";
import { ISetupValues } from "../../../../pages/SetupPage/SetupValues.interface";
import { useEffect, useRef, useState } from "react";

interface BlankSetupProps {
  value?: ISetupValues;
}

export default function BlankSetup({ value }: BlankSetupProps) {
  const rightPanelRef = useRef(null);
  const leftPanelRef = useRef(null);
  const [rightPanelHeight, setRightPanelHeight] = useState(0);
  const [leftPanelHeight, setLeftPanelHeight] = useState(0);

  useEffect(() => {
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
  }, [leftPanelRef, rightPanelRef]);
  return (
    <>
      <Col xs={12}>
        <Panel
          header="Database Details :-"
          bordered
          ref={leftPanelRef}
          style={{
            height: leftPanelHeight > 0 ? leftPanelHeight : "auto",
          }}
        >
          {value && value.database.useDefault ? (
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>Driver:-</FlexboxGrid.Item>
              <FlexboxGrid.Item>Default EcoFlow Driver</FlexboxGrid.Item>
            </FlexboxGrid>
          ) : (
            <>
              <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item>Driver:-</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {value?.database.databaseDriver}
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <Divider />

              {value && value.database.databaseDriver === "MongoDB" ? (
                <>
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Connection:-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.envMongoConnectionString
                        ? `env(${value.database.databaseConfigurationConnectionString})`
                        : value.database.databaseConfigurationConnectionString}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </>
              ) : value &&
                (value.database.databaseDriver === "MySQL" ||
                  value.database.databaseDriver === "PostgreSQL") ? (
                <>
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Host :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.databaseConfigurationHost}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider />
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Port :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.databaseConfigurationPort}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider />
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>User :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.envUsername
                        ? `env(${value.database.databaseConfigurationUser})`
                        : value.database.databaseConfigurationUser}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider />
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Password :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.envPassword
                        ? `env(${value.database.databaseConfigurationPassword})`
                        : "*****"}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider />
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Database :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.envDatabase
                        ? `env(${value.database.databaseConfigurationDatabase})`
                        : value.database.databaseConfigurationDatabase}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider />
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>SSL :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.databaseConfigurationSsl ? (
                        <Toggle
                          defaultChecked={
                            value.database.databaseConfigurationSsl
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </>
              ) : value && value.database.databaseDriver === "Sqlite" ? (
                <>
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Connection:-</FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ wordWrap: "break-word" }}>
                      {value.database.databaseConfigurationFilename}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </Panel>
      </Col>
      <Col xs={12}>
        <Panel
          header="User Credentials :-"
          bordered
          ref={rightPanelRef}
          style={{
            height: rightPanelHeight > 0 ? rightPanelHeight : "auto",
          }}
        >
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>Name :</FlexboxGrid.Item>
            <FlexboxGrid.Item>{value?.userInfo.name || ""}</FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>Username :</FlexboxGrid.Item>
            <FlexboxGrid.Item>
              {value?.userInfo.username || ""}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>Password :</FlexboxGrid.Item>
            <FlexboxGrid.Item>*****</FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>Email :</FlexboxGrid.Item>
            <FlexboxGrid.Item>{value?.userInfo.email || ""}</FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </Col>
    </>
  );
}
