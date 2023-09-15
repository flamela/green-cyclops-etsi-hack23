export interface Alarms {
    _embedded: Embedded;
    _links:    AlarmsLinks;
    page:      Page;
}

export interface Embedded {
    Alarm: Alarm[];
}

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
    _links:      AlarmLinks;
}

export interface AlarmLinks {
    self:  First;
    alarm: First;
}

export interface First {
    href: string;
}

export interface AlarmsLinks {
    first:   First;
    self:    First;
    next:    First;
    last:    First;
    profile: First;
    search:  First;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
