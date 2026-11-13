/**
 * Single source of truth for the invitation.
 * Every section reads from this file — change a value here and it updates everywhere.
 *
 * Images: point to files inside /public/images (or any full URL). The demo ships with
 * original illustrated artwork (.svg). To use real photographs, drop .jpg files into
 * /public/images and change the paths below, e.g. image: "/images/groom.jpg".
 */
import { withBase } from '../utils/asset'

const data = {
  groom: {
    name: 'Dr. Rohit Rawat',
    firstName: 'Rohit',
    parents: 'Late Shri Bharat Singh Rawat Ji',
    description: 'A wonderful person with a beautiful heart.',
    image: '/images/groom.jpg',
    family: ['Son of Late Shri Bharat Singh Rawat Ji'],
  },

  bride: {
    name: 'Vrushali Patil',
    firstName: 'Vrushali',
    parents: 'Shri D.S. Patil Ji',
    description: 'A beautiful soul full of love and happiness.',
    image: '/images/bride.jpg',
    family: ['Daughter of Shri D.S. Patil Ji'],
  },

  wedding: {
    // Main day (Reception) — drives the cover, scratch cards, countdown and footer.
    date: '2026-12-02T20:00:00',
    venue: 'Tiara Palace',
    city: 'Elegant Garden',
    address: '',
    hashtag: '#RohitWedsVrushali',
    // Google Maps share link for the venue (used by every “Get Directions” button).
    mapUrl: 'https://share.google/V63JyMzRhPgHjFc63',
  },

  /** Opening message & shloka */
  invitation: {
    ganeshNamah: '॥ श्री गणेशाय नमः ॥',
    shloka: ['वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।', 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥'],
    shlokaMeaning:
      'O Lord with the curved trunk and mighty form, radiant as a million suns — please remove all obstacles from our endeavours, always.',
    greeting: 'With the blessings of our beloved elders',
    message:
      'we joyfully invite you and your family to grace the engagement, haldi, sangeet, pehnawa and reception celebrations of our children, and to bless the couple as they begin their journey together.',
    withBlessings: 'With the divine blessings of Shri Ganesh Ji',
  },

  events: [
    {
      id: 'engagement',
      name: 'Engagement Ceremony',
      date: '2026-12-01',
      time: '10:00',
      venue: 'Tiara Palace',
      image: '/images/gallery-4.svg',
      description: 'The exchange of rings in the presence of family and friends — the first step of our new journey together.',
    },
    {
      id: 'haldi',
      name: 'Haldi Ceremony',
      date: '2026-12-01',
      time: '12:00',
      venue: 'Tiara Palace',
      image: '/images/event-haldi.svg',
      description: 'A joyful afternoon of turmeric, marigold petals and blessings from family. Wear something you are happy to get colourful!',
    },
    {
      id: 'sangeet',
      name: 'Sangeet Ceremony',
      date: '2026-12-01',
      time: '20:00',
      onwards: true,
      venue: 'Tiara Palace',
      image: '/images/event-sangeet.svg',
      description: 'An evening of music, dance and dhol beats by both families, followed by dinner under a canopy of lights.',
    },
    {
      id: 'pehnawa',
      name: 'Pehnawa Ceremony',
      date: '2026-12-02',
      time: '12:00',
      venue: 'Tiara Palace',
      image: '/images/event-wedding.svg',
      description: 'A traditional ceremony of welcome and blessings as the two families come together.',
    },
    {
      id: 'reception',
      name: 'Reception Ceremony',
      date: '2026-12-02',
      time: '20:00',
      onwards: true,
      main: true,
      venue: 'Tiara Palace',
      image: '/images/event-reception.svg',
      description: 'A grand dinner under crystal chandeliers to celebrate the couple with music, laughter and your blessings.',
    },
  ],

  // Background music: starts when the guest opens the invitation. Drop an .mp3 into /public/audio
  // and point `src` at it. Leave `src` empty to turn the music (and its button) off.
  music: {
    src: '/audio/wedding-song.mp3',
    volume: 0.5,
  },

  video: {
    title: 'Our Pre-Wedding Film',
    subtitle: 'A few glimpses of the two of us before the big day',
    thumbnail: '/images/video-thumb.svg',
    // Use a local file in /public/video (mp4) … or set youtubeId to embed a YouTube film instead.
    src: '/video/prewedding-demo.mp4',
    youtubeId: '',
  },

  story: [
    {
      date: 'Destiny',
      title: 'Written in the Stars',
      text: 'Some journeys begin long before two people meet. Ours was quietly written, and it brought us to each other.',
      image: '/images/story-1.svg',
    },
    {
      date: 'Togetherness',
      title: 'Two Hearts, One Rhythm',
      text: 'Conversations that never seemed long enough, laughter that came easily and a feeling that we had found home.',
      image: '/images/story-2.svg',
    },
    {
      date: 'Blessings',
      title: 'Two Families, One Beginning',
      text: 'With the love and blessings of our parents and elders, two families are coming together to celebrate.',
      image: '/images/story-3.svg',
    },
    {
      date: '1 December 2026',
      title: 'The Engagement',
      text: 'Surrounded by loved ones at Tiara Palace, we exchange rings and promise to walk beside each other.',
      image: '/images/story-4.svg',
    },
    {
      date: '2 December 2026',
      title: 'Pehnawa & Reception',
      text: 'A day of tradition and a night of celebration. We would love for you to be there with us.',
      image: '/images/story-5.svg',
    },
  ],

  stay: [],

  gallery: [
    { src: '/images/gallery-1.svg', alt: 'The couple in an ornate palace archway', ratio: '4/5' },
    { src: '/images/gallery-2.svg', alt: 'Marigold garlands in gold light', ratio: '1/1' },
    { src: '/images/gallery-3.svg', alt: 'A flower-draped wedding mandap at dusk', ratio: '3/4' },
    { src: '/images/gallery-4.svg', alt: 'The couple exchanging rings', ratio: '4/3' },
    { src: '/images/gallery-5.svg', alt: 'Hands decorated with intricate henna', ratio: '3/4' },
    { src: '/images/gallery-6.svg', alt: 'Diyas glowing along a palace courtyard', ratio: '1/1' },
    { src: '/images/gallery-7.svg', alt: 'The couple under the moonlit palace', ratio: '4/5' },
    { src: '/images/gallery-8.svg', alt: 'The sacred fire at the wedding mandap', ratio: '4/3' },
    { src: '/images/gallery-9.svg', alt: 'A dance of petals and light', ratio: '3/4' },
  ],

  contact: {
    phone: '+917869411722',
    whatsapp: '+917869411722',
    email: '',
    familyContacts: [{ name: 'For any assistance', relation: 'Call or WhatsApp', phone: '+917869411722' }],
  },

  rsvp: {
    // Phone that receives RSVPs on WhatsApp.
    whatsappNumber: '+917869411722',
    // Optional: when you have a backend, set this URL. RSVPs will be POSTed as JSON
    // (in addition to opening WhatsApp). Leave empty for the frontend-only demo.
    endpoint: '',
    deadline: '2026-11-24',
    meals: ['Vegetarian', 'Vegetarian (Jain)', 'Vegan', 'No preference'],
    transport: ['Not required', 'Airport pickup', 'Railway station pickup', 'Local transfers only'],
  },

  footer: {
    thankYou:
      'Your presence is the most precious gift of all. We cannot wait to celebrate this beautiful beginning with you.',
    signoff: 'With love and gratitude,',
    family: 'The Rawat & Patil Families',
  },
}

export const weddingData = withBase(data)
export default weddingData
