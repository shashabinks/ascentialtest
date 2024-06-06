export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
  timezone: string; // Add timezone property
}

export interface EventProps {
  id: string;
  short_title: string;
  datetime_utc: Date;
  performers: Performers[];
  venue: Venue;
  isFavorite: boolean;
}

export interface EventItemProps {
  event: EventProps;
}

export interface VenueProps {
  id: number;
  has_upcoming_events: boolean;
  num_upcoming_events: number;
  name_v2: string;
  display_location: string;
  isFavorite: boolean;
}

export interface VenuItemProps {
  venue: VenueProps;
}
