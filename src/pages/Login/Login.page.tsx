import { Content, FlexboxGrid } from "rsuite";
import Footer from "../../components/Footer/Footer";
import LoginPanel from "../../components/Login/LoginPanel/LoginPanel.component";

export default function LoginPage() {
  return (
    <>
      <Content style={{ position: "relative" }}>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{
            paddingTop: "15%",
          }}
        >
          <FlexboxGrid.Item>
            <LoginPanel />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer />
    </>
  );
}
