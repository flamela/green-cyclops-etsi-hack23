import keycloakConfig from "./keycloak.config";

export const environment = {
    OPERATION_MANAGER_URL: 'http://host:port',
    ALARM_MANAGER_URL: 'http://host:port',
    keycloak: keycloakConfig,
    s3: 'media',
    awsKeyId: '',
    awsSecretKey: '',
    region: '',
    alarmManagement: 'http://host:port',
    operationManagement: 'http://host:port'
};
