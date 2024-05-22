import { useEffect, useState } from "react";
import { Button, Divider, FlexboxGrid, Steps } from "rsuite";
import Welcome from "../../components/Steps/Welcome/Welcome.component";
import ProjectType from "../../components/Steps/ProjectType/ProjectType.component";
import UserCreation from "../../components/Steps/UserCreation/UserCreation.component";
import DatabaseSetup from "../../components/Steps/Database/DatabaseSetup.component";
import ImportTemplate from "../../components/Steps/ImportTemplate/ImportTemplate.component";
import FromTemplate from "../../components/Steps/FromTemplate/FromTemplate.component";
import defaultValues from "./defaultValues";
import { ISetupValues } from "./SetupValues.interface";
import validator from "./validatror";
import Finish from "../../components/Steps/Finish/Finish.component";
import processSetup from "../../service/setup/processSetup";
import { ApiResponse } from "@ecoflow/types";
import { useAtom } from "jotai";
import { isClosedServer, isRestartingServer } from "../../store/server.store";
import isServerOnline from "../../service/server/isServerOnline.service";
import {
  errorNotification,
  successNotification,
} from "../../store/notification.store";

export default function SetupPage() {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState<ISetupValues>(defaultValues);
  const [error, setError] = useState<{
    errorHeader?: string;
    errorMessage?: string;
  }>({});
  const [loadingDatabaseConfig, setLoadingDatabaseConfig] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({});
  const [processingStep, setProcessingStep] = useState(false);

  const [_restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [_clsoeServer, setCloseServer] = useAtom(isClosedServer);

  const setSuccessNotification = useAtom(successNotification)[1];
  const setErrorNotification = useAtom(errorNotification)[1];

  useEffect(() => {
    if (error.errorMessage)
      setErrorNotification({
        show: true,
        header: error.errorHeader,
        message: error.errorMessage,
      });
  }, [error]);

  useEffect(() => {
    setProcessingStep(false);
    if (response.error) {
      setProcessingStep(false);
      setErrorNotification({
        show: true,
        header: "Error while processing your request",
        message: response.payload,
      });
    }
    if (response.success) {
      setSuccessNotification({
        show: true,
        header: "Successful",
        message: response.success
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
          : "",
      });
      setProcessingStep(true);
      // setProcessingStep(false);
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

  const onNext = () =>
    validator(step, value, setError, stepChange, setLoadingDatabaseConfig);
  const onPrevious = () => stepChange(step - 1);
  const onFinish = () => {
    setProcessingStep(true);
    processSetup(value).then(setResponse);
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
      {step === 4 && value.projectType === "blank" ? (
        <Finish value={value} />
      ) : step === 3 &&
        (value.projectType === "import" || value.projectType === "template") ? (
        <Finish value={value} />
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
          loading={loadingDatabaseConfig || processingStep}
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
