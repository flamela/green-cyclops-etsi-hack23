export interface Problem {
    id:          string;
    created:     string;
    lastupdate:  string;
    state:       string;
    status:      string;
    type:        string;
    subtype:     string;
    level:       string;
    description: string;
    observerId:  string;
    relatesTo:   string;
    parent:      string;
    _links:      Links;
}

export interface Links {
    self:    ProblemClass;
    problem: ProblemClass;
}

export interface ProblemClass {
    href: string;
}
