const DB_Config = {
  useDefault: true,
  databaseDriver: "",
  databaseConfigurationConnectionString: "",
  databaseConfigurationFilename: "",
  databaseConfigurationHost: "",
  databaseConfigurationPort: 0,
  databaseConfigurationUser: "",
  databaseConfigurationPassword: "",
  databaseConfigurationDatabase: "",
  databaseConfigurationSsl: false,
  envMongoConnectionString: false,
  envUsername: false,
  envPassword: false,
  envDatabase: false,
};

const DB_DriverList = ["MongoDB", "MySQL", "PostgreSQL", "Sqlite"].map(
  (item) => ({
    label: item,
    value: item,
  })
);

export { DB_DriverList, DB_Config };
