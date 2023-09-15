export interface Alarm {
    id:          string;
    created:     string;
    lastupdate:  string;
    state:       string;
    status:      string;
    type:        string;
    subtype:     string;
    level:       string;
    description: string;
    longitude:   string;
    altitude:    string;
    latitude:    string;
    flightPath:  string;
    flightId:    string;
    deviceId:    string;
    operatorId:  string;
    relatesTo:   string;
    parent:      string;
    _links:      Links;
}

export interface Links {
    self:  AlarmClass;
    alarm: AlarmClass;
}

export interface AlarmClass {
    href: string;
}
