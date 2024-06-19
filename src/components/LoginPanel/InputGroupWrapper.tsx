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
  const [visible, setVisible] = useState(isPassword ? false : true);

  const handleChange = () => {
    setVisible(!visible);
  };

  return (
    <InputGroup inside style={{ width: 290 }}>
      <InputGroup.Addon style={{ color: "var(--rs-text-primary)" }}>
        <IconWrapper icon={icon} />
      </InputGroup.Addon>
      <Input type={visible ? "text" : "password"} {...props} />
      {isPassword ? (
        <>
          <InputGroup.Button onClick={handleChange}>
            <IconWrapper icon={visible ? EyeSlashIcon : EyeIcon} />
          </InputGroup.Button>
        </>
      ) : (
        <></>
      )}
    </InputGroup>
  );
}
