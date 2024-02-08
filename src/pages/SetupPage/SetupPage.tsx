import React, { useEffect } from "react";
import { Button, Divider, FlexboxGrid, Steps } from "rsuite";
import Welcome from "../../components/Steps/Welcome/Welcome.component";
import ProjectType from "../../components/Steps/ProjectType/ProjectType.component";
import UserCreation from "../../components/Steps/UserCreation/UserCreation.component";
import DatabaseSetup from "../../components/Steps/Database/DatabaseSetup.component";
import ImportTemplate from "../../components/Steps/ImportTemplate/ImportTemplate.component";
import FromTemplate from "../../components/Steps/FromTemplate/FromTemplate.component";
import defaultValues from "./defaultValues";
import { ISetupValues } from "./SetupValues.interfaace";
import validator from "./validatror";
import { useNotification } from "@eco-flow/components-lib";

export default function SetupPage() {
  const [step, setStep] = React.useState(0);
  const [value, setValue] = React.useState<ISetupValues>(defaultValues);
  const [error, setError] = React.useState<{
    errorHeader?: String;
    errorMessage?: string;
  }>({});
  const [loadingDatabaseConfig, setLoadingDatabaseConfig] =
    React.useState(false);

  useEffect(() => {
    if (error.errorMessage) errorNotification.show();
  }, [error]);

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

  const errorNotification = useNotification({
    header: error.errorHeader ? error.errorHeader : "",
    type: "error",
    placement: "topEnd",
    children: <>{error.errorMessage ? error.errorMessage : ""}</>,
  });

  const onNext = () =>
    validator(step, value, setError, onChange, setLoadingDatabaseConfig);
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
          loading={loadingDatabaseConfig}
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
