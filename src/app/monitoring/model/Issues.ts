export interface Issues {
    _embedded: Embedded;
    _links:    IssuesLinks;
    page:      Page;
}

export interface Embedded {
    Issue: Issue[];
}

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
    _links:      IssueLinks;
}

export interface IssueLinks {
    self:  Profile;
    issue: Profile;
}

export interface Profile {
    href: string;
}

export interface IssuesLinks {
    self:    Profile;
    profile: Profile;
    search:  Profile;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
