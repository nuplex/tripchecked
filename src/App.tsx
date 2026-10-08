import './App.css'
import {type CSSProperties, type JSX, useState} from "react";
import {
  type Accommodation,
  type AccommodationId,
  type Day, type Help, type HelpBit, type Phrase,
  type Suggestion,
  type SuggestionId,
  type SuggestionType, toHelp,
  type Trip
} from "./TripData.ts";
import {Japan2026TripData} from "./japanTrip2026Data.ts";
import moment from "moment";

type CSS = Partial<CSSProperties>;

const pages = ['home'] as const;
type Page = typeof pages[number];

type HeaderType = 'h1' | 'h2' | 'h3' | 'inline1';
type TextType = 'small_header' | 'info' | 'time';
type ButtonType = 'text-button' | 'standard-button' | 'nextprev-button';

type IconShape = 'round_square' | 'circle' | 'square';

type Saveable = Phrase | HelpBit | Suggestion | Accommodation;

const $TRIP: Trip = Japan2026TripData;

const DATE_FORMAT_MONTH_DAY = "MMM D";
const DATE_FORMAT_DOTW_DAY = "ddd MMM Do";
const DATE_FORMAT_COMPARE = "MM/D/YYYY";

const COLOR_PHRASEBOOK_PRIMARY = "#cc5757";
const COLOR_ACCOMMODATION_PRIMARY = "#ecc30b";
const COLOR_SAVES = "#6153CC";
const COLOR_SAVED = "#ecc30b";
const COLOR_ALL_SUGGESTIONS = "#f665a1";

const LOCAL_STORAGE_SAVES = 'saves';

type OnSaveArgs = {
  key: string;
  item: Saveable | null;
  isRemoval: boolean;
};

export type IconName =
  'accommodation'
  | 'mapLink'
  | 'number'
  | 'info'
  | 'link'
  | 'view'
  | 'unview'
  | 'close'
  | 'translate'
  | 'search'
  | 'nearestTransit'
  | 'saved'
  | 'unsaved'
  | 'shop'
  | 'openFull'
  | 'logo_GoogleTranslate'
  | 'logo_WhatsApp'
  | 'logo_Splitwise';
