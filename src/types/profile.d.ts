interface BornOn {
    Time: string; // ISO 8601 date string
    Valid: boolean; // Indicates if the date is valid
}

export interface ProfileData {
    id: string; // Unique identifier for the user
    name: string; // Full name of the user
    born_at: string; // Place of birth
    born_on: BornOn; // Date of birth details
    identity_number: string; // National identity number
    phone: string; // Phone number
    photo: string; // URL to the user's photo
    gender: "male" | "female"; // Gender of the user
    about: string; // Additional information about the user
    status: boolean; // Active status of the user
    can_participate: boolean; // Indicates if the user can participate in events
    EventPrivilege: boolean; // Indicates if the user has event privileges
}

export interface ProfilePayload {
    message: string; // Response message
    data: ProfileData; // User profile data
}