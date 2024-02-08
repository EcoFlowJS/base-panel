import { Button, ButtonToolbar, Input, Panel } from "rsuite";
import StepHeader from "../Header/StepHeader";
import { Form, FormGroup, InputPassword } from "@eco-flow/components-lib";
import { useLayoutEffect } from "react";
import defaultUsers from "./defaultDetails";

interface UserCreationProps {
  defaultvalue?: typeof defaultUsers;
  onEnter?: () => void;
  onChange?: (
    value: any,
    event?: React.SyntheticEvent<Element, Event> | undefined
  ) => void;
  onExit?: () => void;
}

export default function UserCreation({
  defaultvalue,
  onEnter = () => {},
  onChange = () => {},
  onExit = () => {},
}: UserCreationProps) {
  useLayoutEffect(() => {
    onEnter();
    return onExit();
  }, []);

  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Create User."
          HeaderDescription="Create admin user to access the application in authenticated mode."
        />
      }
      style={{ paddingBottom: 0 }}
    >
      <Panel>
        <Form
          layout="horizontal"
          formDefaultValue={defaultvalue ? defaultvalue : defaultUsers}
          onChange={onChange}
        >
          <FormGroup
            name="name"
            label="Name :-"
            autoComplete="off"
            placeholder="Administrator"
            accepter={Input}
          />
          <FormGroup
            name="username"
            label="Username :-"
            autoComplete="off"
            placeholder="admin"
            accepter={Input}
          />
          <FormGroup
            name="password"
            label="Password :-"
            autoComplete="off"
            placeholder="Password"
            accepter={InputPassword}
            style={{ width: 300 }}
          />
          <FormGroup
            name="email"
            label="Email :-"
            autoComplete="off"
            placeholder="Email"
            accepter={Input}
            helperText="Optional."
            helperTextStyle={{ marginLeft: 240 }}
          />
        </Form>
      </Panel>
    </Panel>
  );
}
