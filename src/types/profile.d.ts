interface BornOn {
    Time: string; // ISO 8601 date string
    Valid: boolean; // Indicates if the date is valid
}

export interface ProfileUpdate {
    name: string; // Full name of the user
    born_on: string; // Date of birth in ISO 8601 format
    born_at: string; // Place of birth
    identity_number: string // National identity number
    phone: string; // Phone number
    gender: "male" | "female" | "" // Gender of the user
    photo: string; // URL to the user's photo
    about: string; // Additional information about the user
}

export interface ProfileData extends ProfileUpdate {
    id: string; // Unique identifier for the user
    born_on: BornOn; // Date of birth details
    status: boolean; // Active status of the user
    can_participate: boolean; // Indicates if the user can participate in events
    EventPrivilege: boolean; // Indicates if the user has event privileges
}

export interface ProfilePayload {
    message: string; // Response message
    data: ProfileData; // User profile data
}

export interface ProfileBasicResponse{
    data: ProfileData
    message: string
}

