import { Form, Input, InputNumber, Panel, SelectPicker, Toggle } from "rsuite";
import StepHeader from "../Header/StepHeader.component";
import { useEffect, useLayoutEffect, useState } from "react";
import { FormGroup, InputEnv, InputPasswordEnv } from "@ecoflow/components-lib";
import { DB_Config, DB_DriverList } from "./DB_DriverList";

interface DatabaseSetupProps {
  defaultvalue?: typeof DB_Config;
  onEnter?: () => void;
  onChange?: (value: any) => void;
  onExit?: () => void;
}

export default function DatabaseSetup({
  defaultvalue,
  onEnter = () => {},
  onChange = () => {},
  onExit = () => {},
}: DatabaseSetupProps) {
  const [value, setValue] = useState<typeof DB_Config>(
    defaultvalue ? defaultvalue : DB_Config
  );

  useLayoutEffect(() => {
    onEnter();
    return onExit();
  }, []);

  useEffect(
    () =>
      setValue({
        ...value,
        databaseConfigurationPort:
          value.databaseDriver === "MySQL"
            ? 3306
            : value.databaseDriver === "PostgreSQL"
            ? 5432
            : 0,
      }),
    [value.databaseDriver]
  );
  useEffect(() => onChange(value), [value]);

  return (
    <Panel
      header={
        <StepHeader
          HeaderText="Database Configuration"
          HeaderDescription="Default EcoFlow will use SQLite database. you may turn off default datbase and your own database configuration."
        />
      }
      style={{ paddingBottom: 0 }}
    >
      <Panel>
        <Form
          layout="horizontal"
          onChange={(val) => {
            setValue({ ...value, ...val });
          }}
          formValue={value}
        >
          <FormGroup
            name="useDefault"
            label="Use default database : "
            accepter={Toggle}
            checked={value.useDefault}
          />
          {!value.useDefault ? (
            <>
              <FormGroup
                name="databaseDriver"
                label="Database Driver"
                accepter={SelectPicker}
                data={DB_DriverList}
                style={{ width: 150 }}
                searchable={false}
                onClean={() => setValue({ ...value, databaseDriver: "" })}
              />
              {value.databaseDriver !== "" ? (
                value.databaseDriver === "MongoDB" ? (
                  <>
                    <FormGroup
                      name="databaseConfigurationConnectionString"
                      label="Connection String"
                      accepter={InputEnv}
                      autoComplete="off"
                      placeholder="Connection String"
                      envCheckbox
                      envCheckboxOnChange={(val) =>
                        setValue({ ...value, envMongoConnectionString: val })
                      }
                      defaultChecked={value.envMongoConnectionString}
                    />
                  </>
                ) : value.databaseDriver === "Sqlite" ? (
                  <>
                    <FormGroup
                      name="databaseConfigurationFilename"
                      label="Sqlite File "
                      accepter={Input}
                      autoComplete="off"
                      placeholder="Sqlite File"
                      helperTextStyle={{ marginLeft: 242 }}
                      helperText="File will create automatically if not exists"
                    />
                  </>
                ) : (
                  <>
                    <FormGroup
                      name="databaseConfigurationHost"
                      label="Host"
                      accepter={Input}
                      autoComplete="off"
                      placeholder="localhost"
                    />
                    <FormGroup
                      name="databaseConfigurationPort"
                      label="Port"
                      accepter={InputNumber}
                      placeholder={
                        value.databaseDriver === "MySQL"
                          ? "3306"
                          : value.databaseDriver === "PostgreSQL"
                          ? "5432"
                          : "3000"
                      }
                      min={1}
                      max={65535}
                    />
                    <FormGroup
                      name="databaseConfigurationUser"
                      label="Username"
                      accepter={InputEnv}
                      autoComplete="off"
                      placeholder="Username"
                      envCheckbox
                      envCheckboxOnChange={(val) =>
                        setValue({ ...value, envUsername: val })
                      }
                      defaultChecked={value.envUsername}
                    />
                    <FormGroup
                      name="databaseConfigurationPassword"
                      label="Password"
                      accepter={InputPasswordEnv}
                      placeholder="Password"
                      envCheckbox
                      envCheckboxOnChange={(val) =>
                        setValue({ ...value, envPassword: val })
                      }
                      defaultChecked={value.envPassword}
                    />
                    <FormGroup
                      name="databaseConfigurationDatabase"
                      label="Database Name"
                      accepter={InputEnv}
                      autoComplete="off"
                      placeholder="Database Name"
                      style={{ width: 250 }}
                      envCheckbox
                      envCheckboxOnChange={(val) =>
                        setValue({ ...value, envDatabase: val })
                      }
                      defaultChecked={value.envDatabase}
                    />
                    <FormGroup
                      name="databaseConfigurationSsl"
                      label="SSL  "
                      accepter={Toggle}
                      defaultChecked={value.databaseConfigurationSsl}
                    />
                  </>
                )
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Form>
      </Panel>
    </Panel>
  );
}
