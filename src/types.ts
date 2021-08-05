export interface DynamicConstants {
  API_URL: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Place {
  id: string;
  name: string;
  type: string;
  trend: 0 | 1 | -1;
  example?: boolean;
}

export interface PlaceInfo extends Place {
  incidence: number;
  website: string;
}

export enum RuleStatus {
  Unknown = -1,
  Red = 0,
  Yellow = 1,
  Green = 2,
}

export interface Rule {
  id: number;
  categoryId: number;
  status: RuleStatus;
  text: string;
  timestamp: string;
}

export type RulesPerCategory = [Category, Rule[]][];

export interface RestrictedPlace {
  placeId: string;
  denyingRules: Rule[];
}

export enum SidebarHeading {
  LastSearch = "Letze Suchen",
  ExamplePlaces = "Beispiel-Orte",
  FavouritePlaces = "Meine Orte",
  SearchResults = "Suchergebnisse",
}
