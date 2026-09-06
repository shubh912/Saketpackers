
import { useMemo, useState } from 'react';
import {
  Star,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Truck,
  ShieldCheck,
  MapPin,
  Sparkles,
  Home,
  Building2,
  Package,
  Car,
} from 'lucide-react';

const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJA4Rb4RYHmjkRgRUAjvI9Mg8';

const BUSINESS = 'Saket Packers & Movers';

const services = [
  {
    name: 'House Shifting',
    icon: Home,
  },
  {
    name: 'Office Shifting',
    icon: Building2,
  },
  {
    name: 'Local Shifting',
    icon: Truck,
  },
  {
    name: 'Intercity Shifting',
    icon: Truck,
  },
  {
    name: 'Vehicle Transportation',
    icon: Car,
  },
  {
    name: 'Packing & Unpacking',
    icon: Package,
  },
];

const keywords = [
  'Professional',
  'Reliable',
  'Punctual',
  'Careful',
  'Smooth',
  'Hassle-free',
  'Helpful',
  'Friendly',
  'Polite',
  'Efficient',
  'Well-organized',
  'Responsive',
  'Good communication',
  'Safe handling',
  'Timely service',
  'Affordable',
  'Good coordination',
  'Cooperative team',
  'Quality service',
  'Easy process',
  'Quick service',
  'Excellent packing',
  'Careful transportation',
  'On-time delivery',
  'Good experience',
  'Trustworthy',
  'Impressive service',
  'Stress-free',
  'Very satisfied',
  'Highly recommended',
];

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
    'house moving',
    'home relocation',
    'moving my household',
  ],
  'Office Shifting': [
    'office shifting',
    'office relocation',
    'office moving',
    'moving our office',
    'relocating my office',
  ],
  'Local Shifting': [
    'local shifting',
    'local moving',
    'moving within the city',
    'local relocation',
    'my local move',
  ],
  'Intercity Shifting': [
    'intercity shifting',
    'intercity relocation',
    'moving to another city',
    'long-distance shifting',
    'my intercity move',
  ],
  'Vehicle Transportation': [
    'vehicle transportation',
    'vehicle shifting',
    'car transportation',
    'vehicle relocation',
    'transporting my vehicle',
  ],
  'Packing & Unpacking': [
    'packing and unpacking',
    'packing service',
    'packing and moving',
    'household packing',
    'professional packing',
  ],
};

