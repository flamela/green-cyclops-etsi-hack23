var DEFAULT_TARGET_OPERATIONS = "http://host:port";
var DEFAULT_TARGET_ALARMS = "http://host:port";
var PROXY_CONFIG = [
                         {
                             context: ['/devices/*'],
                             target: process.env.operationManagement || DEFAULT_TARGET_OPERATIONS,
                             secure: false
                         },
                         {
                             context: ['/operations/*'],
                             target: process.env.operationManagement || DEFAULT_TARGET_OPERATIONS,
                             secure: false
                         },
                         {
                             context: ['/profiles/*'],
                             target: process.env.operationManagement || DEFAULT_TARGET_OPERATIONS,
                             secure: false
                         },
                         {
                             context: ['/flights/*'],
                             target: process.env.operationManagement || DEFAULT_TARGET_OPERATIONS,
                             secure: false
                         },
                         {
                             context: ['/zones/*'],
                             target: process.env.operationManagement || DEFAULT_TARGET_OPERATIONS,
                             secure: false
                         },
                         {
                             context: ['/paths/*'],
                             target: process.env.operationManagement || DEFAULT_TARGET_OPERATIONS,
                             secure: false
                         },
                         {
                             context: ['/alarms/*'],
                             target: process.env.alarmManagement || DEFAULT_TARGET_ALARMS,
                             secure: false
                         },
                         {
                             context: ['/issues/*'],
                             target: process.env.alarmManagement || DEFAULT_TARGET_ALARMS,
                             secure: false
                         },
                         {
                             context: ['/problems/*'],
                             target: process.env.alarmManagement || DEFAULT_TARGET_ALARMS,
                             secure: false
                         }
];

module.exports = PROXY_CONFIG;
