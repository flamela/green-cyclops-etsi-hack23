
export interface Operation {
    id: string;
    created:            string;
    lastUpdate:         string;
    name:               string;
    value:              string;
    state:              string;
    status:             string;
    description:        string;
    assignedProfile:    string;
    assignedDeviceType: string;
    comments:           string;
    _links:             Links;
}

export interface Links {
    self:      OperationClass;
    operation: OperationClass;
}

export interface OperationClass {
    href: string;
}
