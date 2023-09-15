export interface Problems {
    _embedded: Embedded;
    _links:    ProblemsLinks;
    page:      Page;
}

export interface Embedded {
    Problem: Problem[];
}

export interface Problem {
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
    _links:      ProblemLinks;
}

export interface ProblemLinks {
    self:    Profile;
    problem: Profile;
}

export interface Profile {
    href: string;
}

export interface ProblemsLinks {
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
