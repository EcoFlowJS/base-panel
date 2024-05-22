import { useEffect, useRef, useState } from "react";
import { Col, Divider, FlexboxGrid, List, Panel } from "rsuite";
import { ISetupValues } from "../../../../pages/SetupPage/SetupValues.interface";

interface TemplateSetupProps {
  value?: ISetupValues;
}

export default function TemplateSetup({ value }: TemplateSetupProps) {
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
              {value?.templateURL ? value.templateURL : ""}
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
  );
}
