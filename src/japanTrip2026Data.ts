import {
  toAccommodation,
  toDay, toGoTo,
  toHelp, toHelpBit,
  toItinerary,
  toItineraryItem,
  toPhrase,
  toSuggestion,
  type Trip
} from "./TripData.ts";
import moment from "moment";

const TOKYO = 'Tokyo';
const KYOTO = 'Kyoto';
// @ts-ignore
const NARA = 'Nara';
// @ts-ignore
const OSAKA = 'Osaka';
const SHIGA = 'Otsu (Shiga)';

export const Japan2026TripData: Trip = {
  name: "Japan",
  start: +moment("10/3/2026"),
  end: +moment("10/14/2026"),
  goto: [
    toGoTo({
      icon: 'logo_GoogleTranslate',
      link: 'https://translate.google.com/?sl=en&tl=ja&op=translate',
      subheader: 'Google Translate'
    }),
    toGoTo({
      icon: 'logo_WhatsApp',
      link: 'https://chat.whatsapp.com/IClKGJcwclgLJlD3IkY3BZ',
      subheader: 'WhatsApp Group'
    })
  ],
  accommodations: {
    a_tokyo1: toAccommodation({
      type: 'airbnb',
      id: 'a_tokyo1',
      name: 'Katsuhika-ku House',
      address: '2 Chome-21-12 Takasago, Katsushika City, Tokyo 125-0054',
      city: TOKYO,
      where: 'Katsuhika-ku, Tokyo',
      start: +moment("10/3/2026"),
      end: +moment("10/5/2026"),
      checkInTime: "4:00 PM",
      checkoutTime: "11:00 AM",
      link: 'https://www.airbnb.com/rooms/843063107872026876',
      mapLink: 'https://maps.app.goo.gl/9Hrv8RYbgjs98ox16',
      nearestTransit: 'https://maps.app.goo.gl/rAeYpUT8fKRMD4XJ7'
    }),
    a_kyoto: toAccommodation({
      type: 'airbnb',
      id: 'a_kyoto',
      name: 'maruco右近・左近',
      address: '108 Nishikujo Kaigacho, Minami Ward, Kyoto, 601-8439, Japan',
      city: KYOTO,
      where: 'Minami Ward, Kyoto',
      start: +moment("10/5/2026"),
      end: +moment("10/9/2026"),
      checkInTime: "4:00 PM",
      checkoutTime: "11:00 AM",
      link: 'https://www.airbnb.com/rooms/43083663',
      mapLink: 'https://goo.gl/maps/jeMTqUCfT9vyvpwv7',
      nearestTransit: 'https://maps.app.goo.gl/6Jb5XAytNupKiMP69'
    }),
    a_shiga: toAccommodation({
      type: 'hotel',
      id: 'a_shiga',
      name: 'Biwako Ryokusuitei',
      address: '520-0101 Shiga, Otsu, Ogoto 6-1-6, Japan',
      city: SHIGA,
      where: 'Otsu, on Lake Biwa',
      start: +moment("10/9/2026"),
      end: +moment("10/10/2026"),
      checkInTime: "3:00 PM",
      checkoutTime: "10:00 AM",
      link: 'https://ryokusuitei.com/',
      mapLink: 'https://maps.app.goo.gl/AGTHvoHK5QYbCJqk7',
      nearestTransit: 'https://maps.app.goo.gl/qmHpBvKm5ooGeG1v9'
    }),
    a_tokyo2: toAccommodation({
      type: 'airbnb',
      id: 'a_tokyo2',
      name: 'Taitō-ku House',
      address: '1-chōme-12-7 Minowa, Taito City, Tokyo 110-0011, Japan',
      city: TOKYO,
      where: 'Taitō-ku, Tokyo',
      start: +moment("10/10/2026"),
      end: +moment("10/14/2026"),
      checkInTime: "3:00 PM",
      checkoutTime: "11:00 AM",
      link: 'https://www.airbnb.com/l/vPAETgOm?s=67&unique_share_id=fbf04ccd-cce8-4e9e-b6bf-a4f900656197',
      mapLink: 'https://goo.gl/maps/jeMTqUCfT9vyvpwv7',
      nearestTransit: 'https://maps.app.goo.gl/1XdbFGx12Tqx9Y4D9',
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
    yasakaPagoda: toSuggestion({
      type: 'place',
      id: 'yasakaPagoda',
      name: 'Hōkan-ji Temple (Yasaka Pagoda)',
      where: 'Kyoto',
      mapLink: 'https://maps.app.goo.gl/Z8uCBmyuGGPp2hDWA'
    }),
    tokyoStation: toSuggestion({
      type: 'place',
      id: 'tokyoStation',
      name: 'Tokyo Station',
      where: 'Tokyo',
      mapLink: 'https://maps.app.goo.gl/9gjbTn3DiuGt8Qjb7'
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
            thing: 'Eat Something',
            canSearch: false
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
            time: '11:00',
            thing: 'Check-Out',
            canSearch: false
          }),
          toItineraryItem({
            time: '~12:00',
            thing: 'tokyoStation',
            isSuggestion: true,
          }),
          toItineraryItem({
            time: '13:42 - 15:57',
            thing: 'Tokyo → Kyoto by Shinkansen',
            canSearch: false,
            link: 'https://maps.app.goo.gl/Gxkh98HtViwkhZkcA'
          }),
          toItineraryItem({
            time: '~16:30',
            thing: 'Check-In',
            canSearch: false
          }),
          toItineraryItem({
            time: '~17:30',
            thing: 'yasakaPagoda',
            isSuggestion: true,
          }),
          toItineraryItem({
            thing: 'Dinner',
            canSearch: false
          })
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
        locations: [KYOTO, NARA],
        items: [],
      }),
      suggestionIds: [

      ]
    }),
    [+moment("10/8/2026")]: toDay({
      day: "10/8/2026",
      accommodationIds: ['a_kyoto'],
      itinerary: toItinerary({
        locations: [KYOTO, OSAKA],
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
        locations: [TOKYO],
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
  help: [
    toHelp({
      name: 'Japanese Pronunciation',
      color: '#23967F',
      bits: [
        toHelpBit({
          id: 'helpbit_jp1',
          body: [
            'Japanese is very easy to pronounce! In fact, if you read it like Igbo, its very close to that!',
            "",
            "<b><u>a -> ah</u> like... ah</b>",
            "<b><u>i -> ee</u> like in b<u>ee</u></b>",
            "<b><u>e -> ay</u> like in b<u>ay</u></b>",
            "<b><u>u -> oo</u> like in m<u>oo</u></b>",
            "<b><u>o -> oh</u> like... oh</b>",
            "",
            "<b>r -> spanish \"r\" or rolled r (but just rolled once)</b>",
            "<b>y -> like y in yes, never \"ee\" or \"ih\"</b>",
            " ",
            "things like <b>\"kyo\", \"ryo\", \"gya\" are NOT pronounced \"kiyo\" or \"riyo\"</b>. They are pronounced like \"kʰyo\" and \"rʰyo\". So Tokyo is not \"Tokiyo\" its \"Tokhyo\" or just Tokyo.",
            " ",
            "double letters like \"tt\" or \"cch\" means pause being for saying, like holding your breathe for a split second. So \"motto\" is like \"moh--toh\"",
            " ",
            "\"su\" in Japanese if not starting a word (so in the middle or end) often is pronounced just as an \"s\"",
            " ",
            `Japanese consonants like t, d, j, z, k, g are pronounced the same as in English. 'gi' is pronounced g-ee`,
            "Japanese words are pronounced exactly as written. There's no hidden tricks like english. So the above guide is the same no matter what you're reading. Pronunciation does not change!"
          ]
        }),
        toHelpBit({
          id: 'helpbit_jp2',
          header: 'Examples',
          body: [
            "Ikebukuro - ee-kay-boo-koo-roh",
            "Kyoto - kyoh-toh",
            "Meiji Jingu - may-jee jeen-goo",
            "Sengakuji - sayn-gah-koo-jee",
            "Yotsugi - yoh-tsu-gee",
            "Uguisudani - oo-goo-ee-soo-dah-nee",
            "Keisei - kay|ee-say|ee or kay-say",
            "Ningyocho - neen-gyoh-choh",
          ]
        })
      ]
    }),
    toHelp({
      name: 'Tips',
      color: '#3185fc',
      bits: [
        toHelpBit({
          id:'helpbit_tips1',
          header: 'Train Etiquette',
          body: [
            'Talking on metro/subway trains is okay, but keep it very low volume.',
            'Talking on the Shinkansen is completely fine.',
            '',
            'Eating on metro/subway trains is never okay. Drinking sips of a bottled drink is okay sometimes.',
            'Eating and drinking on the Shinkansen, and some commuter/long distance trains is okay.',
            '',
            `Mind your space. Keep your legs together and don't spread your arms out into other's space.`
          ],
        }),
        toHelpBit({
          id: 'helpbit_tips2',
          header: 'Trash',
          body: ['Trash cans are hard to find!', 'You can find trash cans in convenience stores, some metro stations, some malls, and rarely in parks.', 'Hold on to your trash, and always sort correctly.', 'Bottles and cans can be thrown in any bin specially made for them, usually near vending machines.']
        }),
      ]
    }),
    toHelp({
      name: `Learn About Where We're Going`,
      color: '#D6D6D6',
      titleColor: '#333',
      subtitleColor: '#333',
      bits: [
        toHelpBit({
          id: 'helpbit_l1',
          header: 'Tokyo',
          body: [
            'Tokyo is the capital city of Japan, and the largest city in Japan, as well as one of the largest in the world',
            `It's split into 23 wards, or cities. Technically, it is a special prefecture, not a city. ('A prefecture is the Japanese equivalent to a U.S. state.)`,
            `Tokyo has everything you could look for in a city, with its numerous unique neighborhoods, parks, and activities.`,
            `Tokyo is in the 'Kanto' region of Japan.`,
            '<a href="https://en.wikipedia.org/wiki/Tokyo" target="_blank">Tokyo Wikipedia</a>'
          ]
        }),
        toHelpBit({
          id: 'helpbit_l2',
          header: 'Kyoto',
          body: [
            'Kyoto is often called the cultural capital of Japan.',
            `It was the capital for almost 1000 years, and where the emperor's resided`,
            `It still retains a more traditional atmosphere; not just from Medieval Japan, but also from the mid-20th century.`,
            'The skyline is relatively low, with plenty of old, traditional Japanese housing, and temples dotting the city.',
            `Kyoto is in the 'Kansai' region of Japan.`,
            '<a href="https://en.wikipedia.org/wiki/Kyoto" target="_blank">Kyoto Wikipedia</a>'
          ]
        }),
        toHelpBit({
          id: 'helpbit_l3',
          header: 'Osaka',
          body: [
            'Osaka is the second largest city in Japan, and is often compared to Tokyo in terms of culture. Think of it as Los Angeles versus New York.',
            `The cultural center of the Kansai region, its known for its more casual and laid-back atmosphere and people; as well as good food and drinking culture.`,
            `Osaka is in the 'Kansai' region of Japan.`,
            '<a href="https://en.wikipedia.org/wiki/Osaka" target="_blank">Osaka Wikipedia</a>'
          ]
        }),
        toHelpBit({
          id: 'helpbit_l4',
          header: 'Nara',
          body: [
            'Nara is a quiet city in Nara Prefecture, just south of Kyoto.',
            `It's most famous to tourists for its large deer park and temples.`,
            `It also was once another ancient capital for Japan, and it still retains this in the city layout.`,
            `Nara is in the 'Kansai' region of Japan.`,
            '<a href="https://en.wikipedia.org/wiki/Nara_(city)" target="_blank">Nara Wikipedia</a>'
          ]
        }),
        toHelpBit({
          id: 'helpbit_l5',
          header: 'Otsu, Shiga Prefectue & Lake Biwa',
          body: [
            `Shiga is landlocked prefecture containing Lake Biwa, Japan's largest lake.`,
            `The city of Otsu (and the capital of Shiga) straddles the southern end of the lake.`,
            '<a href="https://en.wikipedia.org/wiki/Shiga_Prefecture" target="_blank">Shiga Prefecture Wikipedia</a>',
            '<a href="https://en.wikipedia.org/wiki/Lake_Biwa" target="_blank">Lake Biwa Wikipedia</a>'
          ]
        })
      ]
    })
  ],
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
      nativeScript: 'おねがいします'
    }),
    toPhrase({
      term: 'mizu',
      translated: ['water'],
      pronunciation: ['mee-zoo'],
      tags: ['service'],
      notes: [],
      nativeScript: '水'
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
      notes: [`You can use this just like English 'okay'!`, `For example, you can say it to mean something is/you are literally okay, or to politely decline something, or to say "(yes) it's okay"/"(no) I'm okay" in response to something.`],
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
      pronunciation: ['choh-toh mah-tay koo-dah-sah-ee'],
      tags: ['essential'],
      notes: [],
      nativeScript: 'ちょっと待ってください'
    }),
    toPhrase({
      term: 'gomi',
      translated: ['trash', 'garbage'],
      pronunciation: ['goh-mee'],
      tags: ['service'],
      notes: [],
      nativeScript: 'ゴミ'
    }),
  ],
};