import { Container, Content, Header } from "rsuite";
import DashboardHeader from "../../components/Dashboard/header/Header.component";
import DashboardContents from "../../components/Dashboard/content/Contents.component";
import Footer from "../../components/Footer/Footer";

export default function Dashboard() {
  return (
    <>
      <Container style={{ height: "100vh" }}>
        <Header>
          <DashboardHeader />
        </Header>
        <Content>
          <DashboardContents />
        </Content>
        <Footer />
      </Container>
    </>
  );
}
