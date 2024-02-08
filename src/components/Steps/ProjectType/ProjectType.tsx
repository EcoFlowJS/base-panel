import { Panel, RadioTile, RadioTileGroup } from "rsuite";
import StepHeader from "../Header/StepHeader";
import { Icon } from "@rsuite/icons";
import { VscNotebookTemplate, VscRepoClone, VscFile } from "react-icons/vsc";
import { SyntheticEvent, useEffect, useLayoutEffect, useState } from "react";

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
  const [isInline, setIsInline] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsInline(window.innerWidth >= 1200);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
          inline={isInline}
          aria-label="Create new project"
        >
          <RadioTile
            icon={<Icon as={VscFile} />}
            label="Create blank project"
            value="blank"
          >
            Create a blank project to house your files, plan your work, and
            collaborate on code, among other things.
          </RadioTile>
          <RadioTile
            icon={<Icon as={VscNotebookTemplate} />}
            label="Create from template"
            value="template"
          >
            Create a project pre-populated with the necessary files to get you
            started quickly.
          </RadioTile>
          <RadioTile
            icon={<Icon as={VscRepoClone} />}
            label="Import project"
            value="import"
          >
            Migrate your data from an external source like GitHub, Bitbucket, or
            another instance of GitLab.
          </RadioTile>
        </RadioTileGroup>
      </Panel>
    </Panel>
  );
}
