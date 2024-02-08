import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Divider,
  FlexboxGrid,
  Grid,
  List,
  Panel,
  Row,
  Toggle,
} from "rsuite";
import StepHeader from "../Header/StepHeader.component";
import { ISetupValues } from "../../../pages/SetupPage/SetupValues.interfaace";

interface FinishProps {
  value?: ISetupValues;
}

export default function Finish({ value }: FinishProps) {
  const rightPanelRef = useRef(null);
  const leftPanelRef = useRef(null);
  const [rightPanelHeight, setrightPanelHeight] = useState(0);
  const [leftPanelHeight, setleftPanelHeight] = useState(0);

  useEffect(() => {
    if (rightPanelRef !== null && leftPanelRef !== null)
      if (
        (rightPanelRef.current as any).clientHeight >
        (leftPanelRef.current as any).clientHeight
      ) {
        setleftPanelHeight((rightPanelRef.current as any).clientHeight);
        setrightPanelHeight((rightPanelRef.current as any).clientHeight);
      } else {
        setleftPanelHeight((leftPanelRef.current as any).clientHeight);
        setrightPanelHeight((leftPanelRef.current as any).clientHeight);
      }
  }, [leftPanelRef, rightPanelRef]);

  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Finish"
          HeaderDescription="Review settings and confirm and let us make everything ready for you."
        />
      }
    >
      <Grid fluid>
        <Row>
          {value && value.projectType === "blank" ? (
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
                      <FlexboxGrid.Item>
                        Default EcoFlow Driver
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  ) : (
                    <>
                      <FlexboxGrid justify="space-between">
                        <FlexboxGrid.Item>Driver:-</FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                          {value.database.databaseDriver}
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                      <Divider />

                      {value && value.database.databaseDriver === "MongoDB" ? (
                        <>
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>Connection:-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.database.envMongoConnectionString
                                ? `env(${value.database.databaseConfigurationConnectionString})`
                                : value.database
                                    .databaseConfigurationConnectionString}
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                        </>
                      ) : value &&
                        (value.database.databaseDriver === "MySQL" ||
                          value.database.databaseDriver === "PostgreSQL") ? (
                        <>
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>Host :-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.database.databaseConfigurationHost}
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                          <Divider />
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>Port :-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.database.databaseConfigurationPort}
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                          <Divider />
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>User :-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.database.envUsername
                                ? `env(${value.database.databaseConfigurationUser})`
                                : value.database.databaseConfigurationUser}
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                          <Divider />
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>Password :-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.database.envPassword
                                ? `env(${value.database.databaseConfigurationPassword})`
                                : "*****"}
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                          <Divider />
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>Database :-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.database.envDatabase
                                ? `env(${value.database.databaseConfigurationDatabase})`
                                : value.database.databaseConfigurationDatabase}
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                          <Divider />
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>SSL :-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
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
                      ) : value &&
                        value.database.databaseDriver === "Sqlite" ? (
                        <>
                          <FlexboxGrid justify="space-between">
                            <FlexboxGrid.Item>Connection:-</FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{ wordWrap: "break-word" }}
                            >
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
                    <FlexboxGrid.Item>{value.userInfo.name}</FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider />
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Username :</FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                      {value.userInfo.username}
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
                    <FlexboxGrid.Item>{value.userInfo.email}</FlexboxGrid.Item>
                  </FlexboxGrid>
                </Panel>
              </Col>
            </>
          ) : value && value.projectType === "import" ? (
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
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Import File :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                      {value.importFile ? value.importFile[0].name : ""}
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
                      1.Installed Packages
                    </List.Item>
                    <List.Item style={{ backgroundColor: "#1e1e1e" }}>
                      2.Server Configurations
                    </List.Item>
                    <List.Item style={{ backgroundColor: "#1e1e1e" }}>
                      3.Database Connections
                    </List.Item>
                    <List.Item style={{ backgroundColor: "#1e1e1e" }}>
                      4.Flow Schematic
                    </List.Item>
                  </List>
                </Panel>
              </Col>
            </>
          ) : value && value.projectType === "template" ? (
            <>
              <Col xs={12}>
                <Panel
                  header="Template Details :-"
                  bordered
                  ref={leftPanelRef}
                  style={{
                    height: leftPanelHeight > 0 ? leftPanelHeight : "auto",
                  }}
                >
                  <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>Template URL :-</FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                      {value.templateURL ? value.templateURL : ""}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Panel>
              </Col>
              <Col xs={12}>
                <Panel
                  header="Template Import Details :-"
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
                      1.Installed Packages
                    </List.Item>
                    <List.Item style={{ backgroundColor: "#1e1e1e" }}>
                      2.Server Configurations
                    </List.Item>
                    <List.Item style={{ backgroundColor: "#1e1e1e" }}>
                      3.Database Connections
                    </List.Item>
                    <List.Item style={{ backgroundColor: "#1e1e1e" }}>
                      4.Flow Schematic
                    </List.Item>
                  </List>
                </Panel>
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Grid>
    </Panel>
  );
}
