

export const BUSINESS = 'Saket Packers & Movers';

/**
 * Natural Review Generator
 *
 * Style:
 * - English only (Roman script)
 * - Occasional natural Hinglish
 * - Short and conversational
 * - Avoids keyword stuffing
 * - Avoids repetitive "highly recommended" language
 * - Different review lengths and structures
 * - Keeps review history to reduce repetition
 */

const locations = [
  'Ayodhya',
  'Faizabad',
  'Lucknow',
  'Gorakhpur',
  'Prayagraj',
  'Varanasi',
];

const servicePhrases: Record<string, string[]> = {
  'House Shifting': [
    'house shifting',
    'home shifting',
    'moving my house',
    'shifting my household',
    'home move',
  ],

  'Office Shifting': [
    'office shifting',
    'office move',
    'moving our office',
    'office relocation',
  ],

  'Local Shifting': [
    'local shifting',
    'local move',
    'moving within the city',
    'short-distance shifting',
  ],

  'Intercity Shifting': [
    'intercity shifting',
    'long-distance shifting',
    'moving to another city',
    'intercity move',
  ],

  'Vehicle Transportation': [
    'vehicle transportation',
    'car transportation',
    'vehicle shifting',
    'car shifting',
    'bike transportation',
  ],

  'Packing & Unpacking': [
    'packing and unpacking',
    'packing service',
    'packing and moving',
    'household packing',
  ],
};

/* -------------------------------------------------------
   SERVICE-SPECIFIC DETAILS
------------------------------------------------------- */

const serviceDetails: Record<string, string[]> = {
  'House Shifting': [
    'The furniture was packed properly.',
    'They handled the furniture and boxes carefully.',
    'The fragile items were packed with care.',
    'Loading and unloading was done properly.',
    'Everything reached safely.',
    'The household items were handled nicely.',
    'They also helped with the heavier furniture.',
    'The packing made the move much easier.',
  ],

  'Office Shifting': [
    'The office equipment was handled carefully.',
    'The computers and furniture were packed properly.',
    'They managed the office move without much disturbance.',
    'The files and equipment were organised properly.',
    'The team worked quickly so there was less downtime.',
    'They were careful with the office furniture.',
    'The entire office was shifted without much hassle.',
  ],

  'Local Shifting': [
    'The team arrived on time.',
    'The whole move was completed fairly quickly.',
    'Loading and unloading was handled properly.',
    'There was no unnecessary delay.',
    'They managed the local move quite well.',
    'The short-distance shifting was easy with their help.',
    'Everything was done in an organised way.',
  ],

  'Intercity Shifting': [
    'Everything reached the destination safely.',
    'The long-distance move was handled well.',
    'They kept me updated during the journey.',
    'The सामान reached safely.',
    'The delivery was completed as discussed.',
    'I was happy with the condition of everything on arrival.',
    'The long-distance shifting was much easier than expected.',
  ],

  'Vehicle Transportation': [
    'My vehicle reached safely.',
    'The vehicle was handled carefully.',
    'There was no damage to the vehicle.',
    'The delivery was done properly.',
    'The transportation process was straightforward.',
    'They kept me updated about the vehicle.',
    'The vehicle was delivered in good condition.',
  ],

  'Packing & Unpacking': [
    'The packing was done properly.',
    'They used good packing material.',
    'The fragile items were packed carefully.',
    'Everything was labelled and organised.',
    'They also helped with the unpacking.',
    'The packing made the shifting much easier.',
    'The items were packed securely.',
  ],
};

/* -------------------------------------------------------
   NATURAL ENGLISH PHRASES
------------------------------------------------------- */

const EnglishOpenings = [
  'Had a good experience with {business}.',
  'Really happy with {business}.',
  'Good experience overall with {business}.',
  'I recently used {business} for my {service}.',
  'We used {business} for our {service}.',
  'My experience with {business} was good.',
  'Pretty good experience with {business}.',
  'I am happy with the service from {business}.',
  'Used {business} for my move and it went well.',
  'Glad I chose {business} for the move.',
  'Had a nice experience with the team.',
  'The shifting went quite smoothly.',
  'Overall, the moving experience was good.',
  'I was satisfied with the way they handled the move.',
  'Quite happy with how everything was managed.',
];

const EnglishMiddle = [
  'The team was polite and easy to deal with.',
  'Everyone was cooperative.',
  'The staff was helpful throughout.',
  'They arrived on time and got started quickly.',
  'The team knew what they were doing.',
  'Communication was also good.',
  'They were careful with my things.',
  'The whole process was fairly straightforward.',
  'There was no unnecessary hassle.',
  'They handled the work properly.',
  'The team was friendly and cooperative.',
  'They did what they promised.',
  'The staff was responsive whenever I called.',
  'Everything was handled without much trouble.',
  'The coordination was quite good.',
  'They made the whole process easier for me.',
];

