import './App.css'
import {type CSSProperties, type JSX, useState} from "react";
import {
  type Accommodation,
  type AccommodationId,
  type Day, type Phrase,
  type Suggestion,
  type SuggestionId,
  type SuggestionType,
  type Trip
} from "./TripData.ts";
import {Japan2026TripData} from "./japanTrip2026Data.ts";
import moment from "moment";

type CSS = Partial<CSSProperties>;

const pages = ['home'] as const;
type Page = typeof pages[number];

type HeaderType = 'h1' | 'h2' | 'inline1';
type TextType = 'bold' | 'small_header' | 'info';
type ButtonType = 'text-button' | 'standard-button' | 'nextprev-button';

type IconShape = 'round_square' | 'circle' | 'square';

const $TRIP: Trip = Japan2026TripData;

const DATE_FORMAT_MONTH_DAY = "MMM D";
const DATE_FORMAT_DOTW_DAY = "MMM Do";

const COLOR_PHRASEBOOK_PRIMARY = "#cc5757";

type IconName = 'accommodation' | 'mapLink' | 'number' | 'info' | 'link' | 'view' | 'unview' | 'close' | 'translate'
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
    </svg>
};

export function getSgt(id: SuggestionId): Suggestion {
  return $TRIP.suggestions[id];
}

export function getAcc(id: AccommodationId): Accommodation {
  return $TRIP.accommodations[id];
}

function getEmojiForSuggestionType(type: SuggestionType): string {
  switch (type) {
    case "food":
      return '🍴';
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
      return '🚏';
    case "other":
    default:
      return '';
  }
}

function isTodayWithinTrip(): boolean {
  const todayM = moment();
  const tripStartM = moment($TRIP.start);
  const tripEndM = moment($TRIP.end);
  return todayM.isSameOrAfter(tripStartM) && todayM.isSameOrBefore(tripEndM);
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
    if (dayM.day === moment(day.day).day) {
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
}: {
  text: string;
  type?: TextType;
  fontSize?: number;
  moreStyle?: CSS;
  isBlock?: boolean;
}){
  let style: CSS = {
    fontSize: fontSize ? fontSize+"px" : "16px",
    lineHeight: fontSize ?  fontSize+"px" : "16px",
    color: "#333",
    display: isBlock ? "block" : undefined
  };

  let typeStyle: CSS = {};
  if (type === 'bold') {
    typeStyle = {
      fontWeight: "bold",
    }
  }

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

  style = {
    ...style,
    ...typeStyle,
    ...moreStyle,
  };

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
      marginTop: "8px",
      marginBottom: "12px",
    };
  } else if (type === 'h2') {
    style = {
      ...style,
      color: color ?? "#333",
      fontSize: "36px",
      fontWeight: "bold",
      marginTop: "6px",
      marginBottom: "6px",
    };
  } else if (type === 'inline1') {
    style = {
      ...style,
      color: color ?? "#333",
      display: "inline-block",
      fontSize: "24px",
      fontWeight: "bold",
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
}: {
  img: JSX.Element;
  link?: string;
  onClick?: () => void;
  shape?: IconShape;
  size?: number;
  color?: string;
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

  const sizePx = size ? `${size}px` : undefined;
  const style: CSS = {
    alignItems: "center",
    background: color ?? undefined,
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    height: sizePx ?? "24px",
    userSelect: "none",
    width: sizePx ?? "24px",
    ...border,
  };

  if (link) {
    return (
      <a style={style} href={link ?? undefined} target={'_blank'}>
        {img}
      </a>
    );
  }

  return (
    <div style={style} onClick={onClick}>
      {img}
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
}: {
  label: JSX.Element;
  element: JSX.Element;
  containerStyle?: CSS;
  inline?: boolean;
}) {
  const style: CSS = {
    display: inline ? "inline-block" : undefined,
    ...containerStyle
  }
  return (
    <div style={style}>
      {label}
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

function TodayAccommodation({
  shownDay
}: {
  shownDay: Day
}) {
  const [showAddress, setShowAddress] = useState(false);
  const toggleAddress = () => {
    setShowAddress(!showAddress);
  };

  const itemStyle: CSS = {
    display: "flex",
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
              <Icon img={ICONS.accommodation} link={accommodation.link}/>
              <InlineSpace size={2}/>
              <Icon img={ICONS.mapLink} link={accommodation.mapLink}/>
              <InlineSpace size={4}/>
              <Icon img={ICONS.number} onClick={toggleAddress}/>
            </div>
            {showAddress ? <Text text={accommodation.address} isBlock={true} type={'info'}/> : null}
          </section>
        );
      })}
    </div>
  );
}

