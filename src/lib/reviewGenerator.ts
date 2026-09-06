// src/lib/reviewGenerator.ts

export const BUSINESS = 'Saket Packers & Movers';

const locations = [
  'Ayodhya', 'Faizabad', 'Lucknow', 'Gorakhpur', 'Prayagraj', 'Varanasi',
];

const servicePhrases: Record<string, string[]> = {
  'House Shifting': ['house shifting', 'home shifting', 'house moving', 'home relocation', 'moving my household'],
  'Office Shifting': ['office shifting', 'office relocation', 'office moving', 'moving our office', 'relocating my office'],
  'Local Shifting': ['local shifting', 'local moving', 'moving within the city', 'local relocation', 'my local move'],
  'Intercity Shifting': ['intercity shifting', 'intercity relocation', 'moving to another city', 'long-distance shifting', 'my intercity move'],
  'Vehicle Transportation': ['vehicle transportation', 'vehicle shifting', 'car transportation', 'vehicle relocation', 'transporting my vehicle'],
  'Packing & Unpacking': ['packing and unpacking', 'packing service', 'packing and moving', 'household packing', 'professional packing'],
};

const serviceDetails: Record<string, string[]> = {
  'House Shifting': [
    'wrapped all my furniture in bubble wrap',
    'packed every box meticulously',
    'carefully moved my fragile items',
    'loaded and unloaded everything securely',
    'took extra precautions with my electronics',
  ],
  'Office Shifting': [
    'organised the office equipment with care',
    'disassembled and reassembled the workstations',
    'transported the files and documents safely',
    'handled the server and computers with professionalism',
    'managed the entire office move without disruption',
  ],
  'Local Shifting': [
    'completed the move within the same day',
    'navigated the city traffic efficiently',
    'kept my items safe during the short haul',
    'arrived at my new place quickly',
    'coordinated the shift without any delays',
  ],
  'Intercity Shifting': [
    'transported my belongings over a long distance',
    'ensured everything arrived intact after the long journey',
    'communicated the vehicle location throughout',
    'managed the interstate logistics smoothly',
    'delivered my goods on schedule across the city border',
  ],
  'Vehicle Transportation': [
    'loaded my car with utmost care',
    'secured the vehicle to prevent movement',
    'transported it without a single scratch',
    'handled the paperwork for the vehicle transport',
    'delivered my car in pristine condition',
  ],
  'Packing & Unpacking': [
    'provided high-quality packing materials',
    'unpacked and arranged everything at the destination',
    'labelled each box for easy identification',
    'wrapped every item individually',
    'took time to ensure nothing was damaged',
  ],
};

