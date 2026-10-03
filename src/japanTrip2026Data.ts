import {toAccommodation, toDay, toItinerary, toItineraryItem, toPhrase, toSuggestion, type Trip} from "./TripData.ts";
import moment from "moment";

const TOKYO = 'Tokyo';
const KYOTO = 'Kyoto';
// @ts-ignore
const NARA = 'Nara';
// @ts-ignore
const OSAKA = 'Osaka';
const SHIGA = 'Shiga';

export const Japan2026TripData: Trip = {
  name: "Japan",
  start: +moment("10/3/2026"),
  end: +moment("10/14/2026"),
  goto: [],
  accommodations: {
    a_tokyo1: toAccommodation({
      type: 'airbnb',
      id: 'a_tokyo1',
      name: 'Katsuhika-ku House',
      address: '2 Chome-21-12 Takasago, Katsushika City, Tokyo 125-0054',
      city: TOKYO,
      where: 'Katsuhika-ku',
      start: +moment("10/3/2026 4:00PM"),
      end: +moment("10/5/2026 11:00AM"),
      checkInTime: "4:00 PM",
      checkoutTime: "11:00 AM",
      link: 'https://www.airbnb.com/rooms/843063107872026876',
      mapLink: 'https://maps.app.goo.gl/9Hrv8RYbgjs98ox16',
      nearestTransit: 'Keisei Takasago Station'
    }),
    a_kyoto: toAccommodation({
      type: 'airbnb',
      id: 'a_kyoto',
      name: 'maruco右近・左近',
      address: '108 Nishikujo Kaigacho, Minami Ward, Kyoto, 601-8439, Japan',
      city: KYOTO,
      where: 'Minami Ward',
      start: +moment("10/5/2026 4:00PM"),
      end: +moment("10/9/2026 11:00AM"),
      checkInTime: "4:00 PM",
      checkoutTime: "11:00 AM",
      link: 'https://www.airbnb.com/rooms/43083663',
      mapLink: 'https://goo.gl/maps/jeMTqUCfT9vyvpwv7',
      nearestTransit: 'Toji Station'
    }),
    a_shiga: toAccommodation({
      type: 'hotel',
      id: 'a_shiga',
      name: 'Biwako Ryokusuitei',
      address: '520-0101 Shiga, Otsu, Ogoto 6-1-6, Japan',
      city: SHIGA,
      where: 'Lake Biwa',
      start: +moment("10/9/2026 3:00PM"),
      end: +moment("10/10/2026 10:00AM"),
      checkInTime: "3:00 PM",
      checkoutTime: "10:00 AM",
      link: 'https://ryokusuitei.com/',
      mapLink: 'https://maps.app.goo.gl/AGTHvoHK5QYbCJqk7',
      nearestTransit: 'Ogoto Onsen'
    }),
    a_tokyo2: toAccommodation({
      type: 'airbnb',
      id: 'a_tokyo2',
      name: 'Taitō-ku House',
      address: '1-chōme-12-7 Minowa, Taito City, Tokyo 110-0011, Japan',
      city: TOKYO,
      where: 'Taitō-ku',
      start: +moment("10/10/2026 3:00PM"),
      end: +moment("10/14/2026 11:00AM"),
      checkInTime: "3:00 PM",
      checkoutTime: "11:00 AM",
      link: 'https://www.airbnb.com/l/vPAETgOm?s=67&unique_share_id=fbf04ccd-cce8-4e9e-b6bf-a4f900656197',
      mapLink: 'https://goo.gl/maps/jeMTqUCfT9vyvpwv7',
      nearestTransit: 'Minowa Station'
    })
  },
  suggestions: {
    tokiwa: toSuggestion({
      type: 'dinner',
      id: 'tokiwa',
      name: 'Tokiwa',
      description: 'Teishoku restaurant',
      where: 'Katsuhika-ku',
      mapLink: 'https://maps.app.goo.gl/5xKfzJ3oC2PDrQ9Z6'
    }),
    mintleaf: toSuggestion({
      type: 'drinks',
      id: 'mintleaf',
      name: 'Mint Leaf mojito bar',
      where: 'Roppongi',
      mapLink: 'https://maps.app.goo.gl/eDWscDNWmVrENzuE8'
    }),
    michinori: toSuggestion({
      type: 'dinner',
      id: 'michinori',
      name: 'michinori',
      where: 'Shibuya',
      mapLink: 'https://maps.app.goo.gl/fT5g2nPicvyxXJxK6'
    }),
    unagiEbisu: toSuggestion({
      type: 'dinner',
      id: 'unagiEbisu',
      name: 'Unagi Yondaime Kikukawa Yebisu Garden Place',
      description: 'Unagi (Eel) Restaurant on a High Floor',
      where: 'Ebisu',
      mapLink: 'https://maps.app.goo.gl/HceziawAgLLMSBFT8'
    }),
  },
  days: {
    [+moment("10/3/2026")]: toDay({
      day: "10/3/2026",
      accommodationIds: ['a_tokyo1'],
      itinerary: toItinerary({
        locations: [TOKYO],
        items: [
          toItineraryItem({
            thing: 'Narita → Airbnb'
          }),
          toItineraryItem({
            thing: 'Dinner'
          }),
          toItineraryItem({
            thing: 'Shibuya Crossing'
          }),
          toItineraryItem({
            thing: 'michinori',
            isSuggestion: true,
          })
        ],
      }),
      suggestionIds: ['tokiwa']
    }),
    [+moment("10/4/2026")]: toDay({
      day: "10/4/2026",
      accommodationIds: ['a_tokyo1'],
      itinerary: toItinerary({
        locations: [TOKYO],
        items: [
          toItineraryItem({
            thing: 'Asakusa, Sensō-ji'
          }),
          toItineraryItem({
            thing: 'Tokyo Station'
          }),
          toItineraryItem({
            thing: 'Imperial Palace & Gardens'
          }),
          toItineraryItem({
            thing: 'Eat Something'
          }),
          toItineraryItem({
            thing: 'Meiji Jingu + Yoyogi Park'
          }),
          toItineraryItem({
            thing: 'Harajuku'
          }),
          toItineraryItem({
            thing: 'Yoyogi Park + Meiji Jingu'
          }),
          toItineraryItem({
            thing: 'unagiEbisu',
            isSuggestion: true
          }),
        ],
      }),
      suggestionIds: [
        'mintleaf'
      ]
    }),
    [+moment("10/5/2026")]: toDay({
      day: "10/5/2026",
      accommodationIds: ['a_tokyo1', 'a_kyoto'],
      itinerary: toItinerary({
        locations: [TOKYO, KYOTO],
        items: [
          toItineraryItem({
            time: 'Around 1pm',
            thing: 'Tokyo → Kyoto by Shinkansen'
          }),
        ],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/6/2026")]: toDay({
      day: "10/6/2026",
      accommodationIds: ['a_kyoto'],
      itinerary: toItinerary({
        locations: [KYOTO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/7/2026")]: toDay({
      day: "10/7/2026",
      accommodationIds: ['a_kyoto'],
      itinerary: toItinerary({
        locations: [KYOTO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/8/2026")]: toDay({
      day: "10/8/2026",
      accommodationIds: ['a_kyoto'],
      itinerary: toItinerary({
        locations: [KYOTO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/9/2026")]: toDay({
      day: "10/9/2026",
      accommodationIds: ['a_kyoto', 'a_shiga'],
      itinerary: toItinerary({
        locations: [KYOTO, SHIGA],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/10/2026")]: toDay({
      day: "10/10/2026",
      accommodationIds: ['a_shiga','a_tokyo2'],
      itinerary: toItinerary({
        locations: [SHIGA, TOKYO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/11/2026")]: toDay({
      day: "10/11/2026",
      accommodationIds: ['a_tokyo2'],
      itinerary: toItinerary({
        locations: [TOKYO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/12/2026")]: toDay({
      day: "10/12/2026",
      accommodationIds: ['a_tokyo2'],
      itinerary: toItinerary({
        locations: [],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/13/2026")]: toDay({
      day: "10/13/2026",
      accommodationIds: ['a_tokyo2'],
      itinerary: toItinerary({
        locations: [TOKYO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/14/2026")]: toDay({
      day: "10/14/2026",
      accommodationIds: ['a_tokyo2'],
      itinerary: toItinerary({
        locations: [TOKYO],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
  },
  help: [],
  phrasebook: [
    toPhrase({
      term: 'arigatou gozaimasu',
      translated: ['thank you'],
      pronunciation: ['ah-ree-gah-toh goh-zah-ee-mah-soo', 'ah-ree-gah-toh goh-zah-ee-mah-s'],
      tags: ['essential'],
      notes: [`Just 'arigatou' is informal! Do not use with strangers!`],
      nativeScript: 'ありがとうございます'
    }),
    toPhrase({
      term: 'hai',
      translated: ['yes'],
      pronunciation: ['hah-ee', 'h-ai'],
      tags: ['essential'],
      nativeScript: 'はい'
    }),
    toPhrase({
      term: 'iie',
      translated: ['no'],
      pronunciation: ['ee-ay'],
      tags: ['essential'],
      notes: [`"nai desu", "irimasen", "daijobu" may be better in many situations.`],
      nativeScript: 'いいえ'
    }),
    toPhrase({
      term: 'sumimasen',
      translated: ['excuse me', 'sorry'],
      pronunciation: ['soo-mee-mah-sehn'],
      tags: ['essential'],
      notes: [`"excuse me" to get someone's attention, before asking a request, or asking someone to move out of the way`],
      nativeScript: 'すみません',
    }),
    toPhrase({
      term: 'gomennasai',
      translated: ['sorry'],
      pronunciation: ['soo-mee-mah-sehn'],
      tags: ['essential'],
      notes: [`Same usage as in English`],
      nativeScript: 'ごめんなさい'
    }),
    toPhrase({
      term: 'kudasai',
      translated: ['please (command/inform)'],
      pronunciation: ['koo-dah-sah-ee', 'koo-dah-s-ai'],
      tags: ['essential'],
      notes: [`Like in 'please do not do this' or 'please wait a minute'`],
      nativeScript: 'ください'
    }),
    toPhrase({
      term: 'onegaishimasu',
      translated: [ 'please (request/ask/give me/do for me)'],
      pronunciation: ["oh-nay-g-ai-shee-mah-s", 'oh-nay-gah-ee-shee-mah-su'],
      tags: ['essential'],
      notes: [`Like in 'please give me the check' or 'please warm this up for me'`, 'Generally more polite than "kudasai".'],
      nativeScript: 'おねがいしま'
    }),
    toPhrase({
      term: 'nai desu',
      translated: ['no need'],
      pronunciation: ['na-ee deh-soo', 'n-ai deh-s'],
      tags: ['essential'],
      notes: [``],
      nativeScript: 'ないです'
    }),
    toPhrase({
      term: 'daijoubu',
      translated: ['okay; to be okay'],
      pronunciation: ['dah-ee-joh-boo'],
      tags: ['essential'],
      notes: [`You can use this just like English 'okay'!`, `For example, you can say it to mean something is/you are literally okay, or to politely decline something, or to say "yes it's okay"`],
      nativeScript: '大丈夫'
    }),
    toPhrase({
      term: 'fukuro',
      translated: ['bag (especially plastic)'],
      pronunciation: ['foo-koo-roh'],
      tags: ['service'],
      notes: [`You might hear this at checkout in a store.`],
      nativeScript: 'ふくろ'
    }),
    toPhrase({
      term: 'atatame',
      translated: ['warm up'],
      pronunciation: ['ah-tah-tah-may'],
      tags: ['service'],
      notes: [`You might be asked this at checkout in a store. They are asking if you want your prepared food microwaved.`],
      nativeScript: 'あたため'
    }),

    toPhrase({
      term: 'toire',
      translated: ['toilet, restroom'],
      pronunciation: ['toh-ee-ray'],
      tags: ['help'],
      notes: [],
      nativeScript: 'トイレ'
    }),
    toPhrase({
      term: 'eigo',
      translated: ['English'],
      pronunciation: ['ay-ee-goh'],
      tags: ['essential'],
      notes: [],
      nativeScript: '英語'
    }),
    toPhrase({
      term: 'kaado',
      translated: ['card'],
      pronunciation: ['kāh-doh'],
      tags: ['service'],
      notes: [`Often means 'credit card'`, `'kurejito kaado' always means credit card.`],
      nativeScript: 'クレジトカード'
    }),
    toPhrase({
      term: 'genkin',
      translated: ['cash'],
      pronunciation: ['gayn-keen'],
      tags: ['service'],
      notes: [],
      nativeScript: '現金'
    }),
    toPhrase({
      term: 'chotto matte kudasai',
      translated: ['please wait a moment'],
      pronunciation: ['choh-toh mah-t-tay koo-dah-sah-ee'],
      tags: ['essential'],
      notes: [],
      nativeScript: 'ちょっと待ってください'
    }),
  ],
};