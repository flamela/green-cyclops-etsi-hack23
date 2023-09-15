export interface Zone {
    id:          string;
    created:     string;
    lastUpdate:  string;
    name:        string;
    profile:     string;
    description: string;
    longitude:   string;
    latitude:    string;
    radio:       string;
    active:      boolean;
    _links:      Links;
}

export interface Links {
    self: Self;
    zone: Self;
}

export interface Self {
    href: string;
}
