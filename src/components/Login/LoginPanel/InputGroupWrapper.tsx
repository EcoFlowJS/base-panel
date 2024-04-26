import { IconWrapper } from "@ecoflow/components-lib";
import { FC, HTMLAttributes, ReactElement } from "react";
import { InputGroup } from "rsuite";

interface InputGroupWrapperProps {
  icon: FC<HTMLAttributes<SVGElement>>;
  children?: ReactElement | ReactElement[] | string[] | string;
  isPassword?: {
    icon: FC<HTMLAttributes<SVGElement>>;
    onClick?: () => void;
  };
}

export default function InputGroupWrapper({
  icon,
  children,
  isPassword,
}: InputGroupWrapperProps) {
  return (
    <InputGroup inside style={{ width: 290 }}>
      <InputGroup.Addon style={{ color: "#FFF" }}>
        <IconWrapper icon={icon} />
      </InputGroup.Addon>
      {children}
      {isPassword ? (
        <>
          <InputGroup.Button onClick={isPassword.onClick}>
            <IconWrapper icon={isPassword.icon} />
          </InputGroup.Button>
        </>
      ) : (
        <></>
      )}
    </InputGroup>
  );
}