/*
  120+ review sentence patterns.

  Important:
  These patterns only use information selected by the customer.
  They should not be used to invent specific prices, dates,
  people, guarantees, incidents, or other facts.
*/
const templates = [
  'I had a {service} experience with {business}. The team was {keyword} and handled everything with care.',
  'Really happy with the {service} service from {business}. The entire process was {keyword}.',
  'Excellent experience with {business} for my {service}. The team was {keyword} throughout.',
  'Very satisfied with {business}. Their {service} team was {keyword} and easy to communicate with.',
  'I was impressed by the {keyword} service provided by {business} for my {service}.',
  'The team at {business} made my {service} much easier. They were {keyword} and cooperative.',
  'Great experience with {business} for {service}. The service was {keyword} from start to finish.',
  'I would recommend {business} for anyone looking for {keyword} moving services.',
  'My experience with {business} for {service} was very {keyword}.',
  'The entire {service} process with {business} was {keyword} and well handled.',
  'Very good experience with {business}. Their team provided {keyword} service during my {service}.',
  'I am happy with the way {business} handled my {service}. The team was {keyword}.',
  'The {service} service from {business} was {keyword}. Overall, a very good experience.',
  'Professional experience with {business} for {service}. The team was {keyword} and helpful.',
  'I had a smooth experience with {business} while arranging my {service}. Their service was {keyword}.',
  'Highly satisfied with the {service} service from {business}. The team was {keyword}.',
  'Good experience with {business} for my {service}. Everything was handled in a {keyword} manner.',
  'The staff at {business} was {keyword} while handling my {service}. I would recommend them.',
  'I found {business} to be a {keyword} choice for {service}. The overall experience was very good.',
  'Very impressed with the {keyword} approach of the team at {business} during my {service}.',

  'If you need {keyword} packers and movers, {business} is worth considering for {service}.',
  'I was looking for a {keyword} moving service and had a good experience with {business}.',
  'For my {service}, I chose {business} and was happy with the {keyword} service.',
  'The team provided {keyword} service during my {service}. Thank you, {business}.',
  'I appreciate the {keyword} service provided by {business} for my {service}.',
  'The complete experience with {business} was {keyword}. My {service} went smoothly.',
  'Very happy with the {keyword} support from {business} during my {service}.',
  'My {service} was handled by {business} in a {keyword} way.',
  'The team was {keyword}, which made my {service} much more comfortable.',
  'I would happily recommend {business} after my {service}. The team was {keyword}.',
  'A very {keyword} experience with {business} for my {service}.',
  'The quality of {service} from {business} was {keyword}. I am satisfied with the service.',
  'The whole {service} process was simple because the team at {business} was {keyword}.',
  'I had a positive experience with {business}. Their {service} service was {keyword}.',
  'Good service and a {keyword} team. I had a nice experience with {business} for {service}.',
  'The team at {business} handled my {service} professionally and was very {keyword}.',
  'I am glad I selected {business} for my {service}. The service was {keyword}.',
  'My overall experience with {business} was {keyword} and satisfactory.',
  'The {service} service was handled well by {business}. The team was {keyword}.',
  'I would recommend {business} to others looking for {service}. The experience was {keyword}.',

  'One of the better experiences I have had with {service}. The team at {business} was {keyword}.',
  'Very pleased with the {service} support from {business}. Everything felt {keyword}.',
  'The team made the {service} process easy and was {keyword} throughout.',
  'I had a good experience with {business} and found their {service} service {keyword}.',
  'The {keyword} team at {business} handled my {service} nicely.',
  'Thank you to {business} for providing {keyword} service for my {service}.',
  'The service was handled with professionalism and a {keyword} approach.',
  'I am very happy with the {keyword} service I received from {business}.',
  'My experience with {business} was positive, especially because the team was {keyword}.',
  'I would definitely recommend {business} for a {keyword} {service} experience.',

  'Looking for packers and movers in {location}, I chose {business} and had a {keyword} experience.',
  'Good experience with {business}, especially for anyone looking for moving services in {location}.',
  'I was searching for reliable packers in {location} and had a good experience with {business}.',
  'For anyone needing {service} in {location}, I would recommend {business} based on my experience.',
  'Happy with the {keyword} service provided by {business} in {location}.',
  'A good option for {service} in {location}. My experience with {business} was {keyword}.',
  'I had a {keyword} experience with this moving service in {location}.',
  'Very satisfied with the {service} experience from {business} in {location}.',
  'If you need moving assistance in {location}, I would recommend {business}. The service was {keyword}.',
  'Good {service} experience in {location}. The team from {business} was {keyword}.',
  'I had a positive experience with {business} while arranging my {service} in {location}.',
  'For moving services in {location}, {business} provided a {keyword} experience.',
  'My {service} in {location} was handled well by {business}. The team was {keyword}.',
  'I am satisfied with the {keyword} service from {business} for my move in {location}.',
  'A reliable choice for moving services in {location}. My experience with {business} was {keyword}.',

  'I needed {service} and {business} made the process {keyword}.',
  'The team was {keyword} and made my moving experience much easier.',
  'Everything about my {service} experience was {keyword}.',
  'I liked how {business} handled my {service}. The team was {keyword}.',
  'The service was organized well and the team was {keyword}.',
  'I had no major issues with my {service}. The team at {business} was {keyword}.',
  'The overall process was {keyword}, and I am happy with the service.',
  'The team communicated well and provided {keyword} service.',
  'My belongings were handled carefully and the overall service was {keyword}.',
  'I appreciate the effort taken by the team to provide {keyword} service.',
  'The service team was {keyword} and made the process convenient.',
  'I had a comfortable experience with {business}. Their service was {keyword}.',
  'The moving process felt {keyword} because of the team at {business}.',
  'I am satisfied with the way my {service} was handled. The team was {keyword}.',
  'The team at {business} was {keyword} and made a good impression.',

  'Excellent service from {business}. My {service} experience was {keyword}.',
  'Really good service and a {keyword} team at {business}.',
  'Very happy with {business} and their {keyword} moving service.',
  'Great experience for my {service}. The team was {keyword}.',
  'I would recommend {business} for anyone wanting a {keyword} moving experience.',
  'The {service} service was better than expected. The team was {keyword}.',
  'Good coordination and {keyword} service from {business}.',
  'The team handled my {service} with care and was {keyword}.',
  'A pleasant experience with {business}. Their service was {keyword}.',
  'I am satisfied with the service and found the team {keyword}.',

  'My {service} with {business} was handled professionally. The team was {keyword}.',
  'The team at {business} was {keyword}, polite and easy to coordinate with.',
  'Very good moving experience. {business} provided {keyword} service.',
  'The service was smooth and the team was {keyword} throughout my move.',
  'I had a {keyword} experience from beginning to end with {business}.',
  'The entire team was {keyword} and handled my {service} properly.',
  'I liked the overall service quality. The team was {keyword}.',
  'I am happy with the service provided by {business}. The team was {keyword}.',
  'My moving experience was {keyword} and I would recommend {business}.',
  'Good work by the team at {business}. They were {keyword} during my {service}.',

  'If you are looking for packers and movers in {location}, consider {business} for their {keyword} service.',
  'I had a good experience with {business} and would recommend them for {service} in {location}.',
  'For {service} in {location}, my experience with {business} was {keyword}.',
  'I was satisfied with the {keyword} moving service from {business} in {location}.',
  'Good option for anyone needing {service} in {location}. The team was {keyword}.',
  'My experience with this moving company in {location} was {keyword}.',
  'I recommend {business} for {service} in {location.} The service was {keyword}.',
  'Very happy with the {keyword} service I received in {location} from {business}.',
  'The team at {business} provided a {keyword} experience for my move in {location}.',
  'Overall, a good {service} experience with {business} in {location}.',

  'I chose {business} for my {service} and was happy with the {keyword} service.',
  'The {service} team was {keyword} and made the process straightforward.',
  'I appreciate the {keyword} service provided during my {service}.',
  'My experience with {business} was positive and the team was {keyword}.',
  'The service was well coordinated and the team was {keyword}.',
  'Very satisfied with the way {business} handled my {service}. The team was {keyword}.',
  'A smooth {service} experience with a {keyword} team.',
  'Good service from start to finish. The team was {keyword}.',
  'The team at {business} provided a {keyword} experience during my move.',
  'I had a pleasant experience with {business}. Their team was {keyword}.',

  'I would recommend {business} to friends and family for {service}. The team was {keyword}.',
  'Very good experience overall. {business} handled my {service} in a {keyword} manner.',
  'The staff was {keyword} and the overall {service} experience was good.',
  'Happy with the service and the {keyword} attitude of the team.',
  'The process was easy to manage because the team was {keyword}.',
  'My {service} was completed with a {keyword} approach from the team.',
  'I had a positive experience and found {business} very {keyword}.',
  'Good moving service with a {keyword} team. Recommended.',
  'I am pleased with the {keyword} service provided by {business}.',
  'Overall, a {keyword} and satisfactory experience with {business}.',

  'The team handled the moving work carefully and provided {keyword} service.',
  'My experience with {business} was good because the team was {keyword}.',
  'I was happy with the communication and found the team {keyword}.',
  'The service was convenient and the team was {keyword}.',
  'I had a nice experience with {business} for my {service}. The team was {keyword}.',
  'The entire process felt {keyword} and professionally managed.',
  'Good coordination from the team made my {service} easier.',
  'The service quality was good and the team was {keyword}.',
  'I would recommend {business} for their {keyword} approach to moving.',
  'Overall, I am very satisfied with my {service} experience.',

  'A dependable experience with {business}. The team was {keyword}.',
  'I found the service to be {keyword} and well managed.',
  'The team was {keyword} and took the moving work seriously.',
  'Good service experience with {business}. I especially appreciated the {keyword} team.',
  'The {service} process was handled properly and the team was {keyword}.',
  'I am glad I chose {business}. Their team was {keyword}.',
  'The service was {keyword} and communication was good throughout.',
  'Very positive experience with {business} for {service}.',
  'I would recommend them for anyone wanting {keyword} moving support.',
  'Overall, a good experience and a {keyword} team.',

  'My {service} experience with {business} was excellent. The team was {keyword}.',
  'Really satisfied with the {keyword} service from {business}.',
  'The team provided a smooth and {keyword} experience.',
  'I had a good moving experience and found the service {keyword}.',
  'Very happy with the way the team handled my {service}.',
  'The team was {keyword}, which made a big difference to the overall experience.',
  'I appreciate the professional and {keyword} service from {business}.',
  'The whole experience was positive and the team was {keyword}.',
  'I would recommend {business} based on my {keyword} experience.',
  'Good overall service from a {keyword} team.',
];

