import React, { useEffect } from "react";
import { Button, Divider, FlexboxGrid, Steps } from "rsuite";
import Welcome from "../../components/Steps/Welcome/Welcome";
import ProjectType from "../../components/Steps/ProjectType/ProjectType";
import UserCreation from "../../components/Steps/UserCreation/UserCreation";
import DatabaseSetup from "../../components/Steps/Database/DatabaseSetup";
import ImportTemplate from "../../components/Steps/ImportTemplate/ImportTemplate";
import FromTemplate from "../../components/Steps/FromTemplate/FromTemplate";
import defaultValues from "./defaultValues";
import { ISetupValues } from "./SetupValues.interfaace";

export default function SetupPage() {
  const [step, setStep] = React.useState(0);
  const [value, setValue] = React.useState<ISetupValues>(defaultValues);

  useEffect(() => console.log(value), [value]);

  const onChange = (nextStep: number) => {
    setStep(
      nextStep < 0
        ? 0
        : nextStep > 3
        ? value.projectType === "blank"
          ? 4
          : 3
        : nextStep
    );
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
        {value.projectType === "blank" ? (
          <>
            <Steps.Item title="User Creation" />
            <Steps.Item title="Database" />
          </>
        ) : value.projectType === "template" ? (
          <>
            <Steps.Item title="Template" />
          </>
        ) : (
          <>
            <Steps.Item title="Import" />
          </>
        )}
        <Steps.Item title="Finish" />
      </Steps>
      <Divider />

      {step === 0 ? <Welcome /> : <></>}
      {step === 1 ? (
        <ProjectType
          defaultValue={value.projectType}
          onChange={(val) => setValue({ ...value, projectType: val })}
        />
      ) : (
        <></>
      )}
      {step === 2 && value.projectType === "blank" ? (
        <UserCreation
          defaultvalue={value.userInfo}
          onChange={(val) => setValue({ ...value, userInfo: val })}
        />
      ) : (
        <></>
      )}
      {step === 3 && value.projectType === "blank" ? (
        <DatabaseSetup
          defaultvalue={value.database}
          onChange={(val) => setValue({ ...value, database: val })}
        />
      ) : (
        <></>
      )}

      {step === 2 && value.projectType === "template" ? (
        <FromTemplate
          defaultvalue={value.templateURL}
          onChange={(val) => setValue({ ...value, ...val })}
        />
      ) : (
        <></>
      )}
      {step === 2 && value.projectType === "import" ? (
        <ImportTemplate
          defaultvalue={value.importFile}
          onChange={(val) => setValue({ ...value, ...val })}
        />
      ) : (
        <></>
      )}

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
          onClick={
            step === 4
              ? onFinish
              : step === 3 && value.projectType !== "blank"
              ? onFinish
              : onNext
          }
          appearance={
            step === 4
              ? "primary"
              : step === 3 && value.projectType !== "blank"
              ? "primary"
              : "default"
          }
          color="green"
          style={{ minWidth: 80 }}
        >
          {step === 4
            ? "Finish"
            : step === 3 && value.projectType !== "blank"
            ? "Finish"
            : "Next"}
        </Button>
      </FlexboxGrid>
    </div>
  );
}

// onSubmit={() => ImportFile(formData.uploader)}
