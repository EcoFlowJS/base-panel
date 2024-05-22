import { Grid, Panel, Row } from "rsuite";
import StepHeader from "../Header/StepHeader.component";
import { ISetupValues } from "../../../pages/SetupPage/SetupValues.interface";
import ImportSetup from "./ImportSetup/ImportSetup.component";
import BlankSetup from "./BlankSetup/BlankSetup.component";
import TemplateSetup from "./TemplateSetup/TemplateSetup.component";

interface FinishProps {
  value?: ISetupValues;
}

export default function Finish({ value }: FinishProps) {
  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Finish"
          HeaderDescription="Review settings and confirm and let us make everything ready for you."
        />
      }
    >
      <Grid fluid>
        <Row>
          {value && value.projectType === "blank" ? (
            <BlankSetup value={value} />
          ) : value && value.projectType === "import" ? (
            <ImportSetup value={value} />
          ) : value && value.projectType === "template" ? (
            <TemplateSetup value={value} />
          ) : (
            <></>
          )}
        </Row>
      </Grid>
    </Panel>
  );
}
