import { Col, Container, Content, FlexboxGrid, Panel } from "rsuite";
import SetupPage from "../../pages/SetupPage/SetupPage";
import { useLayoutEffect } from "react";

export default function SetupLayout() {
  useLayoutEffect(() => {
    document.title = "EcoFlow Set-up";
  }, []);
  return (
    <Container>
      <Content>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100vh" }}
        >
          <FlexboxGrid.Item
            as={Col}
            xs={24}
            sm={24}
            style={{ padding: "30px 0", maxWidth: 850 }}
          >
            <Panel bordered shaded>
              <SetupPage />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}
