import React from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  FlexboxGrid,
  Panel,
  Placeholder,
  Steps,
} from "rsuite";
import Welcome from "../../components/Steps/Welcome/Welcome";
import ProjectType from "../../components/Steps/ProjectType/ProjectType";
import UserCreation from "../../components/Steps/UserCreation/UserCreation";
import DatabaseSetup from "../../components/Steps/Database/DatabaseSetup";

export default function SetupPage() {
  const [step, setStep] = React.useState(0);
  const onChange = (nextStep: number) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);
  const onFinish = () => {
    alert("Finish!");
  };

  return (
    <div>
      <Steps current={step}>
        <Steps.Item title="Welcome" />
        <Steps.Item title="Project Type" />
        <Steps.Item title="User Creation" />
        <Steps.Item title="Database" />
      </Steps>
      <Divider />

      {step === 0 ? <Welcome /> : <></>}
      {step === 1 ? <ProjectType /> : <></>}
      {step === 2 ? <UserCreation /> : <></>}
      {step === 3 ? <DatabaseSetup /> : <></>}
      <Divider />
      <FlexboxGrid justify="space-between">
        <Button
          onClick={onPrevious}
          disabled={step === 0}
          style={{ minWidth: 80 }}
        >
          Previous
        </Button>
        <Button
          onClick={step === 3 ? onFinish : onNext}
          appearance={step === 3 ? "primary" : "default"}
          color="green"
          style={{ minWidth: 80 }}
        >
          {step === 3 ? "Finish" : "Next"}
        </Button>
      </FlexboxGrid>
    </div>
  );
}
