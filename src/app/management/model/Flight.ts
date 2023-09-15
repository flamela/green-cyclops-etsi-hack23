
export interface Flight {
    id:          string;
    name:        string;
    created:     string;
    state:       string;
    status:      string;
    lastUpdate:  string;
    zoneId:      string;
    flightPath:  string;
    parent:      string;
    relatedTo:   string;
    profileName: string;
    _links:      Links;
}

export interface Links {
    self:   FlightClass;
    flight: FlightClass;
}

export interface FlightClass {
    href: string;
}
