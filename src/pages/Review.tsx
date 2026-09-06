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
import { generateReview } from './reviewGenerator'; // adjust path if needed

const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJA4Rb4RYHmjkRgRUAjvI9Mg8';

const BUSINESS = 'Saket Packers & Movers';

const services = [
  { name: 'House Shifting', icon: Home },
  { name: 'Office Shifting', icon: Building2 },
  { name: 'Local Shifting', icon: Truck },
  { name: 'Intercity Shifting', icon: Truck },
  { name: 'Vehicle Transportation', icon: Car },
  { name: 'Packing & Unpacking', icon: Package },
];

const keywords = [
  'Professional', 'Reliable', 'Punctual', 'Careful', 'Smooth',
  'Hassle-free', 'Helpful', 'Friendly', 'Polite', 'Efficient',
  'Well-organized', 'Responsive', 'Good communication', 'Safe handling',
  'Timely service', 'Affordable', 'Good coordination', 'Cooperative team',
  'Quality service', 'Easy process', 'Quick service', 'Excellent packing',
  'Careful transportation', 'On-time delivery', 'Good experience',
  'Trustworthy', 'Impressive service', 'Stress-free', 'Very satisfied',
  'Highly recommended',
];

export default function Review() {
  const [rating, setRating] = useState(5);
  const [service, setService] = useState(services[0]?.name ?? 'House Shifting');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [review, setReview] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((current) => {
      if (current.includes(keyword)) {
        return current.filter((item) => item !== keyword);
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
    setTimeout(() => {
      const generated = generateReview(service, selectedKeywords, rating);
      setReview(generated);
      setIsGenerating(false);
    }, 250);
  };

  const copyReview = async () => {
    if (!review) return;
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Please select the review text and copy it manually.');
    }
  };

  const openGoogle = async () => {
    if (!review) return;
    try {
      await navigator.clipboard.writeText(review);
    } catch {
      // ignore
    }
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] px-4 py-6 text-white">
      <div className="mx-auto max-w-xl">
        {/* HEADER */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Truck className="h-8 w-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold">Share Your Experience</h1>
          <p className="mt-2 text-sm text-white/60">Create a review in a few seconds</p>
        </div>

        {/* RATING */}
        <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <h2 className="font-semibold">How was your experience?</h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => { setRating(value); setReview(''); }}
                className={`flex flex-col items-center justify-center rounded-2xl border px-2 py-3 transition ${
                  rating === value
                    ? 'border-yellow-400 bg-yellow-400/15 text-yellow-300'
                    : 'border-white/10 bg-white/[0.03] text-white/60'
                }`}
              >
                <Star className={`mb-1 h-5 w-5 ${rating === value ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                <span className="text-xs">{value}</span>
              </button>
            ))}
          </div>
        </section>

        {/* SERVICE */}
        <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-yellow-400" />
            <h2 className="font-semibold">Which service did you use?</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {services.map((item) => {
              const Icon = item.icon;
              const active = service === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => { setService(item.name); setReview(''); }}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`mb-3 h-6 w-6 ${active ? 'text-yellow-400' : 'text-white/60'}`} />
                  <div className="text-sm font-medium">{item.name}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* KEYWORDS */}
        <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <h2 className="font-semibold">What did you like?</h2>
          </div>
          <p className="mb-4 text-xs text-white/50">Select up to 3 things that describe your actual experience.</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => {
              const active = selectedKeywords.includes(keyword);
              return (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => toggleKeyword(keyword)}
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
            <p className="mt-3 text-xs text-yellow-300">{selectedKeywords.length}/3 selected</p>
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
                <h2 className="font-semibold">Your Review</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{rating} ★</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm leading-7 text-white/90">{review}</p>
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
                onClick={createReview}
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
              Your review is copied before Google opens. Please check it and manually tap Post on Google.
            </p>
          </section>
        )}

        {/* TRUST MESSAGE */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
            <div>
              <p className="text-sm font-medium">Your review, your experience</p>
              <p className="mt-1 text-xs leading-5 text-white/50">
                Select only the services and qualities that genuinely describe your experience.
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
          <p className="mt-2 text-xs text-white/30">{BUSINESS}</p>
        </div>
      </div>
    </div>
  );
}