function Suggestion({
  suggestion,
  time,
}: {
  suggestion: Suggestion;
  time?: string;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const suggestionName = `${getEmojiForSuggestionType(suggestion.type)} ${suggestion.name}`;


  const style: CSS = {
    display: "flex",
  };

  // TODO add other suggestion info like where when price etc
  return (
    <>
      <div style={style}>
        <Text text={suggestionName}/>
        <InlineSpace size={2}/>
        {time ? <Text text={time}/> : null}
        {suggestion.link ? <Icon img={ICONS.link} link={suggestion.link}/> : null}
        {suggestion.mapLink ? <Icon img={ICONS.mapLink} link={suggestion.mapLink}/> : null}
        {suggestion.description ? <Icon img={ICONS.info} onClick={toggleInfo}/> : null}
      </div>
      {showInfo && suggestion.description ? <Text text={suggestion.description} isBlock={true} type={'info'}/> : null}
    </>
  );
}

function Suggestions({
  suggestionIds
}: {
  suggestionIds: SuggestionId[]
}) {
  return (
    <div>
      {suggestionIds.map((id, i) => {
        const suggestion = getSgt(id);
        return (
          <Suggestion key={`sgs${suggestion.id}${i}`} suggestion={suggestion}/>
        );
      })}
    </div>
  );
}

function TodayItinerary({
  shownDay
}: {
  shownDay: Day;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };


  const containerStyle: CSS = {
    marginLeft: "12px"
  };

  const hasSuggestions = shownDay.suggestions.length > 0;

  return (
    <div style={containerStyle}>
      {shownDay.itinerary.items.map((item, i) => {
        if (item.isSuggestion) {
          const suggestion = getSgt(item.thing as SuggestionId);

          return (
            <Suggestion key={`i${suggestion.id}`} suggestion={suggestion} time={item.time}/>
          );
        }

        return (
          <div key={`${item.thing}${i}`}>
            <Text text={item.thing as string}/>
            <InlineSpace size={2}/>
            {item.time ? <Text text={item.time}/> : null}
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
      {(hasSuggestions && showSuggestions) ? <Suggestions suggestionIds={shownDay.suggestions}/> : null}
    </div>
  );
}

function Phrase({
  phrase
}: {
  phrase: Phrase;
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
      </div>
    </>
  )
}

function Phrasebook({
  phrases,
}: {
  phrases: Phrase[];
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
            <Phrase phrase={p}/>
            {divider ? <HorizontalDivider color={COLOR_PHRASEBOOK_PRIMARY} thickness={3}/> : null}
          </section>
        )

      })}
    </div>
  )
}

function Home({
  shownDay
}: {
  shownDay: Day;
}) {
  const [day, setDay] = useState(shownDay);
  const [dayIndex, setDayIndex] = useState<number>(getDayIndex(shownDay));

  const daysLength = Object.keys($TRIP.days).length;
  const onNextDay = () => {
    if (dayIndex < daysLength - 1) {
      const newDayIndex = dayIndex + 1;
      const newDay = Object.entries($TRIP.days)[newDayIndex][1];
      setDayIndex(newDayIndex);
      setDay(newDay);
    }
  }

  const onPreviousDay = () => {
    if (dayIndex > 0) {
      const newDayIndex = dayIndex - 1;
      const newDay = Object.entries($TRIP.days)[newDayIndex][1];
      setDayIndex(newDayIndex);
      setDay(newDay);
    }
  }

  const containerStyle: CSS = {
    margin: "1%"
  };

  return (
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
      <InlineSpace size={4}/>
      {dayIndex < daysLength - 1 ? <Button label={'Next Day'} type={'nextprev-button'} onClick={onNextDay}/> : null}
      <Header text={day.itinerary.locations.join(', ')} type={'h2'}/>
      <TodayAccommodation shownDay={day}/>
      <TodayItinerary shownDay={day}/>
      <BlockSpace size={12}/>
      <section>
        <Phrasebook phrases={$TRIP.phrasebook}/>
      </section>
    </div>
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
