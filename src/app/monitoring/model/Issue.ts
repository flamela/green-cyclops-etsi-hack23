
export interface Issue {
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
    radius:      string;
    flightPath:  string;
    flightId:    string;
    taskId:      string;
    deviceId:    string;
    operatorId:  string;  
    relatesTo:   string;
    parent:      string;
    _links:      Links;
}

export interface Links {
    self:  IssueClass;
    issue: IssueClass;
}

export interface IssueClass {
    href: string;
}
