import { useLayoutEffect } from "react";
import { Container } from "rsuite";
import LoginPage from "../../pages/Login/Login.page";

export default function LoginLayout() {
  useLayoutEffect(() => {
    document.title = "EcoFlow: Login";
  }, []);
  return (
    <Container style={{ minHeight: "100vh" }}>
      <LoginPage />
    </Container>
  );
}
