import { Panel, RadioTile, RadioTileGroup } from "rsuite";
import StepHeader from "../Header/StepHeader.component";
import { VscFile } from "react-icons/vsc";
import { RiImportFill } from "react-icons/ri";
import { SyntheticEvent, useEffect } from "react";
import { HiOutlineTemplate } from "react-icons/hi";
import { IconWrapper } from "@ecoflow/components-lib";

interface ProjectTypeProps {
  defaultValue?: string | number;
  onEnter?: () => void;
  onExit?: () => void;
  onChange?: (value: any, event: SyntheticEvent<Element, Event>) => void;
}

export default function ProjectType({
  defaultValue = "blank",
  onEnter = () => {},
  onExit = () => {},
  onChange = () => {},
}: ProjectTypeProps) {
  useEffect(() => {
    onEnter();
    return onExit();
  }, []);

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
        <RadioTileGroup
          onChange={onChange}
          defaultValue={defaultValue}
          aria-label="Create new project"
        >
          <RadioTile
            icon={<IconWrapper icon={VscFile} />}
            label="Create blank project"
            value="blank"
          >
            Create a blank project to house your files, plan your work, and
            collaborate on code, among other things.
          </RadioTile>
          <RadioTile
            icon={<IconWrapper icon={HiOutlineTemplate} />}
            label="Create from template"
            value="template"
            disabled
            title="Still under development"
          >
            Create a project pre-populated with the necessary files to get you
            started quickly.
          </RadioTile>
          <RadioTile
            icon={<IconWrapper icon={RiImportFill} />}
            label="Import project"
            value="import"
          >
            Migrate your data from an exported project file.
          </RadioTile>
        </RadioTileGroup>
      </Panel>
    </Panel>
  );
}