const ICONS: Record<IconName, JSX.Element> = {
  accommodation:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800t-170.5 69.5T240-552q0 71 59 162.5T480-186m0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880t223.5 89T800-552q0 100-79.5 217.5T480-80m0-480"/>
    </svg>,
  mapLink:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192zm-40-98v-468l-160-56v468zm80 0 120-40v-474l-120 46zm-440-10 120-46v-468l-120 40zm440-458v468zm-320-56v468z"/>
    </svg>,
  number:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160zm100-200h46v-240h-36l-70 50 24 36 36-26zm124 0h156v-40h-94l-2-2q21-20 34.5-34t21.5-22q18-18 27-36t9-38q0-29-22-48.5T458-600q-26 0-47 15t-29 39l40 16q5-13 14.5-20.5T458-558q15 0 24.5 8t9.5 20q0 11-4 20.5T470-486l-32 32-54 54zm296 0q36 0 58-20t22-52q0-18-10-32t-28-22v-2q14-8 22-20.5t8-29.5q0-27-21-44.5T678-600q-25 0-46.5 14.5T604-550l40 16q4-12 13-19t21-7q13 0 21.5 7.5T708-534q0 14-10 22t-26 8h-18v40h20q20 0 31 8t11 22q0 13-11 22.5t-25 9.5q-17 0-26-7.5T638-436l-40 16q7 29 28.5 44.5T680-360M160-240h640v-480H160zm0 0v-480z"/>
    </svg>,
  info:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M440-280h80v-240h-80zm68.5-331.5Q520-623 520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600t28.5-11.5M480-80q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320"/>
    </svg>,
  link:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120zm188-212-56-56 372-372H560v-80h280v280h-80v-144z"/>
    </svg>,
  view:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120zm0-80h560v-480H200zm133.5-124.5Q269-369 240-440q29-71 93.5-115.5T480-600t146.5 44.5T720-440q-29 71-93.5 115.5T480-280t-146.5-44.5m248.5-42q46-26.5 72-73.5-26-47-72-73.5T480-540t-102 26.5-72 73.5q26 47 72 73.5T480-340t102-26.5m-59.5-31Q540-415 540-440t-17.5-42.5T480-500t-42.5 17.5T420-440t17.5 42.5T480-380t42.5-17.5"/>
    </svg>,
  unview:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M480-280q-82 0-146.5-44.5T240-440q20-48 56-84t84-56l47 47q-39 11-70 34.5T306-440q26 47 72 73.5T480-340q30 0 58-8t51-23l43 43q-32 23-70.5 35.5T480-280m209-104-43-43q2-3 4-6.5t4-6.5q-18-33-47-56.5T542-531l-69-69q82 0 150 44.5T720-440q-6 15-13.5 29T689-384M791-56l-64-64H200q-33 0-56.5-23.5T120-200v-527l-64-65 56-56 736 736zM200-200h447L200-647zm640-33-80-80v-327H433L233-840h527q33 0 56.5 23.5T840-760z"/>
    </svg>,
  close:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z"/>
    </svg>,
  translate:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80zM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125zm468-72h144l-72-204z"/>
    </svg>,
  search:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580t75.5-184.5T380-840t184.5 75.5T640-580q0 44-14 83t-38 69l252 252zM380-400q75 0 127.5-52.5T560-580t-52.5-127.5T380-760t-127.5 52.5T200-580t52.5 127.5T380-400"/>
    </svg>,
  nearestTransit:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M280-240h320q33 0 56.5-23.5T680-320v-120H200v120q0 33 23.5 56.5T280-240m62.5-57.5Q360-315 360-340t-17.5-42.5T300-400t-42.5 17.5T240-340t17.5 42.5T300-280t42.5-17.5m280 0Q640-315 640-340t-17.5-42.5T580-400t-42.5 17.5T520-340t17.5 42.5T580-280t42.5-17.5M200-80q-17 0-28.5-11.5T160-120v-82q-18-20-29-44.5T120-300v-380q0-83 77-121.5T440-840q26 0 49 .5t44 2.5q-7 19-10 38.5t-3 40.5q-17-1-36.5-1.5T442-760q-87 0-144 10t-80 30h305q4 19 11 39t18 41H200v120h443l117 105v115q0 29-11 53.5T720-202v82q0 17-11.5 28.5T680-80h-40q-17 0-28.5-11.5T600-120v-40H280v40q0 17-11.5 28.5T240-80zm531.5-651.5Q720-743 720-760t11.5-28.5T760-800t28.5 11.5T800-760t-11.5 28.5T760-720t-28.5-11.5m99.5-98q29 30.5 29 73.5 0 32-24.5 70.5T761-600q-51-48-76-86t-25-70q0-43 29-73.5t71-30.5 71 30.5M760-520q81-69 120.5-127.5T920-756q0-68-46.5-116T760-920t-113.5 48T600-756q0 50 39.5 108.5T760-520m-560 80h480zm323-280H218zm237-40"/>
    </svg>,
  logo_GoogleTranslate:
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 998.1 998.3">
      <path fill="#dbdbdb" d="M931.7 998.3c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4H283.6l260.1 797.9z"/>
      <path fill="#dcdcdc" d="M931.7 230.4c9.7 0 18.9 3.8 25.8 10.6 6.8 6.7 10.6 15.5 10.6 24.8v667.1c0 9.3-3.7 18.1-10.6 24.8-6.9 6.8-16.1 10.6-25.8 10.6H565.5L324.9 230.4zm0-30H283.6l260.1 797.9h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4"/>
      <path fill="#4352b8" d="m482.3 809.8 61.4 188.5 170.7-188.5z"/>
      <path fill="#607988" d="M936.1 476.1V437H747.6v-63.2h-61.2V437H566.1v39.1h239.4c-12.8 45.1-41.1 87.7-68.7 120.8-48.9-57.9-49.1-76.7-49.1-76.7h-50.8s2.1 28.2 70.7 108.6c-22.3 22.8-39.2 36.3-39.2 36.3l15.6 48.8s23.6-20.3 53.1-51.6c29.6 32.1 67.8 70.7 117.2 116.7l32.1-32.1c-52.9-48-91.7-86.1-120.2-116.7 38.2-45.2 77-102.1 85.2-154.2H936v.1z"/>
      <path fill="#4285f4" d="M66.4 0C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h648.1L454.4 0z"/>
      <linearGradient id="a" x1="534.3" x2="998.1" y1="433.2" y2="433.2" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity=".2"/>
        <stop offset="1" stopColor="#fff" stopOpacity=".02"/>
      </linearGradient>
      <path fill="url(#a)" d="M534.3 200.4h397.4c36.5 0 66.4 29.4 66.4 65.4V666z"/>
      <path fill="#eee" d="M371.4 430.6c-2.5 30.3-28.4 75.2-91.1 75.2-54.3 0-98.3-44.9-98.3-100.2s44-100.2 98.3-100.2c30.9 0 51.5 13.4 63.3 24.3l41.2-39.6c-27.1-25-62.4-40.6-104.5-40.6-86.1 0-156 69.9-156 156s69.9 156 156 156c90.2 0 149.8-63.3 149.8-152.6 0-12.8-1.6-22.2-3.7-31.8h-146v53.4z"/>
      <radialGradient id="b" cx="65.208" cy="19.366" r="1398.271" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity=".1"/>
        <stop offset="1" stopColor="#fff" stopOpacity="0"/>
      </radialGradient>
      <path fill="url(#b)" d="M931.7 200.4H518.8L454.4 0h-388C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h415.9l61.4 188.4h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4"/>
    </svg>,
  logo_WhatsApp:
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552">
      <defs>
        <linearGradient id="linearGradient1780" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57d163"/>
          <stop offset="1" stopColor="#23b33a"/>
        </linearGradient>
        <filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3.531"/>
        </filter>
      </defs>
      <path fill="#b3b3b3" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a61 61 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032a73.54 73.54 0 0 1-35.159-8.954zm0 0" filter="url(#a)"/>
      <path fill="#fff" d="m12.966 161.238 10.439-38.114a73.4 73.4 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032a73.54 73.54 0 0 1-35.159-8.954z"/>
      <path fill="url(#linearGradient1780)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a61 61 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929"/>
      <path fill="url(#b)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a61 61 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928"/>
      <path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/>
    </svg>,
  logo_Splitwise:
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 106">
      <g fill="none" fillRule="evenodd">
        <path fill="#fff" d="M96.593 99.345H9.408V31.773L53 6.605l43.593 25.168z"/>
        <path stroke="#fff" strokeWidth="12" d="M96.593 99.834H9.408V32.262L53 7.094l43.593 25.168z"/>
        <path fill="#1cc29f" d="m42.163 63.585 10.57-6.102-43.99-25.398v25.081c3.297-1.777 7.45-2.701 12.206-2.701 10.355 0 16.908 4.397 21.214 9.12M22.755 98.593c4.406 0 7.728-1.3 7.728-4.622 0-3.395-4.262-4.695-9.534-5.995-3.925-1.005-8.43-2.014-12.205-3.916v6.444c3.178 5.128 8.45 8.089 14.01 8.089"/>
        <path fill="#52595f" d="m52.734 57.482 43.99 25.397V32.085z"/>
        <path fill="#ace4d6" d="M96.723 32.085 52.733 6.687 8.744 32.085l43.99 25.397z"/>
        <path fill="#373b3f" d="m52.733 57.482-10.57 6.103-11.331 6.543c-2.895-2.303-6.578-3.963-9.955-3.963-4.117 0-6.211 1.37-6.211 3.9 0 2.925 2.865 4.32 6.835 5.45.833.237 1.712.463 2.626.688 8.74 2.095 20.44 4.767 20.44 16.756 0 2.517-.53 5.025-1.69 7.314h53.846V82.88Z"/>
        <path fill="#fff" d="M24.127 76.204a77 77 0 0 1-2.626-.69c-3.97-1.13-6.835-2.524-6.835-5.45 0-2.528 2.094-3.9 6.211-3.9 3.377 0 7.06 1.661 9.955 3.964l11.33-6.543c-4.306-4.723-10.858-9.121-21.213-9.121-4.756 0-8.908.925-12.205 2.702V84.06c3.775 1.902 8.28 2.91 12.205 3.916 5.272 1.3 9.534 2.6 9.534 5.995 0 3.323-3.323 4.622-7.728 4.622-5.561 0-10.834-2.96-14.011-8.09v9.77h34.132c1.16-2.289 1.69-4.797 1.69-7.314 0-11.989-11.7-14.662-20.439-16.755"/>
      </g>
    </svg>,
  saved: <span style={{color: COLOR_SAVED}}>★</span>,
  unsaved: <span style={{color: '#333'}}>☆</span>,
  shop:
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M223.5-103.5Q200-127 200-160t23.5-56.5T280-240t56.5 23.5T360-160t-23.5 56.5T280-80t-56.5-23.5m400 0Q600-127 600-160t23.5-56.5T680-240t56.5 23.5T760-160t-23.5 56.5T680-80t-56.5-23.5M246-720l96 200h280l110-200zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130zm134 280h280z"/>
    </svg>,
  openFull:
    <svg xmlns="http://www.w3.org/2000/svg" fill="#1f1f1f" viewBox="0 -960 960 960">
      <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80z"/>
    </svg>
};

function getSgt(id: SuggestionId): Suggestion {
  return $TRIP.suggestions[id];
}

function getAcc(id: AccommodationId): Accommodation {
  return $TRIP.accommodations[id];
}

function getEmojiForSuggestionType(type: SuggestionType): string {
  switch (type) {
    case "food":
      return '🍴';
    case "restaurant":
      return '🍽️'
    case "breakfast":
      return '🥞';
    case "lunch":
      return '🥪';
    case "dinner":
      return '🥘';
    case "cafe":
      return '☕️';
    case "drinks":
      return '🍻';
    case "experience":
      return '⭐️';
    case "shopping":
      return '🛍️';
    case "place":
      return '🗺️';
    case "park":
      return '🌳'
    case "temple":
      return '⛩️'
    case "tower":
      return '🗼';
    case "other":
    default:
      return '';
  }
}

function isTodayWithinTrip(): boolean {
  const todayM = moment();
  const tripStartM = moment($TRIP.start);
  const tripEndM = moment($TRIP.end);
  todayM.isSameOrAfter(tripStartM) && todayM.isSameOrBefore(tripEndM);
  return todayM.isSameOrAfter(tripStartM) && todayM.isSameOrBefore(tripEndM);
}

function isDayToday(day: Day): boolean {
  const todayString = moment().format(DATE_FORMAT_COMPARE);
  return todayString === day.day;
}

function getFirstDayTrip(): Day {
  return Object.values($TRIP.days)[0];
}

function getDayFromTrip(dateString?: string): Day {
  const dayM = isTodayWithinTrip() ? moment(dateString) : moment($TRIP.start);
  let day;
  let i = 0;
  const days = Object.values($TRIP.days);
  while (i < days.length) {
    const day = days[i];
    if (day.day ===  dayM.format(DATE_FORMAT_COMPARE)) {
      return day;
    }
    i++;
  }

  if (!day) {
    console.warn('Failed to find a day, defaulting to first day.')
  }

  return getFirstDayTrip();
}

function getDayIndex(day: Day) {
  const days = Object.values($TRIP.days);
  let i = 0;
  while (i < days.length) {
    const dayCompare = days[i];
    if (dayCompare.day === day.day) {
      return i;
    }
    i++;
  }

  return 0;
}

function getSearchLink(term: string) {
  return encodeURI(`https://www.google.com/search?q=${term}`);
}

function getAllSuggestionsFilter(suggestions: Suggestion[]) {
  const filters: string[] = [];
  suggestions.forEach((s) => {
    if (s.where && !filters.includes(s.where)) filters.push(s.where);
    if (s.type && !filters.includes(s.type)) filters.push(s.type);
    if (!filters.includes(s.requiredLevel)) filters.push(s.requiredLevel);
  });
  return filters;
}

function canShowSuggestion(suggestion: Suggestion, activeFilters: string[]) {
  let i = 0;
  while (i < activeFilters.length) {
    const filter = activeFilters[i];
    if (suggestion.type === filter || suggestion.where === filter || suggestion.requiredLevel === filter) {
      return true;
    }
    i++;
  }

  return false;
}

function getHelpBitParent(bit: HelpBit): Help | undefined {
  return $TRIP.help.find((help) => help.bits.find((bitB) => bit.id === bitB.id));
}

function isSaved(key: string) {
  const savesRaw = localStorage.getItem(LOCAL_STORAGE_SAVES);
  if (!savesRaw) {
    return false;
  }

  const saves = JSON.parse(savesRaw);

  return !!saves[key];
}

function isSuggestionSearchable(type: SuggestionType) {
  return type !== 'cafe'
    && type !== 'dinner'
    && type !== 'breakfast'
    && type !== 'food'
    && type !== 'drinks'
    && type !== 'lunch'
} 

function Date({
  timestamp,
  format,
  inline,
  color,
  size,
  bold,
}: {
  timestamp: number;
  format: string;
  inline?: boolean;
  color?: string;
  size?: string;
  bold?: boolean;
}) {
  const style: CSS = {
    color: color ?? "#333",
    display: inline ? "inline-block" : "block",
    fontSize: size ?? "20px",
    fontWeight: bold ? "bold" : undefined,
  };

  return <div style={style}>{moment(timestamp).format(format)}</div>
}

function DateRange({
  start,
  startFormat,
  end,
  endFormat,
  joinWith,
  size = "20px",
  bold = false,
}: {
  start: number;
  startFormat: string;
  end: number;
  endFormat: string;
  joinWith: string;
  size?: string;
  bold?: boolean;
}) {
  const style: CSS = {
    lineHeight: size,
  };

  return (
    <div style={style}>
      <Date timestamp={start} format={startFormat} inline={true} size={size} bold={bold}/>
      <span>{joinWith}</span>
      <Date timestamp={end} format={endFormat} inline={true} size={size} bold={bold}/>
    </div>
  );
}

function Text({
  text,
  type,
  moreStyle = {},
  fontSize,
  isBlock,
  bold,
  link,
}: {
  text: string;
  type?: TextType;
  fontSize?: number;
  moreStyle?: CSS;
  isBlock?: boolean;
  bold?: boolean;
  link?: string;
}){
  let style: CSS = {
    fontSize: fontSize ? fontSize+"px" : "16px",
    fontWeight: bold ? "bold" : undefined,
    lineHeight: fontSize ?  fontSize+"px" : "16px",
    color: "#333",
    display: isBlock ? "block" : undefined
  };

  let typeStyle: CSS = {};

  if (type === 'small_header') {
    typeStyle = {
      fontSize: "12px",
      lineHeight: "12px",
    }
  }

  if (type === 'info') {
    typeStyle = {
      fontStyle: "italic",
      fontSize: "14px",
      lineHeight: "14px",
    }
  }

  if (type === 'time') {
    typeStyle = {
      color: '#666',
      fontSize: "13px",
      lineHeight: "13px",
    }
  }

  let linkStyle: CSS = {};
  if (link) {
    linkStyle = {
      textDecoration: 'underline',
    };
  }

  style = {
    ...style,
    ...typeStyle,
    ...moreStyle,
    ...linkStyle,
  };

  if (link) {
    return <a style={style} href={link} target={'_blank'}>{text}</a>
  }

  return <span style={style}>{text}</span>
}

function Header({
  text,
  type,
  color,
  inline,
}: {
  text: string;
  type: HeaderType;
  color?: string;
  inline?: boolean;
}) {
  let style: CSS = {
    display: "block"
  };

  if (type === 'h1') {
    style = {
      ...style,
      color: color ?? "#333",
      fontSize: "48px",
      fontWeight: "bold",
      lineHeight: "48px",
      marginTop: "8px",
      marginBottom: "12px",
    };
  } else if (type === 'h2') {
    style = {
      ...style,
      color: color ?? "#333",
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "36px",
      marginTop: "6px",
      marginBottom: "6px",
    };
  } else if (type === 'h3') {
    style = {
      ...style,
      color: color ?? "#333",
      fontSize: "28px",
      fontWeight: "bold",
      lineHeight: "28px",
      marginTop: "4px",
      marginBottom: "4px",
    };
  } else if (type === 'inline1') {
    style = {
      ...style,
      color: color ?? "#333",
      display: "inline-block",
      fontSize: "24px",
      fontWeight: "bold",
      lineHeight: "24px",
      marginRight: "8px",
    };
  }

  if (inline) {
    style = {
      ...style,
      display: "inline-block"
    };
  }

  return <span style={style}>{text}</span>
}

function InlineSpace({
  size
}:{
  size: number
}) {
  const style: CSS = {
    display: "inline-block",
    width: size+'px',
  };
  return <div style={style}/>
}

function BlockSpace({
  size
}:{
  size: number
}) {
  const style: CSS = {
    display: "block",
    height: size+'px',
    margin: 0,
  };
  return <div style={style}/>
}

function Icon({
  img,
  link,
  onClick,
  shape,
  size,
  color,
  marginRight,
  marginLeft,
  subtitle,
  moreStyle,
}: {
  img: JSX.Element;
  link?: string;
  onClick?: (args: any) => void;
  shape?: IconShape;
  size?: number;
  color?: string;
  marginLeft?: number;
  marginRight?: number;
  subtitle?: string;
  moreStyle?: CSS;
}) {
  let border: CSS = {};
  if (shape === 'circle') {
    border = {
      borderRadius: "50px"
    }
  } else if (shape === 'square') {
    border = {
      borderRadius: "0px"
    }
  } else if (shape === 'round_square') {
    border = {
      borderRadius: size ? `${Math.ceil(size * 0.10)}px` : `3px`
    }
  }

  let subtitleStyle: CSS = {};
  if (subtitle) {
    subtitleStyle = {
      flexDirection: "column",
      textAlign: "center",
      textDecoration: "none"
    };
  }

  const sizePx = size ? `${size}px` : undefined;
  const style: CSS = {
    alignItems: "center",
    background: color,
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    height: sizePx ?? "28px",
    marginRight: marginRight ? `${marginRight}px` : undefined,
    marginLeft: marginLeft ? `${marginLeft}px` : undefined,
    userSelect: "none",
    width: sizePx ?? "28px",
    ...border,
    ...subtitleStyle,
    ...moreStyle,
  };

  if (link) {
    return (
      <a style={style} href={link ?? undefined} target={'_blank'}>
        {img}
        {subtitle ? <Text text={subtitle} fontSize={11}/> : null}
      </a>
    );
  }

  return (
    <div style={style} onClick={onClick}>
      {img}
      {subtitle ? <Text text={subtitle} fontSize={11}/> : null}
    </div>
  );
}

function Button({
  label,
  type,
  onClick,
  moreStyle,
}: {
  label: string;
  type: ButtonType;
  onClick: () => void;
  moreStyle?: CSS;
}) {
  const style = {
    ...moreStyle
  };

  return (
    <button className={type} style={style} onClick={onClick}>
      {label}
    </button>
  );
}

function HorizontalDivider({
  color,
  thickness,
  style
}:{
  color: string;
  thickness: number;
  style?: CSS;
}){
  const localStyle = {
    border: "none",
    background: color,
    height: `${thickness}px`,
    ...style,
  };

  return <hr style={localStyle} />
}

function LabelledElement({
  label,
  element,
  containerStyle = {},
  inline,
  flex,
}: {
  label: JSX.Element;
  element: JSX.Element;
  containerStyle?: CSS;
  inline?: boolean;
  flex?: boolean;
}) {
  let style: CSS = {
    display: inline ? "inline-block" : undefined,
    ...containerStyle
  }

  if (flex) {
    if (inline) {
      style = {
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
      };
    } else {
      style = {
        ...style,
        display: 'flex',
        alignItems: 'center',
      };
    }
  }

  return (
    <div style={style}>
      {label}
      {element}
    </div>
  );
}

function InlineContainer({
  moreStyle,
  children
}: {
  moreStyle?: CSS;
  children: any;
}){
  const style: CSS = {
    ...moreStyle,
    display: "inline"
  };

  return <div style={style}>{children}</div>
}

function ModalContext({
  onClickBackground,
  children
}: {
  onClickBackground?: () => void;
  children: any;
}){
  const style: CSS = {
    background: "rgba(61,93,140,0.05)",
    display: "flex",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    top: 0,
    left: 0,
    zIndex: 2,
    flexWrap: "wrap",
    alignContent: "center"
  };

  return <div style={style} onClick={onClickBackground}>{children}</div>
}

function DetailModal({
  detail,
  onClose,
  onSave,
}: {
  detail: Saveable;
  onClose: () => void;
  onSave: (args: any) => void;
}) {
  let element;
  let color = "#333";
  if ('term' in detail) {
    const phrase = detail as Phrase;
    element = <Phrase phrase={phrase} onSave={onSave}/>
    color = COLOR_PHRASEBOOK_PRIMARY;
  } else if  ('body' in detail) {
    const helpBit = detail as HelpBit;
    let helpParent = getHelpBitParent(helpBit);
    if (!helpParent) {
      console.warn('Could not find parent for helpBit ', helpBit.id, '. Defaulting to generic parent.');
      helpParent = toHelp({
        bits: [helpBit], color: "#333", name: "Help"
      });
    }
    element = <HelpBitInfo help={helpParent} bit={helpBit} onSave={onSave}/>;
    color = helpParent.color;
  } else if ('requiredLevel' in detail) {
    const suggestion = detail as Suggestion;
    element = <SuggestionInfo suggestion={suggestion} onSave={onSave}/>
    color = COLOR_ALL_SUGGESTIONS;
  } else {
    // This is an accommodation
    const accommodation = detail as Accommodation;
    element = <AccommodationInfo accommodation={accommodation} onSave={onSave}/>
    color = COLOR_ACCOMMODATION_PRIMARY;
  }

  const modalContainer: CSS = {
    background: "white",
    border: `3px solid ${color ?? '#333'}`,
    borderRadius: "5px",
    height: "fit-content",
    maxHeight: "500px",
    minWidth: "300px",
    marginBlock: "2em",
    marginInline: "6em",
    overflowY: "scroll",
    padding: "18px",
    position: "relative",
    zIndex: 3,
  };

  return (
    <div style={modalContainer}>
      <Icon img={ICONS.close} onClick={onClose}/>
      {element}
    </div>
  );
}

function Today({
  shownDay
}: {
  shownDay?: Day
}){
  const todayM = shownDay ? moment(shownDay.day) : moment();
  const tripStartM = moment($TRIP.start);
  const tripEndM = moment($TRIP.end);
  const todayIsWithinTrip = todayM.isSameOrAfter(tripStartM) && todayM.isSameOrBefore(tripEndM);
  const today = todayIsWithinTrip ? todayM : tripStartM;

  return (
    <LabelledElement
      label={<Text text={'Today is '} type={'small_header'}/>}
      element={<Date timestamp={+today} format={DATE_FORMAT_DOTW_DAY} inline={true} bold={true} size="24px"/>}
    />
  );
}

function AccommodationInfo({
  accommodation,
  onSave,
}: {
  accommodation: Accommodation
  onSave: (args: OnSaveArgs) => void;
}) {
  const saved = isSaved(accommodation.id);

  const nearestTransitStationText = accommodation.nearestTransitName ? `(${accommodation.nearestTransitName})` : '';

  return (
    <div>
      <Header text={accommodation.name} type={'h3'}/>
      <Text text={accommodation.where} fontSize={14} isBlock={true}/>
      <Text text={accommodation.address} type={'info'}/>
      <LabelledElement
        label={<Text text={'Check-In at '} fontSize={12}/>}
        element={<Text text={`${accommodation.checkInTime} on ${moment(accommodation.start).format(DATE_FORMAT_MONTH_DAY)}`} fontSize={12} bold={true}/>}
      />
      <LabelledElement
        label={<Text text={'Check-Out at '} fontSize={12}/>}
        element={<Text text={`${accommodation.checkoutTime} on ${moment(accommodation.end).format(DATE_FORMAT_MONTH_DAY)}`} fontSize={12} bold={true}/>}
      />
      {accommodation.accessNotes ?
        <LabelledElement
          label={<Text text={'Access Notes: '} fontSize={12}/>}
          element={<Text text={accommodation.accessNotes} fontSize={12}/>}
        />
        : null
      }
      <LabelledElement
        label={<Icon img={ICONS.accommodation} link={accommodation.link}/>}
        element={<Text text={accommodation.type === 'airbnb' ? 'See on Airbnb' : 'Open Hotel Website'} link={accommodation.link}/>}
        flex={true}
      />
      <LabelledElement
        label={<Icon img={ICONS.mapLink} link={accommodation.mapLink}/>}
        element={<Text text={'Open in Maps'} link={accommodation.mapLink}/>}
        flex={true}
      />
      <LabelledElement
        label={<Icon img={ICONS.nearestTransit} link={accommodation.nearestTransit}/>}
        element={<Text text={`See Nearest Transit Stop ${nearestTransitStationText}`} link={accommodation.nearestTransit}/>}
        flex={true}
      />
      <Icon
        img={saved ? ICONS.saved : ICONS.unsaved}
        moreStyle={{
          display: 'block',
          fontSize: '24px',
          height: '24px',
          width: '24px',
          lineHeight: '24px',
        }}
        onClick={() => {onSave({key: accommodation.id, item: accommodation, isRemoval: saved})}}/>
    </div>
  );
}

function TodayAccommodation({
  shownDay,
  onOpenModal,
}: {
  shownDay: Day;
  onOpenModal: (args: any) => void;
}) {
  const [showAddress, setShowAddress] = useState(false);
  const toggleAddress = () => {
    setShowAddress(!showAddress);
  };

  const itemStyle: CSS = {
    display: "flex",
    alignContent: "center",
  };

  return (
    <div>
      {shownDay.accommodation.map((id,i) => {
        const accommodation = getAcc(id);
        const labelText = i > 0 ? 'and ' : 'Staying at ';
        return (
          <section key={`a${shownDay.day}${i}`}>
            <div style={itemStyle}>
              <LabelledElement
                label={<Text text={labelText} type={'small_header'}/>}
                element={<Text text={accommodation.name}/>}
                inline={true}
              />
              <InlineSpace size={6}/>
              <Icon img={ICONS.link} link={accommodation.link}/>
              <InlineSpace size={4}/>
              <Icon img={ICONS.mapLink} link={accommodation.mapLink}/>
              <InlineSpace size={8}/>
              <Icon img={ICONS.number} onClick={toggleAddress}/>
              {accommodation.nearestTransit ?
                <>
                  <InlineSpace size={6}/>
                  <Icon img={ICONS.nearestTransit} link={accommodation.nearestTransit}/>
                </>
                : null}
              <InlineSpace size={6}/>
              <Icon img={ICONS.openFull} size={22} onClick={() => onOpenModal(accommodation)} moreStyle={{paddingTop: '3px'}}/>
            </div>
            {showAddress ? <Text text={accommodation.address} isBlock={true} type={'info'}/> : null}
          </section>
        );
      })}
    </div>
  );
}

function SuggestionInfo({
  suggestion,
  onSave,
}: {
  suggestion: Suggestion;
  onSave: (args: OnSaveArgs) => void;
}) {
  const saved = isSaved(suggestion.id);

  return (
    <div>
      <Header text={suggestion.name} type={'h3'}/>
      <Text text={getEmojiForSuggestionType(suggestion.type)} fontSize={16}/>
      {suggestion.description ? <InlineSpace size={4}/> : null}
      {suggestion.description ? <Text text={suggestion.description} fontSize={16}/> : null}
      {suggestion.where ? <Text text={suggestion.where} fontSize={14} isBlock={true}/> : null}
      {suggestion.requiredLevel ?
        <LabelledElement
            label={<Text text={'Chance of Doing: '} fontSize={12}/>}
            element={<Text text={suggestion.requiredLevel} bold={true}/>}
            inline={true}
        /> : null}
      {suggestion.price ?
        <LabelledElement
          label={<Icon img={ICONS.shop}/>}
          element={<Text text={suggestion.price.toString()} isBlock={true}/>}
          flex={true}
        /> : null}
      {suggestion.link ?
        <LabelledElement
          label={<Icon img={ICONS.link} link={suggestion.link}/>}
          element={<Text text={'Open Link'} link={suggestion.link} isBlock={true}/>}
          flex={true}
        /> : null}
      {suggestion.mapLink ?
        <LabelledElement
          label={<Icon img={ICONS.mapLink} link={suggestion.mapLink}/>}
          element={<Text text={'Open in Maps'} link={suggestion.mapLink} isBlock={true}/>}
          flex={true}
        /> : null}
      {isSuggestionSearchable(suggestion.type) ?
        <LabelledElement
          label={<Icon img={ICONS.search} link={getSearchLink(suggestion.name)}/>}
          element={<Text text={'Search on Google'} link={getSearchLink(suggestion.name)} isBlock={true}/>}
          flex={true}
        /> : null}
      <Icon
        img={saved ? ICONS.saved : ICONS.unsaved}
        moreStyle={{
          display: 'block',
          fontSize: '24px',
          height: '24px',
          width: '24px',
          lineHeight: '24px',
        }}
        onClick={() => {onSave({key: suggestion.id, item: suggestion, isRemoval: saved})}}/>
    </div>
  )
}

function Suggestion({
  suggestion,
  time,
  canSearch,
  forceCanSearch,
  moreStyle,
  showOpenModal,
  onOpenModal,
}: {
  suggestion: Suggestion;
  time?: string;
  canSearch?: boolean;
  forceCanSearch?: boolean;
  moreStyle?: CSS;
  showOpenModal?: boolean;
  onOpenModal?: (args: any) => void;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const suggestionName = `${getEmojiForSuggestionType(suggestion.type)} ${suggestion.name}`;


  const style: CSS = {
    display: "flex",
    alignItems: "center",
    ...moreStyle
  };

  let searchable = canSearch && isSuggestionSearchable(suggestion.type);
  if (forceCanSearch) {
    searchable = true;
  }

  // TODO add other suggestion info like where when price etc
  return (
    <>
      <div style={style}>
        <InlineContainer>
          <Text text={suggestionName}/>
          <InlineSpace size={4}/>
          {time ? <Text text={time} type={'time'}/> : null}
        </InlineContainer>
        {searchable ? <Icon img={ICONS.search} link={getSearchLink(suggestion.searchTerm ?? suggestionName)} marginRight={4}/> : null}
        {suggestion.link ? <Icon img={ICONS.link} link={suggestion.link} marginRight={4}/> : null}
        {suggestion.mapLink ? <Icon img={ICONS.mapLink} link={suggestion.mapLink} marginRight={4}/> : null}
        {suggestion.description ? <Icon img={ICONS.info} onClick={toggleInfo} marginRight={4}/> : null}
        {(showOpenModal && onOpenModal) ? <Icon img={ICONS.openFull} size={18} onClick={() => onOpenModal(suggestion)}/> : null}
      </div>
      {showInfo && suggestion.description ? <Text text={suggestion.description} isBlock={true} type={'info'}/> : null}
    </>
  );
}

function Suggestions({
  suggestionIds,
  forceCanSearch,
}: {
  suggestionIds: SuggestionId[];
  forceCanSearch?: boolean;
}) {
  return (
    <div>
      {suggestionIds.map((id, i) => {
        const suggestion = getSgt(id);
        return (
          <Suggestion key={`sgs${suggestion.id}${i}`} suggestion={suggestion} canSearch={true} forceCanSearch={forceCanSearch}/>
        );
      })}
    </div>
  );
}

function Filter({
  name,
  isActive,
  onSelect,
  color,
  textColor = "#333",
  activeTextColor ="#fff",
}: {
  name: string;
  isActive: boolean;
  onSelect: (ars: any) => void;
  color: string;
  textColor?: string;
  activeTextColor?: string;
}) {
  const style: CSS = {
    background: isActive ? color : '#fff',
    display: "inline-block",
    cursor: "pointer",
    border: `solid 2px ${color}`,
    borderRadius: '3px',
    fontSize: "20px",
    lineHeight: "20px",
    color: isActive ? activeTextColor : textColor,
    marginRight: '8px',
    marginBottom: '8px',
    minWidth: "60px",
    paddingInline: "8px",
    paddingBlock: "4px",
    textAlign: "center"
  };

  return (
    <div style={style} onClick={() => onSelect(name)}>{name}</div>
  )
}

function AllSuggestions({
  suggestions,
  onSaveItem
}: {
  suggestions: Suggestion[];
  onSaveItem: (args: OnSaveArgs) => void;
}) {
  // @ts-ignore
  const [filters, setFilters] = useState<string[]>(getAllSuggestionsFilter(suggestions));
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const onToggleFilter = (filter: string)=> {
    if (activeFilters.includes(filter)) {
      const newActiveFilters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(newActiveFilters);
    } else {
      const newActiveFilters = [...activeFilters, filter];
      setActiveFilters(newActiveFilters);
    }
  }

  const suggestionsLength = suggestions.length;

  const noneOrAllSelected = activeFilters.length === 0 || activeFilters.length === filters.length;

  return (
    <Section name={'All Suggestions'} color={COLOR_ALL_SUGGESTIONS}>
      <Text text={`Tap the labels below to show only suggestions related to them.`} fontSize={14} isBlock={true}/>
      <BlockSpace size={6}/>
      {filters.map((filter, i) => {
        const isActive = activeFilters.includes(filter);
        return (
          <Filter key={`asf${filter}${i}`} name={filter} onSelect={onToggleFilter} color={COLOR_ALL_SUGGESTIONS} isActive={isActive}/>
        );
      })}
      <HorizontalDivider color={COLOR_ALL_SUGGESTIONS} thickness={3}/>
      {suggestions.map((suggestion, i) => {
        if (!canShowSuggestion(suggestion, activeFilters) && !noneOrAllSelected) {
          return null;
        }

        const divider = i < suggestionsLength - 1;
        return (
          <div key={`as${suggestion.name}${i}`}>
            <SuggestionInfo suggestion={suggestion} onSave={onSaveItem}/>
            {divider ? <HorizontalDivider color={COLOR_ALL_SUGGESTIONS} thickness={3}/> : null}
          </div>
        );
      })}
    </Section>
  )
}

function TodayItinerary({
  shownDay,
  onOpenModal,
}: {
  shownDay: Day;
  onOpenModal: (args: any) => void;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const hasItineraryItems = shownDay.itinerary.items.length > 0;

  const containerStyle: CSS = {
    padding: "8px",
    border: hasItineraryItems ? 'dashed 2px #999' : undefined,
  };

  const hasSuggestions = shownDay.suggestions.length > 0;

  return (
    <div style={containerStyle}>
      {shownDay.itinerary.items.map((item, i) => {
        const lineStyle: CSS = {
          alignItems: "center",
          display: "flex",
          minHeight: "30px"
        };


        if (item.isSuggestion) {
          const suggestion = getSgt(item.thing as SuggestionId);
          return (
            <div key={`i${suggestion.id}`}>
              <Suggestion suggestion={suggestion} time={item.time} canSearch={item.canSearch} moreStyle={lineStyle} onOpenModal={onOpenModal} showOpenModal={true}/>
            </div>
          );
        }

        return (
          <div key={`${item.thing}${i}`} style={lineStyle}>
            <InlineContainer>
              <Text text={item.thing as string}/>
              <InlineSpace size={4}/>
              {item.time ? <Text text={item.time} type={'time'}/> : null}
            </InlineContainer>
            {item.canSearch ? <Icon img={ICONS.search} link={getSearchLink(item.thing as string)} marginRight={4}/> : null}
            {item.link ? <Icon img={ICONS.link} link={item.link} marginRight={4}/> : null}
          </div>
        );
      })}
      {hasSuggestions ?
        <Button
          label={showSuggestions ? '- Hide Suggestions' : '+ Show Suggestions'}
          type={'text-button'}
          onClick={toggleSuggestions}
          moreStyle={{
            paddingInline: "0"
          }}
        />
        : null}
      {(hasSuggestions && showSuggestions) ? <Suggestions suggestionIds={shownDay.suggestions} forceCanSearch={true}/> : null}
    </div>
  );
}

function Phrase({
  phrase,
  onSave,
}: {
  phrase: Phrase;
  onSave: (args: OnSaveArgs) => void;
}) {
  const [showBigText, setShowBigText] = useState(false);
  const [showNative, setShowNative] = useState(false);

  const onView = () => {
    setShowBigText(!showBigText);
  };

  const onNative = () => {
    setShowNative(!showNative);
  }

  const bigTextStyle: CSS = {
    fontSize: '48px',
    lineHeight: '54px'
  };

  const saved = isSaved(phrase.term);

  return (
    <>
      <div>
        <div className={'pb--translated'}>{phrase.translated.join(', ')}</div>
        <div className={'pb--term'} style={showBigText ? bigTextStyle : undefined}>
          {showNative ? phrase.nativeScript : phrase.term}
          <InlineSpace size={6}/>
          <Icon img={showBigText ? ICONS.unview : ICONS.view} onClick={onView}/>
          <InlineSpace size={2}/>
          <Icon img={ICONS.translate} onClick={onNative}/>
        </div>
        <div className={'pb--pronunciation'}>{phrase.pronunciation.join(' OR ')}</div>
        <div className={'pb--notes'}>{phrase.notes}</div>
        <BlockSpace size={2}/>
        <Icon
          img={saved ? ICONS.saved : ICONS.unsaved}
          moreStyle={{
            display: 'block',
            fontSize: '24px',
            height: '24px',
            width: '24px',
            lineHeight: '24px',
          }}
          onClick={() => {onSave({key: phrase.term, item: phrase, isRemoval: saved})}}/>
      </div>
    </>
  )
}

function Section({
  name,
  color,
  children,
}: {
  name: string;
  color: string;
  children: any;
}) {
  const [open, setOpen] = useState(false);

  const title = name;
  let containerStyle: CSS = {
    background: color,
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    paddingBlock: "12px",
    paddingInline: "16px",
    marginInline: "1%",
    marginBlock: "12px",
  };

  const onToggleOpen = () => {
    setOpen(!open);
  };

  if (!open) {
    containerStyle = {
      ...containerStyle,
      cursor: "pointer"
    };

    const textStyle = {
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "36px",
    };
    return (
      <div style={containerStyle} onClick={onToggleOpen}>
        <span style={textStyle}>{title}</span>
      </div>
    );
  }

  containerStyle = {
    ...containerStyle,
    background: "#fff",
    border: `6px solid ${color}`,
  };

  return (
    <div style={containerStyle}>
      <Icon img={ICONS.close} onClick={onToggleOpen}/>
      <Header text={title} type={'h2'}/>
      <BlockSpace size={12}/>
      {children}
    </div>
  )
}

function HelpBitInfo({
  help,
  bit,
  onSave,
}: {
  help: Help;
  bit: HelpBit;
  onSave: (args: OnSaveArgs) => void;
}) {
  const style = {
    color: '#333'
  };

  const saved = isSaved(bit.id);

  return (
    <div>
      {bit.header ? <Header text={bit.header} type={'h3'} color={help.subtitleColor ?? help.color}/> : null}
      {bit.body.map((text, i) => {
        return (
          <div key={`${bit.body[0]}${i}`} style={style}>
            <span dangerouslySetInnerHTML={{__html: text}}/>
          </div>
        )
      })}
      <Icon
        img={saved ? ICONS.saved : ICONS.unsaved}
        moreStyle={{
          display: 'block',
          fontSize: '24px',
          height: '24px',
          width: '24px',
          lineHeight: '24px',
        }}
        onClick={() => {onSave({key: bit.id, item: bit, isRemoval: saved})}}/>
    </div>
  );
}

function HelpSection({
  help,
  onSave,
}: {
  help: Help;
  onSave: (args: OnSaveArgs) => void;
}) {
  const [open, setOpen] = useState(false);

  const title = help.name;
  let containerStyle: CSS = {
    background: help.color,
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    paddingBlock: "12px",
    paddingInline: "16px",
    marginInline: "1%",
    marginBlock: "12px",
  };

  const onToggleOpen = () => {
    setOpen(!open);
  };

  if (!open) {
    containerStyle = {
      ...containerStyle,
      cursor: "pointer"
    };

    const textStyle = {
      color: help.titleColor,
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "36px",
    };
    return (
      <div style={containerStyle} onClick={onToggleOpen}>
        <span style={textStyle}>{title}</span>
      </div>
    );
  }

  containerStyle = {
    ...containerStyle,
    background: "#fff",
    border: `6px solid ${help.color}`,
  };

  return (
    <div style={containerStyle}>
      <Icon img={ICONS.close} onClick={onToggleOpen}/>
      <Header text={title} type={'h2'}/>
      <BlockSpace size={12}/>
      {help.bits.map((bit, i) => {
        const divider = i < help.bits.length - 1;

        return (
          <section key={`${bit}${i}`}>
            <HelpBitInfo help={help} bit={bit} onSave={onSave}/>
            {divider ? <HorizontalDivider color={help.color} thickness={3}/> : null}
          </section>
        )

      })}
    </div>
  )
}

function Phrasebook({
  phrases,
  onSave,
}: {
  phrases: Phrase[];
  onSave: (args: OnSaveArgs) => void;
}) {
  const [open, setOpen] = useState(false);
  const title = 'Phrasebook';
  let containerStyle: CSS = {
    background: COLOR_PHRASEBOOK_PRIMARY,
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    paddingBlock: "12px",
    paddingInline: "16px",
    marginInline: "1%",
  };

  const onToggleOpen = () => {
    setOpen(!open);
  };

  if (!open) {
    containerStyle = {
      ...containerStyle,
      cursor: "pointer"
    };

    const textStyle = {
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "36px",
    };
    return (
      <div style={containerStyle} onClick={onToggleOpen}>
        <span style={textStyle}>{title}</span>
      </div>
    );
  }

  containerStyle = {
    ...containerStyle,
    background: "#fff",
    border: "6px solid #cc5757"
  };

  return (
    <div style={containerStyle}>
      <Icon img={ICONS.close} onClick={onToggleOpen}/>
      <Header text={title} type={'h2'}/>
      <BlockSpace size={12}/>
      {phrases.map((p, i) => {
        const divider = i < phrases.length - 1;
        return (
          <section key={`${p.pronunciation}${i}`}>
            <Phrase phrase={p} onSave={onSave}/>
            {divider ? <HorizontalDivider color={COLOR_PHRASEBOOK_PRIMARY} thickness={3}/> : null}
          </section>
        )

      })}
    </div>
  )
}

function Saves({
  saves,
  onUnsave,
}: {
  saves: Record<string, Saveable> | null;
  onUnsave: (args: OnSaveArgs) => void;
}) {
  const localOnUnsave = ({
    key,
  }: OnSaveArgs) => {
    onUnsave({
      key,
      item: null,
      isRemoval: true,
    });
  };

  let body;
  if (saves && Object.values(saves).length > 0) {
    const savesArray = Object.values(saves);
    body = (
      <div>
        {savesArray.map((item, i) => {
          const divider = i < savesArray.length - 1;
          let element;
          if ('term' in item) {
            const phrase = item as Phrase;
            element = <Phrase phrase={phrase} onSave={localOnUnsave}/>
          } else if  ('body' in item) {
            const helpBit = item as HelpBit;
            let helpParent = getHelpBitParent(helpBit);
            if (!helpParent) {
              console.warn('Could not find parent for helpBit ', helpBit.id, '. Defaulting to generic parent.');
              helpParent = toHelp({
                bits: [helpBit], color: "#333", name: "Help"
              });
            }
            element = <HelpBitInfo help={helpParent} bit={helpBit} onSave={localOnUnsave}/>;
          } else if ('requiredLevel' in item) {
            const suggestion = item as Suggestion;
            element = <SuggestionInfo suggestion={suggestion} onSave={localOnUnsave}/>
          } else {
            // This is an accommodation
            const accommodation = item as Accommodation;
            element = <AccommodationInfo accommodation={accommodation} onSave={localOnUnsave}/>
          }

          return (
            <div key={`saves${i}`}>
              {element}
              {divider ? <HorizontalDivider color={COLOR_SAVES} thickness={3}/> : null}
            </div>
          )
        })}
      </div>
    );
  } else {
    body = (
      <div>
        <Text text={'Nothing here yet! You can save something if it has this icon: '}/>
        <Icon img={ICONS.unsaved}/>
      </div>
    );
  }

  return (
    <Section name={'Your Saves'} color={COLOR_SAVES}>
      {body}
    </Section>
  );
}

function Home({
  shownDay
}: {
  shownDay: Day;
}) {
  const [day, setDay] = useState(shownDay);
  const [dayIndex, setDayIndex] = useState<number>(getDayIndex(shownDay));
  const [saves, setSaves] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState<Saveable | null>(null);

  if (!loaded) {
    const savesRaw = localStorage.getItem(LOCAL_STORAGE_SAVES);

    if (!savesRaw) {
      localStorage.setItem(LOCAL_STORAGE_SAVES, JSON.stringify({}));
    }

    setSaves(JSON.parse(savesRaw!));
    setLoaded(true);
  }

  const onSaveItem = ({
    key,
    item,
    isRemoval
  }: OnSaveArgs) => {
    const savesRaw = localStorage.getItem(LOCAL_STORAGE_SAVES);
    if (!savesRaw) {
      localStorage.setItem(LOCAL_STORAGE_SAVES, JSON.stringify({}));
    }

    const saves = JSON.parse(savesRaw!);

    if (isRemoval) {
      saves[key] = undefined;
      delete saves[key];
    } else {
      saves[key] = item;
    }

    localStorage.setItem(LOCAL_STORAGE_SAVES, JSON.stringify(saves));
    setSaves(saves);
  };

  const daysLength = Object.keys($TRIP.days).length;
  const onNextDay = () => {
    if (dayIndex < daysLength - 1) {
      const newDayIndex = dayIndex + 1;
      const newDay = Object.entries($TRIP.days)[newDayIndex][1];
      setDayIndex(newDayIndex);
      setDay(newDay);
    }
  };

  const onPreviousDay = () => {
    if (dayIndex > 0) {
      const newDayIndex = dayIndex - 1;
      const newDay = Object.entries($TRIP.days)[newDayIndex][1];
      setDayIndex(newDayIndex);
      setDay(newDay);
    }
  };

  const onGoToToday = () => {
    const today = getDayFromTrip();
    setDay(today);
    setDayIndex(getDayIndex(today));
  };

  const onOpenModal = (detail: Saveable) => {
    setModalOpen(true);
    setModalDetail(detail);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setModalDetail(null);
  }

  const containerStyle: CSS = {
    margin: "1%"
  };

  const accommodations = Object.values($TRIP.accommodations);
  const accommodationsLength = accommodations.length;
  const suggestions = Object.values($TRIP.suggestions);

  return (
    <>
      <div style={containerStyle}>
        <Header text={$TRIP.name} type={'h1'}/>
        <DateRange
          start={$TRIP.start}
          startFormat={DATE_FORMAT_MONTH_DAY}
          end={$TRIP.end}
          endFormat={DATE_FORMAT_MONTH_DAY+" YYYY"}
          joinWith={' - '}
          size={"14px"}
        />
        <Today shownDay={day}/>
        {dayIndex > 0 ? <Button label={'Previous Day'} type={'nextprev-button'} onClick={onPreviousDay}/> : null}
        {dayIndex> 0 ? <InlineSpace size={6}/> : null}
        {!isDayToday(day) ?
          <>
            <Button label={'Today'} type={'nextprev-button'} onClick={onGoToToday}/>
            <InlineSpace size={6}/>
          </>
          :
          null
        }
        {dayIndex < daysLength - 1 ? <Button label={'Next Day'} type={'nextprev-button'} onClick={onNextDay}/> : null}
        <Header text={day.itinerary.locations.join(', ')} type={'h2'}/>
        <TodayAccommodation shownDay={day} onOpenModal={onOpenModal}/>
        <TodayItinerary shownDay={day} onOpenModal={onOpenModal}/>
        <BlockSpace size={12}/>
        {$TRIP.goto.map((goto, i) => {
          const space = i < $TRIP.goto.length - 1;
          return (
            <InlineContainer key={`${goto.link}`}>
              <Icon img={ICONS[goto.icon]} subtitle={goto.subheader} link={goto.link} size={60} />
              {space ? <InlineSpace size={6}/> : null}
            </InlineContainer>
          );
        })}
        <BlockSpace size={8}/>
        {saves ? <Saves saves={saves} onUnsave={onSaveItem}/> : null}
        <section>
          <Phrasebook phrases={$TRIP.phrasebook} onSave={onSaveItem}/>
        </section>
        {$TRIP.help.map((help) => <HelpSection key={help.name} help={help} onSave={onSaveItem}/>)}
        <AllSuggestions suggestions={suggestions} onSaveItem={onSaveItem}/>
        <Section name={'All Accommodations'} color={COLOR_ACCOMMODATION_PRIMARY}>
          {accommodations.map((accommodation, i) => {
            const divider = i < accommodationsLength - 1;
            return (
              <div key={`aa${accommodation.name}${i}`}>
                <AccommodationInfo accommodation={accommodation} onSave={onSaveItem}/>
                {divider ? <HorizontalDivider color={COLOR_ACCOMMODATION_PRIMARY} thickness={3}/> : null}
              </div>
            );
          })}
        </Section>
      </div>
      {(modalOpen && modalDetail) ?
        <ModalContext>
          <DetailModal detail={modalDetail!} onClose={onCloseModal} onSave={onSaveItem}/>
        </ModalContext>
        :
        null
      }
    </>
  );
}

function App() {
  // @ts-ignore
  const [page, setPage] = useState<Page>('home');
  // @ts-ignore
  const [pageStack, setPageStack] = useState<Page[]>([]);
  // @ts-ignore
  const [shownDay, setShownDay] = useState<Day>(getDayFromTrip());

  let pageToRender;
  switch(page) {
    case "home":
    default:
      pageToRender = <Home shownDay={shownDay}/>;
  }

  return pageToRender;
}

export default App
