import { Panel } from "rsuite";
import StepHeader from "../Header/StepHeader.component";

export default function Welcome() {
  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Welcome to EcoFlow."
          HeaderDescription="Please complete initial setup process and start deploying apis."
        />
      }
    >
      <div>Welcome</div>
    </Panel>
  );
}
