import React, { useMemo, useState } from "react";
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
} from "lucide-react";

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID";

const services = [
  "House Shifting",
  "Office Shifting",
  "Local Shifting",
  "Intercity Shifting",
  "Vehicle Transportation",
  "Packing & Unpacking",
];

const positiveWords = [
  "excellent",
  "professional",
  "reliable",
  "smooth",
  "helpful",
  "friendly",
  "efficient",
  "punctual",
  "careful",
  "responsive",
  "hassle-free",
  "trustworthy",
  "well-organized",
  "impressive",
  "outstanding",
];

const places = [
  "Ayodhya",
  "Faizabad",
  "Lucknow",
  "Gorakhpur",
  "Prayagraj",
  "Varanasi",
];

const templates = [
  "I had a {service} experience with {business}. The team was {word}, {word}, and very careful with everything. I would definitely recommend them.",
  "Really happy with the {service} service from {business}. The staff was {word} and {word}, and the entire process was handled very smoothly.",
  "Excellent experience with {business} for my {service}. Their team was {word}, punctual, and took good care of my belongings. Highly recommended.",
  "I was looking for a reliable moving company in {place} and chose {business}. The service was {word}, professional, and completely hassle-free.",
  "Very satisfied with {business}. Their {service} team was {word}, {word}, and handled everything with great care.",
  "One of the {word} moving services I have used in {place}. {business} made my {service} simple and stress-free.",
  "Great service from {business}. From packing to transportation, everything was handled in a {word} and professional manner.",
  "The team at {business} did a {word} job with my {service}. They arrived on time, packed everything carefully, and delivered everything safely.",
  "If you need the {word} packers and movers in {place}, I would definitely recommend {business}. My experience was excellent.",
  "Very good experience with {business} for {service}. The staff was {word}, polite, and professional throughout the process.",
  "I am impressed with the quality of service provided by {business}. Their {service} team was {word} and very careful with my belongings.",
  "Highly recommended for anyone looking for {word} packers in {place}. {business} provided excellent {service} from start to finish.",
  "The entire {service} process with {business} was {word}. Everything was explained clearly and completed on time.",
  "I had a smooth and {word} experience with {business}. Their team handled my {service} professionally.",
  "Excellent packing and moving experience. The staff at {business} was {word}, careful, and very cooperative.",
  "I would recommend {business} to anyone searching for the {word} moving service in {place}. They did a fantastic job.",
  "Very professional team and {word} service. My {service} with {business} was smooth from beginning to end.",
  "Great experience! {business} handled my {service} with care and professionalism. The whole team was {word}.",
  "I am very happy with the {service} provided by {business}. Their team was {word}, punctual, and easy to communicate with.",
  "Among the better packers and movers I have experienced in {place}. {business} provided {word} service at every step.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReview(service: string, rating: number) {
  const business = "Saket Packers & Movers";
  const place = pick(places);

  let template = pick(templates);

  const word1 = pick(positiveWords);
  const word2 = pick(positiveWords.filter((w) => w !== word1));

  let review = template
    .replaceAll("{business}", business)
    .replaceAll("{service}", service.toLowerCase())
    .replaceAll("{place}", place)
    .replace("{word}", word1)
    .replace("{word}", word2);

  if (rating === 5) {
    review += pick([
      " I would definitely use their service again.",
      " Highly recommended for a stress-free moving experience.",
      " Truly one of the best moving experiences I have had.",
      " Great work by the entire team!",
    ]);
  }

  if (rating === 4) {
    review += " Overall, a very good experience and I would recommend them.";
  }

  return review;
}

export default function Review() {
  const [rating, setRating] = useState(5);
  const [service, setService] = useState(services[0]);
  const [review, setReview] = useState("");
  const [copied, setCopied] = useState(false);

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  const createReview = () => {
    setReview(generateReview(service, rating));
    setCopied(false);
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
      alert("Please select and copy the review manually.");
    }
  };

  const openGoogle = () => {
    if (review) {
      navigator.clipboard
        .writeText(review)
        .catch(() => {});
    }

    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white px-4 py-6">
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <Truck className="h-8 w-8 text-yellow-400" />
          </div>

          <h1 className="text-2xl font-bold">
            Saket Packers & Movers
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Share your experience with us
          </p>
        </div>

        {/* Rating */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-400" />
            <h2 className="font-semibold">
              How was your experience?
            </h2>
          </div>

          <div className="flex justify-center gap-2">
            {stars.map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 transition-transform active:scale-90"
              >
                <Star
                  className={`h-9 w-9 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-center mt-3 text-sm text-gray-400">
            {rating === 5
              ? "Excellent!"
              : rating === 4
              ? "Very good"
              : rating === 3
              ? "Good"
              : rating === 2
              ? "Could be better"
              : "Needs improvement"}
          </p>
        </div>

        {/* Service */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-yellow-400" />
            <h2 className="font-semibold">
              Which service did you use?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {services.map((item) => (
              <button
                key={item}
                onClick={() => setService(item)}
                className={`rounded-xl px-3 py-3 text-sm border transition ${
                  service === item
                    ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                    : "border-white/10 bg-white/[0.03] text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={createReview}
          className="w-full rounded-xl bg-yellow-400 py-4 font-bold text-black flex items-center justify-center gap-2 hover:bg-yellow-300 transition"
        >
          <Sparkles className="h-5 w-5" />
          Generate My Review
        </button>

        {/* Review */}
        {review && (
          <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.05] p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">
                Your Review
              </h2>

              <button
                onClick={createReview}
                className="rounded-lg border border-white/10 p-2 text-gray-300 hover:text-white"
                title="Generate another review"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl bg-black/30 p-4 text-sm leading-6 text-gray-200">
              {review}
            </div>

            <button
              onClick={copyReview}
              className="mt-4 w-full rounded-xl border border-white/10 py-3 flex items-center justify-center gap-2 font-medium"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Review
                </>
              )}
            </button>

            <button
              onClick={openGoogle}
              className="mt-2 w-full rounded-xl bg-white py-3 text-black font-bold flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              Open Google & Post Review
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Your review is copied automatically before Google opens.
            </p>
          </div>
        )}

        {/* Location / SEO */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <div className="flex justify-center items-center gap-1">
            <MapPin className="h-3 w-3" />
            Ayodhya, Uttar Pradesh
          </div>

          <p className="mt-2">
            Saket Packers & Movers — trusted packing and moving service in
            Ayodhya.
          </p>
        </div>

      </div>
    </div>
  );
}
