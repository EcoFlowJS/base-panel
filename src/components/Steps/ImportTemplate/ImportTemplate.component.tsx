import { Panel } from "rsuite";
import StepHeader from "../Header/StepHeader.component";
import { Form, FormGroup, Uploader } from "@eco-flow/components-lib";
import { useLayoutEffect } from "react";

interface ImportTemplateProps {
  defaultvalue?: FileList | null;
  onEnter?: () => void;
  onChange?: (value: { importFile: FileList | null }) => void;
  onExit?: () => void;
}

export default function ImportTemplate({
  defaultvalue = null,
  onEnter = () => {},
  onChange = () => {},
  onExit = () => {},
}: ImportTemplateProps) {
  useLayoutEffect(() => {
    onEnter();
    return onExit();
  }, []);

  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Import Project."
          HeaderDescription="Import the exported project file of an existing project."
        />
      }
      style={{ paddingBottom: 0 }}
    >
      <Panel>
        <Form
          layout="horizontal"
          onChange={(changed) =>
            onChange(changed as { importFile: FileList | null })
          }
          formDefaultValue={defaultvalue as any}
        >
          <FormGroup
            name="importFile"
            label="Import File :"
            accepter={Uploader}
            accept="application/zip"
            value={defaultvalue}
          />
        </Form>
      </Panel>
    </Panel>
  );
}
