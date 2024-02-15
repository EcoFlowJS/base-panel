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
import Finish from "../../components/Steps/Finish/Finish.component";
import { connectSocketIO } from "../../utils/socket.io/socket.io";
import processSetup from "../../service/setup/processSetup";
import { ApiResponse } from "@eco-flow/types";
import { useAtom } from "jotai";
import { isClosedServer, isRestartingServer } from "../../store/server.store";
import isServerOnline from "../../service/server/isServerOnline.service";

export default function SetupPage() {
  const [step, setStep] = React.useState(0);
  const [value, setValue] = React.useState<ISetupValues>(defaultValues);
  const [error, setError] = React.useState<{
    errorHeader?: String;
    errorMessage?: string;
  }>({});
  const [loadingDatabaseConfig, setLoadingDatabaseConfig] =
    React.useState(false);
  const [response, setResponse] = React.useState<ApiResponse>({});
  const [processingStep, setProcessingStep] = React.useState(false);

  const [_restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [_clsoeServer, setCloseServer] = useAtom(isClosedServer);

  useEffect(() => {
    if (error.errorMessage) errorStepNotification.show();
  }, [error]);

  useEffect(() => {
    if (response.error) {
      setProcessingStep(false);
      errorProcessNotification.show();
    }
    if (response.success) {
      successProcessNotification.show();
      setProcessingStep(true);
      if (response.payload.restart)
        setTimeout(
          () => isServerOnline([setCloseServer, setRestartingServer]),
          5 * 1000
        );
    }
  }, [response]);

  const stepChange = (nextStep: number) => {
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

  const errorStepNotification = useNotification({
    header: error.errorHeader ? error.errorHeader : "",
    type: "error",
    placement: "topEnd",
    children: <>{error.errorMessage ? error.errorMessage : ""}</>,
  });

  const errorProcessNotification = useNotification({
    header: "Error while processing your request",
    type: "error",
    placement: "topEnd",
    children: <>{response.error ? response.payload : ""}</>,
  });

  const successProcessNotification = useNotification({
    header: "Successful",
    type: "success",
    placement: "topEnd",
    children: (
      <>
        {response.success
          ? Array.isArray(response.payload)
            ? response.payload.map((val, key) => {
                return (
                  <div key={key}>
                    {val}
                    <br />
                  </div>
                );
              })
            : typeof response.payload === "object"
            ? response.payload.msg
            : response.payload
          : ""}
      </>
    ),
  });

  const onNext = () =>
    validator(step, value, setError, stepChange, setLoadingDatabaseConfig);
  const onPrevious = () => stepChange(step - 1);
  const onFinish = () => processSetup(value).then(setResponse);

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
      {step === 4 && value.projectType === "blank" ? (
        <Finish value={value} onResponse={setResponse} />
      ) : step === 3 &&
        (value.projectType === "import" || value.projectType === "template") ? (
        <Finish value={value} onResponse={setResponse} />
      ) : (
        <></>
      )}

      <Divider />
      <FlexboxGrid justify="space-between">
        <Button
          onClick={onPrevious}
          disabled={processingStep || step === 0}
          style={{ minWidth: 80 }}
        >
          Previous
        </Button>
        <Button
          disabled={processingStep}
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
