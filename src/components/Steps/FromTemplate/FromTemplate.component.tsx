import React, { useLayoutEffect } from "react";
import { Input, Panel } from "rsuite";
import StepHeader from "../Header/StepHeader.component";
import { Form, FormGroup } from "@eco-flow/components-lib";

interface FromTemplateProps {
  defaultvalue?: string;
  onEnter?: () => void;
  onChange?: (value: any, event?: React.SyntheticEvent<Element, Event>) => void;
  onExit?: () => void;
}

export default function FromTemplate({
  defaultvalue = "",
  onEnter = () => {},
  onChange = () => {},
  onExit = () => {},
}: FromTemplateProps) {
  useLayoutEffect(() => {
    onEnter();
    console.log(defaultvalue);

    return onExit();
  }, []);

  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Import Template."
          HeaderDescription="Import the exported project form template of an existing project."
        />
      }
      style={{ paddingBottom: 0 }}
    >
      <Panel>
        <Form
          formDefaultValue={{ templateURL: defaultvalue }}
          onChange={onChange}
        >
          <FormGroup
            name="templateURL"
            label="Template URL :"
            accepter={Input}
            helperText="Enter the JSON template url."
            autoComplete="off"
          />
        </Form>
      </Panel>
    </Panel>
  );
}
