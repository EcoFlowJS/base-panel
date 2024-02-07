import { Button, ButtonToolbar, Form, Panel } from "rsuite";
import StepHeader from "../Header/StepHeader";

export default function UserCreation() {
  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Create New Project."
          HeaderDescription="You can always create a new project from a template or another project. But if you want to start fresh you can create a new project."
        />
      }
      style={{ paddingBottom: 0 }}
    >
      <Panel>
        <Form layout="horizontal">
          <Form.Group controlId="name-6">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="name" />
            <Form.HelpText>Required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="email-6">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" />
            <Form.HelpText tooltip>Required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="password-6">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off" />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary">Submit</Button>
              <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Panel>
    </Panel>
  );
}
