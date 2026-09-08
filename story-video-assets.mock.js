/*
 * Development-only response shaped like a story/snaps API.
 * Every feed asset below is one completed snap: image_url and video_url are
 * returned from the same database row, so the poster and MP4 stay paired.
 * This development fixture is scoped to Firebase user
 * 0WFGgojwdrQT0s4NfLXNwLDNDWa2 (Pipi, pet_id 34842).
 */
window.STORY_VIDEO_ASSETS = [
  {
    id: '532519', snapId: '532519', userId: '322991457839353856', petId: '34842',
    kind: 'snap', date: '2026-07-30', activityId: '14208781', title: 'The Sudden Whirlwind',
    description: 'Pipi becomes a furry whirlwind, barreling toward the deer in a high-energy lunge. The buck lifts his head, ears twitching before leaping into the thicket.',
    imageUrl: './pipi-assets/snaps/pipi-532519.png',
    videoUrl: './pipi-assets/snaps/pipi-532519.mp4',
    posterUrl: './pipi-assets/snaps/pipi-532519.png',
    status: 'completed', source: 'snaps.video_url', videoTaskId: '757700'
  },
  {
    id: '512374', snapId: '512374', userId: '322991457839353856', petId: '34842',
    kind: 'snap', date: '2026-07-23', activityId: '13410675', title: 'Bound Through the Blue',
    description: "Pipi leaps through the tall blue stems, the cool petals brushing against her as she snaps playfully at the darting insect's trail.",
    imageUrl: './pipi-assets/snaps/pipi-512374.png',
    videoUrl: './pipi-assets/snaps/pipi-512374.mp4',
    posterUrl: './pipi-assets/snaps/pipi-512374.png',
    status: 'completed', source: 'snaps.video_url', videoTaskId: '757677'
  },
  {
    id: '509561', snapId: '509561', userId: '322991457839353856', petId: '34842',
    kind: 'snap', date: '2026-07-22', activityId: '13296283', title: 'A Leap of Water',
    description: 'The mountain goat leaps to a lower boulder with a sudden clatter, sending a spray of cold water flying into the air.',
    imageUrl: './pipi-assets/snaps/pipi-509561.png',
    videoUrl: './pipi-assets/snaps/pipi-509561.mp4',
    posterUrl: './pipi-assets/snaps/pipi-509561.png',
    status: 'completed', source: 'snaps.video_url', videoTaskId: '531134'
  },
  {
    id: '506511', snapId: '506511', userId: '322991457839353856', petId: '34842',
    kind: 'snap', date: '2026-07-21', activityId: '13181639', title: 'The Spinning Seal',
    description: 'Returning to the rocks, Pipi spins in a fast circle as the grey seal shifts its weight, splashing a shallow pool of water into the air.',
    imageUrl: './pipi-assets/snaps/pipi-506511.png',
    videoUrl: './pipi-assets/snaps/pipi-506511.mp4',
    posterUrl: './pipi-assets/snaps/pipi-506511.png',
    status: 'completed', source: 'snaps.video_url', videoTaskId: '519926'
  },
  {
    id: '503626', snapId: '503626', userId: '322991457839353856', petId: '34842',
    kind: 'snap', date: '2026-07-20', activityId: '13180156', title: 'Pipi perks at postcard',
    description: 'Pipi noses the postcard that appeared, recognizes her owner’s scent, steps closer with delighted, welcoming excitement as if it was meant.',
    imageUrl: './pipi-assets/snaps/pipi-503626.png',
    videoUrl: './pipi-assets/snaps/pipi-503626.mp4',
    posterUrl: './pipi-assets/snaps/pipi-503626.png',
    status: 'completed', source: 'snaps.video_url', videoTaskId: '519925'
  },
  {
    id: '503603', snapId: '503603', userId: '322991457839353856', petId: '34842',
    kind: 'snap', date: '2026-07-20', activityId: '13077709', title: 'The Spiral Resumes',
    description: 'Pipi returns to the tidal flat where the hermit crab has righted itself. She does a quick, joyful spin around the shell before sitting to watch its journey.',
    imageUrl: './pipi-assets/snaps/pipi-503603.png',
    videoUrl: './pipi-assets/snaps/pipi-503603.mp4',
    posterUrl: './pipi-assets/snaps/pipi-503603.png',
    status: 'completed', source: 'snaps.video_url', videoTaskId: '519924'
  }
];
