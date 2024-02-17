import React, { useEffect, useState } from "react";
import { Button, FlexboxGrid, Form, Input, InputGroup, Panel } from "rsuite";
import { GrUserManager } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { IconWrapper, useNotification } from "@eco-flow/components-lib";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import InputGroupWrapper from "./InputGroupWrapper";
import { RiLockPasswordLine } from "react-icons/ri";
import submitHandler from "./submitHandler";
import "./style.less";
import { LoignUserInterface } from "./LoignUserInterface";
import { ApiResponse } from "@eco-flow/types";
import initStatusState from "../../../store/initStatusState.store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function LoginPanel() {
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [formValue, setFormValue] = useState<LoignUserInterface>({
    username: "",
    password: "",
  });
  const [isProcessing, setProcessing] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({});
  const [initStatus, setinitStatus] = useAtom(initStatusState);

  const errorResponse = useNotification({
    header: "Sign in error",
    type: "error",
    children: <>{response.error ? response.payload : <></>}</>,
  });

  useEffect(() => {
    setProcessing(false);
    if (response.error) errorResponse.show();

    if (response.success) setinitStatus({ ...initStatus, isLoggedIn: true });
  }, [response]);

  return (
    <>
      <Panel shaded bordered style={{ minWidth: 450, paddingTop: "1rem" }}>
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
            formValue={formValue}
            formDefaultValue={formValue}
            onSubmit={(checkStatus, event) => {
              setProcessing(true);
              submitHandler(checkStatus, event, formValue, setResponse);
            }}
          >
            <Form.Group>
              <InputGroupWrapper icon={FaRegUser}>
                <Input
                  disabled={isProcessing}
                  name="username"
                  placeholder="Username"
                  onChange={(value) =>
                    setFormValue({ ...formValue, username: value })
                  }
                  value={formValue.username}
                  autoComplete="off"
                />
              </InputGroupWrapper>
            </Form.Group>
            <Form.Group>
              <InputGroupWrapper
                icon={RiLockPasswordLine}
                isPassword={{
                  icon: isPasswordShow ? EyeSlashIcon : EyeIcon,
                  onClick: () => setPasswordShow(!isPasswordShow),
                }}
              >
                <Input
                  disabled={isProcessing}
                  name="password"
                  type={isPasswordShow ? "text" : "password"}
                  placeholder="Password"
                  onChange={(value) =>
                    setFormValue({ ...formValue, password: value })
                  }
                  value={formValue.password}
                  autoComplete="off"
                />
              </InputGroupWrapper>
            </Form.Group>
            <Form.Group>
              <Button
                disabled={isProcessing}
                loading={isProcessing}
                type="submit"
                style={{ width: 290 }}
                appearance="primary"
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
