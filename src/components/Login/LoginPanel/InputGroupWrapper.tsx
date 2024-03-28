import { IconWrapper } from "@eco-flow/components-lib";
import React from "react";
import { InputGroup } from "rsuite";

interface InputGroupWrapperProps {
  icon: React.FC<React.HTMLAttributes<SVGElement>>;
  children?: React.ReactElement | React.ReactElement[] | string[] | string;
  isPassword?: {
    icon: React.FC<React.HTMLAttributes<SVGElement>>;
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
