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
            height: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
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