const EnglishEndings = [
  'Would use them again.',
  'Happy with the service.',
  'Would recommend them.',
  'Overall, a good experience.',
  'Quite satisfied with the service.',
  'Good work by the team.',
  'No major issues from my side.',
  'I would choose them again.',
  'Definitely a good option for shifting.',
  'Thank you to the team.',
  'Overall I am satisfied.',
  'Good service for the price.',
];

/* -------------------------------------------------------
   ROMAN HINGLISH
   No Devanagari characters.
------------------------------------------------------- */

const HinglishOpenings = [
  'Kaafi achha experience raha with {business}.',
  'Mera experience {business} ke saath kaafi achha raha.',
  'Overall kaam badhiya raha.',
  'Shifting ke liye {business} ko choose kiya aur experience achha raha.',
  'Move ke liye {business} ko try kiya, kaafi sahi service mili.',
  'Honestly, experience kaafi smooth raha.',
  'Shifting ka kaam expected se better raha.',
  'Mujhe service overall kaafi achhi lagi.',
  'Team ke saath coordination bhi achha raha.',
];

const HinglishMiddle = [
  'Team ne kaafi achhe se handle kiya.',
  'Koi unnecessary tension nahi hui.',
  'Time par aa gaye the.',
  'Samaan ko carefully handle kiya.',
  'Team ka behaviour bhi achha tha.',
  'Kaam jaldi aur properly ho gaya.',
  'Communication bhi theek tha.',
  'Jo baat hui thi, uske according kaam kiya.',
  'Packing bhi achhi thi.',
  'Loading aur unloading properly hui.',
  'Overall kaafi hassle-free raha.',
  'Team cooperative thi.',
  'Kaam mein koi major problem nahi hui.',
];

const HinglishEndings = [
  'Overall satisfied hoon.',
  'Dobara zarurat hui to definitely use karunga.',
  'Service se happy hoon.',
  'Mere side se good experience raha.',
  'Price bhi reasonable laga.',
  'Overall paisa vasool service lagi.',
  'Team ko thanks.',
  'Achha kaam kiya team ne.',
  'Definitely recommend karunga.',
];

/* -------------------------------------------------------
   KEYWORD PHRASES
------------------------------------------------------- */

const keywordPatterns = [
  'The team was {keyword}.',
  'I found the team quite {keyword}.',
  'They were very {keyword} throughout.',
  'The service felt {keyword}.',
  'Overall, the team was {keyword} and helpful.',
  'I liked how {keyword} the team was.',
  'Their approach was quite {keyword}.',
];

/* -------------------------------------------------------
   LOCATION PHRASES
------------------------------------------------------- */

const locationOpenings = [
  'I was looking for packers and movers in {location} and chose {business}.',
  'Needed moving help in {location} and contacted {business}.',
  'I used {business} for my move in {location}.',
  'For my move in {location}, I went with {business}.',
  'I found {business} while looking for movers in {location}.',
  'Was searching for a moving service in {location} and contacted {business}.',
];

const locationEndings = [
  'Good option for moving services in {location}.',
  'Happy with the service in {location}.',
  'Would recommend them for shifting in {location}.',
  'Overall, a good experience in {location}.',
  'Quite satisfied with the service in {location}.',
];

/* -------------------------------------------------------
   SHORT REVIEWS
------------------------------------------------------- */

const shortEnglish = [
  'Good service from {business}.',
  'Really happy with the service.',
  'Good experience overall.',
  'The team was helpful and cooperative.',
  'Everything went smoothly.',
  'Satisfied with the service.',
  'Good work by the team.',
  'The move was handled properly.',
  'Pretty good experience.',
  'Would use them again.',
];

const shortHinglish = [
  'Kaafi achha experience raha.',
  'Team ne achhe se handle kiya.',
  'Overall kaam badhiya raha.',
  'Service se kaafi happy hoon.',
  'Koi major problem nahi hui.',
  'Kaam properly ho gaya.',
  'Team ka behaviour achha tha.',
  'Overall experience sahi raha.',
  'Packing bhi achhi thi.',
  'Time par kaam ho gaya.',
];

/* -------------------------------------------------------
   UTILITY FUNCTIONS
------------------------------------------------------- */

function pick<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty list');
  }

  return items[Math.floor(Math.random() * items.length)]!;
}

