export interface Device {
    id: string;
    created:         string;
    state:           string;
    status:          string;
    lastUpdate:      string;
    name:            string;
    serial:          string;
    plate:           string;
    expiration:      string;
    assignedGroup:   string;
    assignedProfile: string;
    assignedCenter:  string;
    relatedTo:       string;
    isParent:        null;
    description:     string;
    zoneId:          null;
    active:          boolean;
    _links:          Links;
}

export interface Links {
    self:   DeviceClass;
    device: DeviceClass;
}

export interface DeviceClass {
    href: string;
}