// 200+ templates
const templates = [
  // Basic positive reviews
  'I recently used {business} for my {service} and was thoroughly impressed. The team was {keyword} and handled everything with utmost care.',
  'My experience with {business} was excellent. They provided a {keyword} service for my {service} and the entire process was smooth.',
  'The crew from {business} was {keyword} and professional. They made my {service} completely hassle‑free.',
  'I highly recommend {business} for {service}. The staff was {keyword} and the communication was clear throughout.',
  'Booking {business} for my {service} was the best decision. The team was {keyword} and the outcome was perfect.',
  'The team at {business} did a great job with my {service}. They were {keyword} and ensured everything went smoothly.',
  'Very pleased with the {keyword} service from {business} for my {service}. Highly recommended.',
  'Great job by {business}! They made my {service} easy with their {keyword} approach.',

  // Longer, detailed reviews (2-3 sentences)
  'From start to finish, {business} exceeded my expectations for {service}. The team was {keyword} and arrived on time. They took extra care with all my belongings, and the process felt effortless. I couldn’t be happier with the result.',
  'I had a {keyword} experience with {business}. They handled my {service} with great attention to detail. The staff was polite and kept me informed at every step. The final outcome was exactly what I hoped for.',
  'Choosing {business} for my {service} was a great call. The team was {keyword} and very efficient. They packed everything securely and delivered on time. I would definitely use them again.',
  'The whole moving process with {business} was stress-free. They were {keyword} and completed my {service} quickly. Every item arrived safe and sound.',
  'I’m so glad I picked {business} for my {service}. The crew was {keyword} and handled everything with professionalism. They even helped with furniture placement. Great service!',
  'From booking to delivery, {business} provided top-notch service. For my {service}, they were {keyword} and went the extra mile. The team was respectful and neat.',
  'I had a fantastic experience with {business} for my {service}. The staff was {keyword} and the entire move was completed without any issues. I highly recommend them.',
  'The team at {business} was {keyword} and made my move easy. They kept me informed and finished my {service} ahead of schedule. Very satisfied!',

  // Reviews mentioning location
  'If you need packers and movers in {location}, look no further than {business}. Their {service} team was {keyword} and made the whole move stress‑free.',
  'I searched for a reliable moving company in {location} and found {business}. Their {service} service was {keyword} and the team handled everything with professionalism.',
  'Moving in {location} can be challenging, but {business} made it easy. They provided a {keyword} service for my {service} and I’m very satisfied.',
  'After comparing a few movers in {location}, I chose {business} for my {service}. They were {keyword} and the experience was excellent.',
  'For anyone in {location} looking for moving help, {business} is a solid choice. They were {keyword} and handled my {service} perfectly.',
  'I had a great experience with {business} while moving in {location}. The team was {keyword} and made my {service} smooth.',

  // Reviews with service-specific details (using {service_detail})
  'The team from {business} handled my {service} and did a fantastic job. They {service_detail} and were {keyword} throughout the process.',
  'I was impressed by the {keyword} approach of {business} during my {service}. They {service_detail} and ensured everything was safe.',
  'One thing that stood out during my {service} with {business} was their {keyword} team. They {service_detail} and made the experience smooth.',
  'The movers from {business} were {keyword} and went the extra mile. For my {service}, they {service_detail} and the overall experience was excellent.',
  'During my {service} with {business}, they {service_detail} and the team was {keyword} at every stage.',
  'I appreciated that during my {service}, the crew from {business} {service_detail}. Their professionalism and {keyword} attitude made all the difference.',
  'For my {service}, {business} sent a team that {service_detail} and was {keyword}. I was thoroughly impressed.',
  'The {service} was handled perfectly by {business}. They {service_detail} and were {keyword} about every detail.',

  // Reviews mentioning two keywords naturally
  'The team at {business} was both {keyword} and {keyword2}. They handled my {service} with care and professionalism.',
  'I appreciated how {keyword} and {keyword2} the staff were during my {service} with {business}. The result was a smooth, worry‑free experience.',
  'My move with {business} was positive because the crew was {keyword} and {keyword2}. They managed my {service} flawlessly.',
  'The service from {business} was {keyword} and {keyword2}. They completed my {service} without any problems.',
  'What stood out most was the {keyword} and {keyword2} approach of {business} during my {service}. I highly recommend them.',
  'The movers were not only {keyword} but also {keyword2}. This made my {service} with {business} truly enjoyable.',
  'I found the team to be {keyword} and {keyword2} – a perfect combination for a stress-free {service}.',
  'From the first call to the last box, the team was {keyword} and {keyword2}. Thank you, {business}!',

  // Rating-dependent phrasing (using {rating_phrase})
  'Overall, {rating_phrase} I would recommend {business} to anyone needing {service}.',
  'In summary, the experience was {rating_phrase} and I’m glad I chose {business}.',
  'All things considered, {rating_phrase}. I had a positive interaction with {business} for my {service}.',
  'The final verdict: {rating_phrase}. For {service}, {business} was a solid choice.',

  // Conversational & informal
  'Honestly, I was a bit worried about my {service}, but {business} totally surprised me. The team was {keyword} and everything went perfectly.',
  'I usually don’t write reviews, but I had to for {business}. Their {service} was {keyword} and I’m really happy.',
  'If you’re thinking about hiring a mover, go with {business}. They were {keyword} for my {service} and made it painless.',
  'I’m not one to exaggerate, but {business} did a {keyword} job on my {service}. Five stars!',
  'Shout out to {business} for the amazing {service}! The team was {keyword} and handled my things like they were their own.',
  'Hands down the best moving experience I’ve had. {business} was {keyword} and made my {service} a breeze.',
  '10/10 would recommend {business} for {service}. They were {keyword} and the pricing was fair.',
  'What a relief! {business} took care of my {service} in a {keyword} way. I can finally settle in without worries.',

  // Reviews emphasising communication & organisation
  'Communication with {business} was excellent. They kept me updated throughout my {service} and the team was {keyword}.',
  'I was impressed by the organised approach of {business}. For my {service}, everything was planned well and the crew was {keyword}.',
  'The team at {business} was responsive and {keyword}. They answered all my questions and made my {service} straightforward.',
  'From the initial quote to the final delivery, {business} communicated clearly and the team was {keyword}. Great experience for my {service}.',
  'Their coordination was top-notch. The crew from {business} was {keyword} and completed my {service} without a hitch.',
  'I always knew what was happening – that’s because {business} was {keyword} in communication. My {service} was handled perfectly.',
  'The staff was polite and well‑organised. They made my {service} easy by being {keyword} and responsive.',
  'Everything was well‑scheduled and the team arrived on time. {business} provided a {keyword} service for my {service}.',

  // Reviews that mention safety & care
  'They took great care of my belongings. The team was {keyword} and made sure nothing was damaged during my {service}.',
  'My items were handled with extreme care. {business} was {keyword} and ensured my {service} was safe and secure.',
  'I felt confident leaving my things to {business}. They were {keyword} and treated my possessions with respect during my {service}.',
  'The movers were very careful with my fragile items. {business} was {keyword} and completed my {service} without a single scratch.',
  'Professional and cautious – that’s how I would describe {business}. They were {keyword} and my {service} went safely.',
  'They took extra precautions to protect my furniture. The team was {keyword} and my {service} was flawless.',

  // Reviews that mention timeliness & punctuality
  'The crew arrived exactly on time and finished my {service} as promised. The team was {keyword} and efficient.',
  'I was amazed by how quickly they worked. {business} was {keyword} and my {service} was completed ahead of schedule.',
  'Punctual and quick – {business} delivered a {keyword} service for my {service}. Highly recommended.',
  'They didn’t waste a single minute. The team from {business} was {keyword} and my {service} was done in record time.',
  'On time, every time. {business} was {keyword} and my {service} went without any delays.',
  'The team was {keyword} and respected my time. My {service} with {business} was smooth and timely.',

  // Reviews that mention pricing / value
  'The price was very reasonable for the quality of service. {business} was {keyword} and my {service} was worth every rupee.',
  'Affordable and excellent – {business} provided a {keyword} service for my {service}. I’m very satisfied.',
  'I was worried about hidden charges, but {business} was transparent and {keyword}. My {service} cost exactly what they quoted.',
  'Great value for money! The team was {keyword} and my {service} with {business} was worth it.',
  'Despite the low price, the quality was top-notch. {business} was {keyword} and my {service} was handled perfectly.',
  'They offered a competitive rate without compromising on service. I found {business} to be {keyword} during my {service}.',

  // Reviews that praise the team specifically
  'The entire crew at {business} was fantastic. They were {keyword} and my {service} was a pleasure.',
  'Every member of the team was polite and helpful. {business} truly impressed me with their {keyword} service for my {service}.',
  'The workers were well‑trained and {keyword}. I couldn’t have asked for a better team for my {service}.',
  'The staff was courteous and professional. They made my {service} easy by being {keyword}.',
  'What a friendly and hard‑working team! {business} was {keyword} and my {service} was completed flawlessly.',
  'The crew was cooperative and {keyword}. I would definitely choose {business} again for any future {service}.',

  // Reviews with specific praise for packing/unpacking
  'The packing was excellent – everything was wrapped securely. {business} was {keyword} and my {service} was safe.',
  'They unpacked and arranged everything at the new place. The team was {keyword} and my {service} was truly complete.',
  'I was impressed with how they labelled every box. {business} was {keyword} and made my {service} organised.',
  'They used high-quality materials to pack my items. The team was {keyword} and my {service} was well taken care of.',
  'Unpacking was just as smooth as packing. {business} was {keyword} and my {service} was handled from start to finish.',
  'The attention to packing detail was amazing. {business} was {keyword} and my {service} went without issues.',

  // Reviews that mention office shifting specifics
  'They relocated our entire office in a single day. The team was {keyword} and managed our {service} efficiently.',
  'Our office equipment was handled with precision. {business} was {keyword} and our {service} was seamless.',
  'I appreciated how they minimised downtime. The crew from {business} was {keyword} and our {service} was done quickly.',
  'They packed our files and computers securely. {business} was {keyword} and our {service} was worry‑free.',
  'The office move was executed perfectly by {business}. They were {keyword} and our {service} went off without a hitch.',

  // Reviews that mention vehicle transportation
  'My car was transported safely and without a scratch. {business} was {keyword} and my {service} was flawless.',
  'They handled my vehicle with utmost care. The team was {keyword} and my {service} was smooth.',
  'The entire vehicle transportation process was professional. {business} was {keyword} and my {service} was stress‑free.',
  'I was nervous about shipping my car, but {business} made it easy. They were {keyword} and my {service} was excellent.',
  'My bike was delivered in perfect condition. {business} was {keyword} and my {service} exceeded expectations.',

  // Reviews that mention local shifting
  'They managed my local move in half a day. The team was {keyword} and my {service} was quick and efficient.',
  'For a local shift, {business} was perfect. They were {keyword} and my {service} was smooth.',
  'The short‑distance move was handled perfectly. {business} was {keyword} and my {service} was completed fast.',
  'They navigated city traffic like pros. The team was {keyword} and my {service} was hassle‑free.',
  'Even for a local move, they gave 100% effort. {business} was {keyword} and my {service} was great.',

  // Reviews that mention intercity/long‑distance
  'My long‑distance move was a success. {business} was {keyword} and my {service} was delivered on time.',
  'They transported my belongings across the state. The team was {keyword} and my {service} was handled carefully.',
  'I was relieved that my items arrived intact after the long journey. {business} was {keyword} and my {service} was impeccable.',
  'The intercity shifting was well-coordinated. {business} was {keyword} and my {service} was excellent.',
  'They kept me updated throughout the long haul. The team was {keyword} and my {service} was worry‑free.',

  // Reviews that express repeat business / referral
  'I’ve already recommended {business} to my friends and family. They were {keyword} and my {service} was perfect.',
  'I wouldn’t hesitate to use {business} again for any future {service}. The team was {keyword}.',
  'They’ve earned a loyal customer. {business} was {keyword} and my {service} was outstanding.',
  'I’m definitely going to hire {business} again if I need a {service}. They were {keyword}.',
  'My neighbours have also booked {business} after seeing my experience. That’s how {keyword} they were!',

  // Reviews that mention stress‑free / peace of mind
  'The entire process was stress‑free thanks to {business}. The team was {keyword} and my {service} was a breeze.',
  'I didn’t have to worry about a thing. {business} was {keyword} and managed my {service} perfectly.',
  'They gave me peace of mind by being {keyword}. My {service} with {business} was smooth and calm.',
  'Moving can be chaotic, but {business} made it peaceful. The team was {keyword} and my {service} went smoothly.',
  'I finally relaxed during the move because {business} was {keyword}. My {service} was in good hands.',

  // Additional miscellaneous templates
  'The team from {business} did a wonderful job with my {service}. Their {keyword} service is why they’re the best.',
  'If you want a no‑nonsense moving experience, {business} is the way to go. They were {keyword} and my {service} was flawless.',
  'I had a great time watching them work – they were so {keyword} during my {service}.',
  'The quality of service was beyond my expectations. {business} was {keyword} and my {service} was perfect.',
  'I wouldn’t trade my experience with {business} for anything. They were {keyword} and my {service} was amazing.',
  'A big thank you to the entire team at {business} for their {keyword} service during my {service}.',
  'Their professionalism is unmatched. {business} was {keyword} and my {service} was handled with precision.',
  'From the initial estimate to the final delivery, everything was spot on. {business} was {keyword} and my {service} was excellent.',
  'They even helped with furniture placement after unloading. That’s the kind of {keyword} service you get from {business}.',
  'I was treated like a valued customer. The team at {business} was {keyword} and my {service} was completed beautifully.',

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
  if (items.length === 0) throw new Error('Cannot pick from an empty list');
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
    localStorage.setItem('saket_review_history', JSON.stringify(updated));
  } catch {
    // ignore
  }
}

