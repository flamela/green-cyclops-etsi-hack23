export interface Path {
    id:            string;
    name:          string;
    state:         string;
    status:        string;
    locationArray: string;
    zoneId:        string;
    active:        boolean;
    created:       string;
    lastUpdate:    string;
    _links:        Links;
}

export interface Links {
    self: PathClass;
    path: PathClass;
}

export interface PathClass {
    href: string;
}
