export interface Class {
  id: string;
  name: string;
  class_competition_rule_id: number;
  class_rule_name: string;
  type: string;
  sport_id: string;
  match_type: string;
  sport_name: string;
}

export interface ClassMultiple {
  message: string;
  data: Class[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

export interface ClassRules {
  id: number;
  name: string;
  male: number;
  female: number;
  total: number;
}

export interface ClassRulesMultiple {
  message: string;
  data: ClassRules[];
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  previous_page: number;
  next_page: number;
  last_page: number;
  total_item: number;
}

// Payload for creating a new class (POST /class)
export interface CreateClassPayload {
  sport_id: string;
  name: string; // Assuming name is also required, common for class creation
  class_rule_id: string; // Assuming this is a required field
  class_type: string; // Example: 'custom'
  match_type: string; // Example: 'single'
}

// Item structure for assigning a class in storeClassTournament
export interface ClassAssignmentItem {
  class_id: string;
  price: number;
  // Add other properties if needed for each item in the assignment array
}

// Payload for assigning classes to an event (POST /event/{id}/class/assign)
export interface StoreClassTournamentPayload {
  data: ClassAssignmentItem[];
}

// Payload for updating class price in an event (PUT /event/{id}/class/{class_id})
export interface UpdatePriceClassTournamentPayload {
  price: number;
}