function pick<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty list');
  }

  return items[Math.floor(Math.random() * items.length)]!;
}

function getHistory(): string[] {
  try {
    const saved = localStorage.getItem('saket_review_history');

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(review: string) {
  try {
    const history = getHistory();

    const updated = [...history, review].slice(-250);

    localStorage.setItem(
      'saket_review_history',
      JSON.stringify(updated),
    );
  } catch {
    // Ignore storage errors.
  }
}

function cleanText(text: string) {
  return text
    .replace(/\{location\.\}/g, '{location}.')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateReview(
  serviceName: string,
  selectedKeywords: string[],
  rating: number,
) {
  const serviceList =
    servicePhrases[serviceName] ??
    [serviceName.toLowerCase()];

  const service = pick(serviceList);

  const keyword =
    selectedKeywords.length > 0
      ? pick(selectedKeywords).toLowerCase()
      : pick([
          'professional',
          'reliable',
          'smooth',
          'helpful',
          'careful',
        ]);

  const location = pick(locations);

  const history = getHistory();

  /*
    Try many times to avoid repeating an existing review.
  */
  for (let attempt = 0; attempt < 200; attempt++) {
    let template = pick(templates);

    /*
      Prevent exact template repetition from producing
      predictable-looking reviews.
    */
    if (attempt > 0) {
      template = pick(
        templates.filter((item) => item !== template),
      );
    }

    const secondKeywordPool = selectedKeywords.length > 1
      ? selectedKeywords
          .filter(
            (item) =>
              item.toLowerCase() !== keyword,
          )
          .map((item) => item.toLowerCase())
      : [
          'professional',
          'friendly',
          'reliable',
          'careful',
          'smooth',
          'helpful',
          'punctual',
        ];

    const keyword2 = pick(secondKeywordPool);

    let review = template
      .replaceAll('{business}', BUSINESS)
      .replaceAll('{service}', service)
      .replaceAll('{keyword}', keyword)
      .replaceAll('{location}', location);

    /*
      Some templates can contain the keyword more than once.
      Add a second keyword only occasionally to keep reviews natural.
    */
    if (
      !review.includes(keyword2) &&
      Math.random() > 0.45
    ) {
      review += ` The team was also ${keyword2}.`;
    }

    if (rating === 5) {
      review += pick([
        ' Highly recommended.',
        ' I would definitely recommend them.',
        ' Overall, a great experience.',
        ' I would happily use their service again.',
        ' Very happy with the overall service.',
        '',
      ]);
    }

    if (rating === 4) {
      review += pick([
        ' Overall, a very good experience.',
        ' I would recommend their service.',
        ' Overall, I was satisfied with the service.',
        '',
      ]);
    }

    if (rating === 3) {
      review += pick([
        ' Overall, it was a decent experience.',
        ' The overall experience was satisfactory.',
        '',
      ]);
    }

    if (rating <= 2) {
      review += pick([
        ' I hope the service can be improved further.',
        ' There is some scope for improvement.',
        '',
      ]);
    }

    review = cleanText(review);

    /*
      Avoid exact repeats and near-identical reviews.
    */
    const normalized = review
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const isDuplicate = history.some((oldReview) => {
      const oldNormalized = oldReview
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (oldNormalized === normalized) {
        return true;
      }

      /*
        Compare first ~80 characters as an additional
        protection against obvious repeated openings.
      */
      return (
        oldNormalized.slice(0, 80) ===
        normalized.slice(0, 80)
      );
    });

    if (!isDuplicate) {
      saveHistory(review);
      return review;
    }
  }

  /*
    Extremely unlikely fallback.
  */
  const fallback = `I had a ${rating >= 4 ? 'good' : 'satisfactory'} experience with ${BUSINESS} for my ${service.toLowerCase()}. The team was ${keyword}.`;

  saveHistory(fallback);

  return fallback;
}

export default function Review() {
  const [rating, setRating] = useState(5);

  const [service, setService] = useState(
    services[0]?.name ?? 'House Shifting',
  );

  const [selectedKeywords, setSelectedKeywords] =
    useState<string[]>([]);

  const [review, setReview] = useState('');

  const [copied, setCopied] = useState(false);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const selectedService = useMemo(
    () =>
      services.find(
        (item) => item.name === service,
      ),
    [service],
  );

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((current) => {
      if (current.includes(keyword)) {
        return current.filter(
          (item) => item !== keyword,
        );
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, keyword];
    });
  };

  const createReview = () => {
    setIsGenerating(true);
    setCopied(false);

    /*
      Small delay makes the generation interaction
      feel natural on mobile.
    */
    setTimeout(() => {
      const generated = generateReview(
        service,
        selectedKeywords,
        rating,
      );

      setReview(generated);
      setIsGenerating(false);
    }, 250);
  };

  const generateAnother = () => {
    createReview();
  };

  const copyReview = async () => {
    if (!review) return;

    try {
      await navigator.clipboard.writeText(review);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert(
        'Please select the review text and copy it manually.',
      );
    }
  };

  const openGoogle = async () => {
    if (!review) return;

    /*
      Copy first so the customer can paste it into
      Google's review box.
    */
    try {
      await navigator.clipboard.writeText(review);
    } catch {
      // Clipboard permission may not be available.
    }

    window.open(
      GOOGLE_REVIEW_URL,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] px-4 py-6 text-white">
      <div className="mx-auto max-w-xl">

        {/* HEADER */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Truck className="h-8 w-8 text-yellow-400" />
          </div>

          <h1 className="text-2xl font-bold">
            Share Your Experience
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Create a review in a few seconds
          </p>
        </div>

        {/* RATING */}
        <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />

            <h2 className="font-semibold">
              How was your experience?
            </h2>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setRating(value);
                  setReview('');
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border px-2 py-3 transition ${
                  rating === value
                    ? 'border-yellow-400 bg-yellow-400/15 text-yellow-300'
                    : 'border-white/10 bg-white/[0.03] text-white/60'
                }`}
              >
                <Star
                  className={`mb-1 h-5 w-5 ${
                    rating === value
                      ? 'fill-yellow-400 text-yellow-400'
                      : ''
                  }`}
                />

                <span className="text-xs">
                  {value}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* SERVICE */}
        <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-yellow-400" />

            <h2 className="font-semibold">
              Which service did you use?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {services.map((item) => {
              const Icon = item.icon;
              const active = service === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setService(item.name);
                    setReview('');
                  }}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <Icon
                    className={`mb-3 h-6 w-6 ${
                      active
                        ? 'text-yellow-400'
                        : 'text-white/60'
                    }`}
                  />

                  <div className="text-sm font-medium">
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* KEYWORDS */}
        <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />

            <h2 className="font-semibold">
              What did you like?
            </h2>
          </div>

          <p className="mb-4 text-xs text-white/50">
            Select up to 3 things that describe your
            actual experience.
          </p>

          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => {
              const active =
                selectedKeywords.includes(keyword);

              return (
                <button
                  key={keyword}
                  type="button"
                  onClick={() =>
                    toggleKeyword(keyword)
                  }
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    active
                      ? 'border-yellow-400 bg-yellow-400/15 text-yellow-300'
                      : 'border-white/10 bg-white/[0.03] text-white/70'
                  }`}
                >
                  {keyword}
                </button>
              );
            })}
          </div>

          {selectedKeywords.length > 0 && (
            <p className="mt-3 text-xs text-yellow-300">
              {selectedKeywords.length}/3 selected
            </p>
          )}
        </section>

        {/* GENERATE BUTTON */}
        <button
          type="button"
          onClick={createReview}
          disabled={isGenerating}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              Creating your review...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate My Review
            </>
          )}
        </button>

        {/* GENERATED REVIEW */}
        {review && (
          <section className="mb-5 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5">

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />

                <h2 className="font-semibold">
                  Your Review
                </h2>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                {rating} ★
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm leading-7 text-white/90">
                {review}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={copyReview}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={generateAnother}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold"
              >
                <RefreshCw className="h-4 w-4" />
                New Review
              </button>
            </div>

            <button
              type="button"
              onClick={openGoogle}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-4 font-bold text-black"
            >
              <ExternalLink className="h-5 w-5" />
              Open Google & Post Review
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-white/40">
              Your review is copied before Google opens.
              Please check it and manually tap Post on
              Google.
            </p>
          </section>
        )}

        {/* TRUST MESSAGE */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />

            <div>
              <p className="text-sm font-medium">
                Your review, your experience
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Select only the services and qualities
                that genuinely describe your experience.
              </p>
            </div>
          </div>
        </div>

        {/* LOCATION / BUSINESS */}
        <div className="pb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-white/40">
            <MapPin className="h-4 w-4" />
            Ayodhya, Uttar Pradesh
          </div>

          <p className="mt-2 text-xs text-white/30">
            {BUSINESS}
          </p>
        </div>

      </div>
    </div>
  );
}