function getHistory(): string[] {
  try {
    const saved = localStorage.getItem('saket_review_history');

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(review: string) {
  try {
    const history = getHistory();

    const updated = [...history, review].slice(-300);

    localStorage.setItem(
      'saket_review_history',
      JSON.stringify(updated),
    );
  } catch {
    // Ignore localStorage errors.
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?])/g, '$1')
    .trim();
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Word-overlap similarity.
 *
 * Higher number = more similar.
 */
function similarity(a: string, b: string): number {
  const wordsA = normalize(a)
    .split(' ')
    .filter(Boolean);

  const wordsB = normalize(b)
    .split(' ')
    .filter(Boolean);

  const setA = new Set(wordsA);
  const setB = new Set(wordsB);

  if (setA.size === 0 || setB.size === 0) {
    return 0;
  }

  const intersection = [...setA].filter((word) =>
    setB.has(word),
  ).length;

  const union = new Set([...setA, ...setB]).size;

  return union > 0 ? intersection / union : 0;
}

function replace(
  text: string,
  values: Record<string, string>,
): string {
  let result = text;

  Object.entries(values).forEach(([key, value]) => {
    result = result.replaceAll(`{${key}}`, value);
  });

  return result;
}

/* -------------------------------------------------------
   RATING LANGUAGE
------------------------------------------------------- */

function getRatingStyle(
  rating: number,
): 'positive' | 'neutral' | 'negative' {
  if (rating >= 4) {
    return 'positive';
  }

  if (rating === 3) {
    return 'neutral';
  }

  return 'negative';
}

function getBalancedLine(rating: number): string {
  if (rating === 3) {
    return pick([
      'Overall it was okay, though a few things could have been better.',
      'The service was decent, but there is some room for improvement.',
      'It was an average experience overall.',
      'Some parts were good, while a few things could be improved.',
    ]);
  }

  if (rating === 2) {
    return pick([
      'There were a few issues that could have been handled better.',
      'The experience was okay but had some problems.',
      'Some parts of the service could definitely be improved.',
      'There were a couple of things I was not completely happy with.',
    ]);
  }

  return pick([
    'Unfortunately, the experience was not what I expected.',
    'There were several things that could have been better.',
    'I was not completely satisfied with the overall experience.',
    'The service did not go as smoothly as I had expected.',
  ]);
}

/* -------------------------------------------------------
   MAIN GENERATOR
------------------------------------------------------- */

export function generateReview(
  serviceName: string,
  selectedKeywords: string[],
  rating: number,
): string {
  const serviceOptions =
    servicePhrases[serviceName] ??
    [serviceName.toLowerCase()];

  const service = pick(serviceOptions);

  const keywordPool =
    selectedKeywords
      .map((keyword) => keyword.trim().toLowerCase())
      .filter(Boolean);

  const fallbackKeywords = [
    'helpful',
    'reliable',
    'careful',
    'friendly',
    'professional',
    'punctual',
    'efficient',
  ];

  const availableKeywords =
    keywordPool.length > 0
      ? keywordPool
      : fallbackKeywords;

  const keyword = pick(availableKeywords);

  const detailPool =
    serviceDetails[serviceName] ??
    ['They handled everything properly.'];

  const detail = pick(detailPool);

  const location = pick(locations);

  const history = getHistory();

  const ratingStyle = getRatingStyle(rating);

  /* -----------------------------------------------------
     1. NEGATIVE / NEUTRAL
  ----------------------------------------------------- */

  if (ratingStyle !== 'positive') {
    const balancedTemplates = [
      '{opening} {balanced}',
      '{opening} {middle} {balanced}',
      '{opening} {detail} {balanced}',
      '{hinglishOpening} {hinglishMiddle} {balanced}',
    ];

    for (let attempt = 0; attempt < 150; attempt++) {
      const useHinglish = Math.random() < 0.25;

      const template = pick(balancedTemplates);

      let review = replace(template, {
        opening: useHinglish
          ? pick(HinglishOpenings)
          : pick(EnglishOpenings),

        middle: useHinglish
          ? pick(HinglishMiddle)
          : pick(EnglishMiddle),

        hinglishOpening: pick(HinglishOpenings),
        hinglishMiddle: pick(HinglishMiddle),

        detail,

        balanced: getBalancedLine(rating),

        service,
      });

      review = cleanText(review);

      const duplicate = history.some(
        (oldReview) =>
          similarity(oldReview, review) > 0.50,
      );

      if (!duplicate) {
        saveHistory(review);
        return review;
      }
    }
  }

  /* -----------------------------------------------------
     2. VERY SHORT REVIEW
     
     Around 12% of positive reviews are intentionally
     very short. This helps the output feel realistic.
  ----------------------------------------------------- */

  if (Math.random() < 0.12) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const useHinglish = Math.random() < 0.35;

      let review = useHinglish
        ? pick(shortHinglish)
        : pick(shortEnglish);

      review = replace(review, {
        business: BUSINESS,
        service,
      });

      review = cleanText(review);

      const duplicate = history.some(
        (oldReview) =>
          similarity(oldReview, review) > 0.60,
      );

      if (!duplicate) {
        saveHistory(review);
        return review;
      }
    }
  }

  /* -----------------------------------------------------
     3. NORMAL POSITIVE REVIEW
  ----------------------------------------------------- */

  for (let attempt = 0; attempt < 300; attempt++) {
    /*
     * Roughly:
     * 65% English
     * 25% light Hinglish
     * 10% more Hinglish
     */

    const random = Math.random();

    let language:
      | 'english'
      | 'light-hinglish'
      | 'hinglish';

    if (random < 0.65) {
      language = 'english';
    } else if (random < 0.90) {
      language = 'light-hinglish';
    } else {
      language = 'hinglish';
    }

    let opening: string;
    let middle: string;
    let ending: string;

    if (language === 'english') {
      opening = pick(EnglishOpenings);
      middle = pick(EnglishMiddle);
      ending = pick(EnglishEndings);
    } else if (language === 'light-hinglish') {
      /*
       * Mostly English with only one Hinglish sentence.
       */
      opening = pick(EnglishOpenings);

      middle =
        Math.random() < 0.5
          ? pick(HinglishMiddle)
          : pick(EnglishMiddle);

      ending =
        Math.random() < 0.5
          ? pick(EnglishEndings)
          : pick(HinglishEndings);
    } else {
      opening = pick(HinglishOpenings);
      middle = pick(HinglishMiddle);
      ending = pick(HinglishEndings);
    }

    let reviewParts: string[] = [];

    /*
     * Opening
     */
    reviewParts.push(
      replace(opening, {
        business: BUSINESS,
        service,
      }),
    );

    /*
     * Add middle observation.
     */
    reviewParts.push(middle);

    /*
     * Service-specific detail.
     *
     * This is included often, but not always.
     */
    if (Math.random() < 0.62) {
      reviewParts.push(detail);
    }

    /*
     * Keyword appears only occasionally.
     *
     * This prevents obvious keyword stuffing.
     */
    if (Math.random() < 0.30) {
      const keywordSentence = replace(
        pick(keywordPatterns),
        { keyword },
      );

      reviewParts.push(keywordSentence);
    }

    /*
     * Ending is optional.
     */
    if (Math.random() < 0.48) {
      reviewParts.push(ending);
    }

    let review = reviewParts.join(' ');

    /*
     * Occasionally mention location.
     *
     * Not every review should contain the location.
     */
    if (Math.random() < 0.15) {
      if (Math.random() < 0.55) {
        review = `${review} ${replace(
          pick(locationEndings),
          { location },
        )}`;
      } else {
        review =
          `${replace(pick(locationOpenings), {
            business: BUSINESS,
            location,
          })} ${review}`;
      }
    }

    /*
     * Occasionally mention service explicitly if the
     * opening didn't already contain it.
     */
    if (
      !review
        .toLowerCase()
        .includes(service.toLowerCase()) &&
      Math.random() < 0.45
    ) {
      review =
        `${review} It was for my ${service}.`;
    }

    review = cleanText(review);

    /*
     * Avoid extremely long generated reviews.
     *
     * Natural Google reviews are usually concise.
     */
    const wordCount = review
      .split(/\s+/)
      .filter(Boolean)
      .length;

    if (wordCount > 70) {
      continue;
    }

    /*
     * Duplicate check.
     *
     * 0.48 means reviews with substantially similar wording
     * will be rejected.
     */
    const duplicate = history.some(
      (oldReview) =>
        similarity(oldReview, review) > 0.48,
    );

    if (!duplicate) {
      saveHistory(review);
      return review;
    }
  }

  /* -----------------------------------------------------
     4. FALLBACK
  ----------------------------------------------------- */

  const fallback =
    rating >= 4
      ? `Good experience with ${BUSINESS}. The team handled my ${service} properly and I was happy with the service.`
      : `My experience with ${BUSINESS} for ${service} was okay, though there is some room for improvement.`;

  saveHistory(fallback);

  return fallback;
}
