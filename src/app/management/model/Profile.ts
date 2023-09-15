
export interface Profile {
    active: boolean;
    created: string;
    description: string;
    id: string;
    lastUpdate: string;
    name: string;
    profile: string;
    _links: Links;
}

export interface Links {
    self: ProfileClass;
    operation: ProfileClass;
}

export interface ProfileClass {
    href: string;
}
