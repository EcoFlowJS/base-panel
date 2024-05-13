import { IconWrapper } from "@ecoflow/components-lib";
import { FC, HTMLAttributes, useState } from "react";
import { Input, InputGroup, InputProps } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

interface InputGroupWrapperProps extends Omit<InputProps, "as"> {
  icon: FC<HTMLAttributes<SVGElement>>;
  isPassword?: boolean;
}

export default function InputGroupWrapper({
  icon,
  isPassword,
  ...props
}: InputGroupWrapperProps) {
  const [isPasswordShow, setPasswordShow] = useState(false);

  return (
    <InputGroup inside style={{ width: 290 }}>
      <InputGroup.Addon style={{ color: "#FFF" }}>
        <IconWrapper icon={icon} />
      </InputGroup.Addon>
      <Input type={isPassword ? "password" : "text"} {...props} />
      {isPassword ? (
        <>
          <InputGroup.Button onClick={() => setPasswordShow(!isPasswordShow)}>
            <IconWrapper icon={isPasswordShow ? EyeSlashIcon : EyeIcon} />
          </InputGroup.Button>
        </>
      ) : (
        <></>
      )}
    </InputGroup>
  );
}
