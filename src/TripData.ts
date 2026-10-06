import type {IconName} from "./App.tsx";

export type Timestamp = number;

export type Icon = IconName; // TODO probably SVG, not string

export type AccommodationType = 'airbnb' | 'hotel';

export type AccommodationId = string;

export type Accommodation = {
  type: AccommodationType;
  id: AccommodationId;
  name: string;
  address: string;
  where: string; // Like city or neighborhood
  start: Timestamp;
  end: Timestamp;
  checkoutTime: string;
  checkInTime: string;
  link: string;
  mapLink: string;
  nearestTransit?: string;
  nearestTransitName?: string;
  accessNotes?: string;
};

export type RequiredLevel =
  'Will Do, Rain or Shine'
  | 'Must Do, But Good Weather Required'
  | 'Should Do, If Have Time'
  | 'Want to Do'
  | 'Good To Know'
  | 'If Close By'
  | 'Missed, Try For Again'
  | `Missed, Won't Try Again`
  | 'Already Done'

export type RequiredLevelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const REQUIRED_LEVEL_TEXT: Record<RequiredLevelNumber, RequiredLevel> = {
  0: 'Already Done',
  1: 'Will Do, Rain or Shine',
  2: 'Must Do, But Good Weather Required',
  3: 'Should Do, If Have Time',
  4: 'Want to Do',
  5: 'Good To Know',
  6: 'If Close By',
  7: 'Missed, Try For Again',
  8: `Missed, Won't Try Again`,
};

export type SuggestionType = 'food' | 'restaurant' | 'lunch' | 'dinner' | 'breakfast' | 'cafe' | 'shopping' | 'place' | 'park' | 'temple' | 'drinks' | 'experience' | 'tower' | 'other';

export type SuggestionId = string;

export type Suggestion = {
  type: SuggestionType;
  id: SuggestionId;
  name: string;
  description?: string;
  where?: string;
  when?: string;
  price?: number;
  requiredLevel: RequiredLevel;
  link?: string;
  mapLink?: string;
  searchTerm?: string;
};

export type ItineraryItem = {
  time?: string;
  isSuggestion: boolean;
  thing: string | Suggestion;
  canSearch: boolean;
  link?: string;
};

export type Itinerary = {
  locations: string[];
  items: ItineraryItem[];
  image?: string;
};

export type Day = {
  day: string;
  accommodation: AccommodationId[];
  itinerary: Itinerary;
  suggestions: SuggestionId[];
};

export type HeaderPosition = 'top' | 'left';

export type HelpBit = {
  id: string;
  header?: string;
  headerPosition?: HeaderPosition;
  body: string[];
};

export type Help = {
  name: string;
  icon?: Icon;
  bits: HelpBit[];
  color: string;
  titleColor: string;
  subtitleColor: string;
};

export type GoTo = {
  icon: Icon;
  link: string;
  subheader?: string;
};

export type PhraseTag = 'essential' | 'food' | 'help' | 'service';

export type Phrase = {
  term: string;
  nativeScript?: string;
  translated: string[];
  pronunciation: string[];
  notes: string[];
  tags: PhraseTag[];
};

export type Trip = {
  name: string;
  days: Record<Timestamp,Day>;
  start: Timestamp;
  end: Timestamp;
  goto: GoTo[];
  help: Help[];
  accommodations: Record<AccommodationId, Accommodation>;
  suggestions: Record<SuggestionId, Suggestion>;
  phrasebook: Phrase[];
};

export function toPhrase({
  term,
  translated,
  pronunciation,
  notes = [],
  tags,
  nativeScript,
}:{
  term: string;
  translated: string[];
  pronunciation: string[];
  notes?: string[];
  tags: PhraseTag[];
  nativeScript?: string;
}): Phrase {
  return {
    term,
    translated,
    pronunciation,
    notes,
    tags,
    nativeScript
  }
}

export function toGoTo({
  icon,
  link,
  subheader,
}:{
  icon: Icon;
  link: string;
  subheader?: string;
}): GoTo {
  return {
    icon,
    link,
    subheader,
  }
}

export function toHelpBit({
  id,
  header,
  headerPosition = 'top',
  body,
}:{
  id: string;
  header?: string;
  headerPosition?: HeaderPosition;
  body: string[];
}): HelpBit {
  return {
    id,
    header,
    headerPosition,
    body,
  }
}

export function toHelp({
  name,
  icon,
  bits,
  color,
  titleColor = "#FFF",
  subtitleColor,
}:{
  name: string;
  icon?: Icon;
  bits: HelpBit[];
  color: string;
  titleColor?: string;
  subtitleColor?: string;
}): Help {
  return {
    name,
    icon,
    bits,
    color,
    titleColor,
    subtitleColor: subtitleColor ?? color,
  }
}

export function toSuggestion({
  type,
  id,
  name,
  description,
  where,
  when,
  price,
  requiredLevel,
  link,
  mapLink,
  searchTerm,
}:{
  type: SuggestionType;
  id: string;
  name: string;
  description?: string;
  where?: string;
  when?: string;
  price?: number;
  requiredLevel: RequiredLevel;
  link?: string;
  mapLink?: string;
  searchTerm?: string;
}): Suggestion {
  return {
    type,
    id,
    name,
    description,
    where,
    when,
    price,
    requiredLevel,
    link,
    mapLink,
    searchTerm,
  };
}

export function toAccommodation({
  type,
  id,
  name,
  address,
  where,
  start,
  end,
  checkoutTime,
  checkInTime,
  link,
  mapLink,
  nearestTransit,
  nearestTransitName,
  accessNotes,
}:{
  type: AccommodationType;
  id: string;
  name: string;
  address: string;
  city: string;
  where: string;
  start: Timestamp;
  end: Timestamp;
  checkoutTime: string;
  checkInTime: string;
  link: string;
  mapLink: string;
  nearestTransit?: string;
  nearestTransitName?: string;
  accessNotes?: string;
}): Accommodation {
  return {
    type,
    id,
    name,
    address,
    where,
    start,
    end,
    checkoutTime,
    checkInTime,
    link,
    mapLink,
    nearestTransit,
    nearestTransitName,
    accessNotes,
  };
}

export function toItineraryItem({
  time,
  thing,
  isSuggestion = false,
  canSearch = true,
  link,
}:{
  time?: string;
  thing: string | SuggestionId;
  isSuggestion?: boolean;
  canSearch?: boolean;
  link?: string;
}): ItineraryItem {
  return {
    time,
    isSuggestion,
    thing,
    canSearch,
    link,
  };
}

export function toItinerary({
  locations,
  items,
  image,
}:{
  locations: string[];
  items: ItineraryItem[];
  image?: string;
}): Itinerary {
  return {
    locations,
    items,
    image
  }
}

export function toDay({
  day,
  accommodationIds,
  suggestionIds,
  itinerary
}:{
  day: string;
  accommodationIds: AccommodationId[];
  suggestionIds: SuggestionId[];
  itinerary: Itinerary;
}): Day {
  return {
    day,
    accommodation: accommodationIds,
    suggestions: suggestionIds, //TODO organize by place?
    itinerary
  }
}
