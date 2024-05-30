import { Content } from "rsuite";
import Footer from "../../components/Footer/Footer";
import LoginPanel from "../../components/LoginPanel/LoginPanel.component";

export default function LoginPage() {
  return (
    <>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 0",
        }}
      >
        <LoginPanel />
      </Content>
      <Footer />
    </>
  );
}
