import { FormEvent, useState } from "react";
import { Button, FlexboxGrid, Form, Panel } from "rsuite";
import { GrLogin, GrUserManager } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { IconWrapper } from "@ecoflow/components-lib";
import InputGroupWrapper from "./InputGroupWrapper";
import { RiLockPasswordLine } from "react-icons/ri";
import submitHandler from "./submitHandler";
import initStatusState, { isLoggedIn } from "../../store/initStatusState.store";
import { useAtom, useSetAtom } from "jotai";
import { errorNotification } from "../../store/notification.store";
import defaultLoginParams from "../../defaults/defaultLoginParams.default";
import "./style.less";

export default function LoginPanel() {
  const [isProcessing, setProcessing] = useState(false);
  const [initStatus, setinitStatus] = useAtom(initStatusState);
  const [_loggedIn, setLoggedIn] = useAtom(isLoggedIn);

  const setErrorNotification = useSetAtom(errorNotification);

  const handelFormSubmit = (
    formValue: Record<"username" | "password", string>
  ) => {
    submitHandler(formValue).then(
      ({ user }) => {
        setProcessing(false);
        setinitStatus({
          ...initStatus,
          isLoggedIn: true,
          userID: user,
        });
        setLoggedIn(true);
      },
      (reject) => {
        setProcessing(false);
        setErrorNotification({
          show: true,
          header: "Sign in error",
          message: reject,
        });
      }
    );
  };

  return (
    <>
      <Panel shaded bordered style={{ minWidth: 450, height: "min-content" }}>
        <div className="adminIcon">
          <p>
            <IconWrapper icon={GrUserManager} />
          </p>
          <h3>ADMIN PANEL</h3>
          <small>Control Panel Log In</small>
        </div>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ flexDirection: "column", paddingBottom: "5rem" }}
        >
          <Form
            formDefaultValue={defaultLoginParams}
            onSubmit={(
              formValue: Record<"username" | "password", string> | null,
              event?: FormEvent<HTMLFormElement>
            ) => {
              setProcessing(true);
              event?.preventDefault();
              if (formValue) handelFormSubmit(formValue);
            }}
          >
            <Form.Group>
              <Form.Control
                name="username"
                accepter={InputGroupWrapper}
                icon={FaRegUser}
                disabled={isProcessing}
                placeholder="Username"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password"
                accepter={InputGroupWrapper}
                isPassword={true}
                icon={RiLockPasswordLine}
                disabled={isProcessing}
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Button
                disabled={isProcessing}
                loading={isProcessing}
                type="submit"
                style={{ width: 290 }}
                appearance="primary"
                endIcon={<IconWrapper icon={GrLogin} />}
              >
                Sign in
              </Button>
            </Form.Group>
          </Form>
        </FlexboxGrid>
      </Panel>
    </>
  );
}