function cleanText(text: string) {
  return text
    .replace(/\{location\.\}/g, '{location}.')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateReview(
  serviceName: string,
  selectedKeywords: string[],
  rating: number,
): string {
  const serviceList = servicePhrases[serviceName] ?? [serviceName.toLowerCase()];
  const service = pick(serviceList);

  const keywordPool =
    selectedKeywords.length > 0
      ? selectedKeywords.map((k) => k.toLowerCase())
      : ['professional', 'reliable', 'smooth', 'helpful', 'careful'];

  const keyword = pick(keywordPool);
  const keyword2 = pick(
    keywordPool.filter((k) => k !== keyword).length > 0
      ? keywordPool.filter((k) => k !== keyword)
      : ['friendly', 'efficient', 'punctual', 'courteous'],
  );

  const location = pick(locations);
  const serviceDetail = pick(
    serviceDetails[serviceName] ?? ['provided excellent service'],
  );

  let ratingPhrase = '';
  if (rating === 5) ratingPhrase = 'a fantastic experience';
  else if (rating === 4) ratingPhrase = 'a very positive experience';
  else if (rating === 3) ratingPhrase = 'an average experience';
  else if (rating === 2) ratingPhrase = 'a below-average experience';
  else ratingPhrase = 'a disappointing experience';

  const history = getHistory();

  for (let attempt = 0; attempt < 300; attempt++) {
    let template = pick(templates);
    if (attempt > 0) {
      const filtered = templates.filter((t) => t !== template);
      template = pick(filtered.length ? filtered : templates);
    }

    let review = template
      .replaceAll('{business}', BUSINESS)
      .replaceAll('{service}', service)
      .replaceAll('{keyword}', keyword)
      .replaceAll('{keyword2}', keyword2)
      .replaceAll('{location}', location)
      .replaceAll('{service_detail}', serviceDetail)
      .replaceAll('{rating_phrase}', ratingPhrase);

    // Double safety – replace any leftover placeholders
    review = review
      .replaceAll('{rating_phrase}', ratingPhrase)
      .replaceAll('{service_detail}', serviceDetail)
      .replaceAll('{business}', BUSINESS)
      .replaceAll('{service}', service)
      .replaceAll('{keyword}', keyword)
      .replaceAll('{keyword2}', keyword2)
      .replaceAll('{location}', location);

    if (Math.random() > 0.55) {
      review += pick([
        ' The team was also very friendly.',
        ' They kept me informed throughout.',
        ' Everything was handled perfectly.',
        ' I would definitely recommend them.',
        ' The price was reasonable for the quality.',
        ' They didn’t damage a single thing.',
        ' It was a seamless experience from start to finish.',
        ' The crew was respectful and polite.',
        ' I felt completely at ease.',
        ' They went above and beyond what I expected.',
        ' I’m so glad I chose them.',
        ' The entire process was smooth and efficient.',
        ' They arrived right on time.',
        ' They wrapped up everything neatly.',
        ' They even helped me set up a few things.',
        ' I will surely use their service again.',
        ' Overall, a truly professional job.',
      ]);
    }

    review = cleanText(review);

    const normalized = review.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const words = normalized.split(' ').filter(Boolean);

    const isDuplicate = history.some((oldReview) => {
      const oldNormalized = oldReview.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
      const oldWords = oldNormalized.split(' ').filter(Boolean);

      const setA = new Set(oldWords);
      const setB = new Set(words);
      const intersection = [...setA].filter((w) => setB.has(w)).length;
      const union = new Set([...setA, ...setB]).size;
      const similarity = union > 0 ? intersection / union : 0;
      return similarity > 0.45;
    });

    if (!isDuplicate) {
      saveHistory(review);
      return review;
    }
  }

  const fallback = `I had a ${rating >= 4 ? 'great' : 'satisfactory'} experience with ${BUSINESS} for my ${service}. The team was ${keyword} and ${keyword2}.`;
  saveHistory(fallback);
  return fallback;
}
