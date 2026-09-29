import { StoryBook } from '../types/book';

import coverImg from '../assets/images/book_cover_cartographer_1790661137702.jpg';
import studyImg from '../assets/images/chapter_astrolabe_study_1790661151277.jpg';
import clockworkGateImg from '../assets/images/chapter_clockwork_gate_1790661162611.jpg';
import observatoryImg from '../assets/images/chapter_celestial_observatory_1790661174528.jpg';

export const STORY_BOOK: StoryBook = {
  title: 'The Clockwork Cartographer',
  subtitle: 'Of Valenholt & The Starlit Meridian',
  author: 'Evelyn Vance',
  authorBio: 'Historian of speculative geographic instruments and fellow of the Antiquarian Society of Valenholt.',
  coverImage: coverImg,
  description: 'In the candle-lit undercrofts of the Grand Library of Valenholt, an apprentice mapmaker discovers a living atlas powered by clockwork constellations. As the brass gears tick, coastlines shift, and a forgotten sanctuary reappears in the mists.',
  genre: 'Literary Fantasy & Antiquarian Mystery',
  publishedYear: 'Valenholt Chronicle · MDCCCLXXXIV',
  estimatedTotalReadMinutes: 18,
  totalWords: 4320,
  chapters: [
    {
      chapterNumber: 1,
      title: 'Chapter I: The Brass Astrolabe',
      subtitle: 'Echoes in the Dusty Undercroft',
      startPage: 1,
      endPage: 3,
      summary: 'Liora finds an uncatalogued brass instrument tucked behind centuries of celestial globes.',
      illustration: studyImg,
    },
    {
      chapterNumber: 2,
      title: 'Chapter II: The Living Meridian',
      subtitle: 'When Cartography Defies the Horizon',
      startPage: 4,
      endPage: 6,
      summary: 'The gears engage, and ink on ancient vellum begins to redraw the mountains of Elderwood.',
      illustration: clockworkGateImg,
    },
    {
      chapterNumber: 3,
      title: 'Chapter III: The Celestial Observatory',
      subtitle: 'Starlight Through Fractured Prism Glass',
      startPage: 7,
      endPage: 9,
      summary: 'High above the mist-veiled pines, an abandoned dome mirrors the heavens in perfect bronze alignment.',
      illustration: observatoryImg,
    },
    {
      chapterNumber: 4,
      title: 'Chapter IV: The Cartographer’s Oath',
      subtitle: 'The Map That Whispers The Dawn',
      startPage: 10,
      endPage: 13,
      summary: 'A secret kept for three hundred years is entrusted to the one who learned to listen to the gears.',
      illustration: studyImg,
    },
  ],
  pages: [
    // CHAPTER 1 - PAGE 1
    {
      id: 1,
      pageNumber: 1,
      chapterIndex: 0,
      chapterNumber: 1,
      chapterTitle: 'Chapter I: The Brass Astrolabe',
      chapterSubtitle: 'Echoes in the Dusty Undercroft',
      isChapterOpening: true,
      illustration: studyImg,
      illustrationCaption: 'The drafting study of Arch-Archivist Corvus Vance at twilight.',
      paragraphs: [
        'It was universally agreed among the elders of Valenholt that parchment had no heartbeat. Maps, they insisted during tedious council lectures, were dead records of immovable stones, measured latitudes, and rivers that surrendered strictly to gravity. Yet on the damp Tuesday night when the autumn gales rattled the leaded glass of the Undercroft, Liora heard the paper breathing.',
        'The sound was fragile—not unlike the scuttle of dry beetles behind oak wainscoting or the faint rustle of cedar shavings beneath a plane. She set down her goose quill, its nib still dark with iron gall ink, and raised the brass oil lamp. Shadows leaped like nervous courtiers across floor-to-ceiling rows of bound navigational folios, each stamped in tarnished gold leaf with the imperial seals of dead sea captains.',
        'At the lowest shelf, where the stone flags wept moisture into ancient morocco leather, sat an oblong chest of oxidized copper. Its clasp had not been opened since the great river thaw of the previous century.'
      ],
      footnote: 'Folio Vance 14-B: "Catalog of Unverified Celestial Curiosities," Archive Vault VII.'
    },

    // CHAPTER 1 - PAGE 2
    {
      id: 2,
      pageNumber: 2,
      chapterIndex: 0,
      chapterNumber: 1,
      chapterTitle: 'Chapter I: The Brass Astrolabe',
      paragraphs: [
        'Inside lay neither silver coins nor dried medicinal herbs, but an astrolabe constructed entirely of layered rose-brass and smoked crystal. Unlike the rigid navigational disks taught in the academies, this instrument had seventeen concentric rings that floated upon needle-fine ruby pivots. When Liora touched the outer rim, a warmth coursed through her fingertips like tea steeped over embers.',
        'A soft chime resonated in the ribcage of the room. It was not iron striking bronze; it was the chime of an accurate hour arriving in an inaccurate world.',
        'Beneath the crystal lens, microscopic engravings revealed not the standard zodiacal houses, but an unfamiliar topography: jagged coastlines, inland fjords bordered by evergreen forests, and a central spiral marked simply with the glyph for an eternal hearth.'
      ],
      pullQuote: {
        text: 'The stars do not wander by chance; it is our instruments that have forgotten the rhythm of their tread.',
        attribution: 'Master Malakor, Notes on the Celestial Verge'
      }
    },

    // CHAPTER 1 - PAGE 3
    {
      id: 3,
      pageNumber: 3,
      chapterIndex: 0,
      chapterNumber: 1,
      chapterTitle: 'Chapter I: The Brass Astrolabe',
      paragraphs: [
        'Liora drew the astrolabe closer to the yellow halo of her lamp. As she rotated the lunar index three degrees eastward, the vellum sheet spread across her drafting table trembled.',
        'The ink—dry for over three decades—swirled like squid dye stirred into clear tide pools. Mountain ridges drawn by hands long buried shifted southward by half an inch. The contours of the River Orel flexed, carving a new delta through the painted marshes.',
        '“Archivist Corvus warned me,” she whispered to the empty shelves. “He said the ancients did not merely survey territories; they negotiated with them.”',
        'From deep within the cathedral spire above the library, midnight struck twelve solemn peals. With the final reverberation, a hidden drawer in the astrolabe base sprang open, releasing a fragrance of dried lavender and resin.'
      ]
    },

    // CHAPTER 2 - PAGE 4
    {
      id: 4,
      pageNumber: 4,
      chapterIndex: 1,
      chapterNumber: 2,
      chapterTitle: 'Chapter II: The Living Meridian',
      chapterSubtitle: 'When Cartography Defies the Horizon',
      isChapterOpening: true,
      illustration: clockworkGateImg,
      illustrationCaption: 'The ancient moss-covered bronze gateway discovered on the perimeter map.',
      paragraphs: [
        'Dawn came not with sunbeams, but with the smoky lilac mist that regularly rolled down from the Crags of Valenholt. Liora had not slept. She stood on the balcony of the third terrace, holding the newly unfolded meridian scroll against the morning breeze.',
        'The parchment had stopped shifting, but in its center burned a luminescent cipher. It marked an coordinates zeroed upon the Weeping Hollow—a forbidden tract of primeval spruce where compass needles spun like agitated dancers.',
        '“If you venture into the Hollow with standard sextants, you will circle your own tracks until starvation claims you,” her uncle Corvus used to say while cleaning his spectacles on his frayed velvet lapel. “For in that woods, the land itself possesses memory.”'
      ],
      pullQuote: {
        text: 'To map a living land is not to capture it in lines; it is to invite it into conversation.',
        attribution: 'The Guild Chronicle, Chapter VII'
      }
    },

    // CHAPTER 2 - PAGE 5
    {
      id: 5,
      pageNumber: 5,
      chapterIndex: 1,
      chapterNumber: 2,
      chapterTitle: 'Chapter II: The Living Meridian',
      paragraphs: [
        'By noon she had packed her oiled-canvas rucksack: three graphite leads, a calibrated folding rule of boxwood, half a loaf of rye bread, and the copper astrolabe wrapped in clean flannel.',
        'Her horse, a stout dun mare named Thistle, snorted nervously as they passed beneath the stone gatekeeper towers. The guards barely glanced down from their game of dice; apprentices often rode into the outer commons to collect soil samples or measure boundary milestones.',
        'Yet Liora turned her rein toward the ridge where no wagon tracks lingered. As the canopy of ancient spruces closed overhead, the bird calls dimmed into an expectant hush, replaced by a rhythmic ticking that seemed to vibrate from the very roots beneath Thistle’s hooves.'
      ]
    },

    // CHAPTER 2 - PAGE 6
    {
      id: 6,
      pageNumber: 6,
      chapterIndex: 1,
      chapterNumber: 2,
      chapterTitle: 'Chapter II: The Living Meridian',
      paragraphs: [
        'There, partially swallowed by ancient burls and emerald moss, stood an archway of interlocking bronze cogs. Each cog was as wide as a carriage wheel, with teeth carved in archaic runic scripts.',
        'As Liora dismounted and held the astrolabe aloft, the smallest gear atop the arch let out a high musical tone. Slowly, with the dignified grace of a sleeping titan waking, the massive gears began to rotate.',
        'Mist poured through the teeth of the wheels like white water tumbling over mill dams. Beyond the threshold, where there should have been only dense briars and rock falls, an immaculate path of flagstones spiraled upward toward an impossible mountain.'
      ],
      footnote: 'Recorded in the Lost Diaries of Valenholt: "The forest breathes in measures of sixty seconds per breath."'
    },

    // CHAPTER 3 - PAGE 7
    {
      id: 7,
      pageNumber: 7,
      chapterIndex: 2,
      chapterNumber: 3,
      chapterTitle: 'Chapter III: The Celestial Observatory',
      chapterSubtitle: 'Starlight Through Fractured Prism Glass',
      isChapterOpening: true,
      illustration: observatoryImg,
      illustrationCaption: 'The forgotten Solarium Observatory atop Mount Caelum.',
      paragraphs: [
        'The mountain path ascended through layers of violet fog until the sky opened into a dome of indigo clarity. Above Liora, twin moons hung suspended like silver discs pinned to velvet cloth. And perched on the crag’s precipice stood the Solarium Observatory.',
        'Constructed from obsidian stone and ribs of gilded iron, the structure had remained hidden from the valley below for centuries, cloaked by the shifting curvature that the astrolabe controlled.',
        'Inside, dust motes danced in beams of pale lunar radiance. Great brass tubes angled upward through the rotating cupola, their lenses ground with such astonishing precision that they could count the rings of distant wanderers.'
      ]
    },

    // CHAPTER 3 - PAGE 8
    {
      id: 8,
      pageNumber: 8,
      chapterIndex: 2,
      chapterNumber: 3,
      chapterTitle: 'Chapter III: The Celestial Observatory',
      paragraphs: [
        'At the center of the rotunda was a table fifty feet wide, carved from a single slab of white marble. Sunk into the stone was an intricate clockwork sphere—an orrery containing miniature planets made of lapis lazuli, carnelian, and banded agate.',
        'As Liora placed her astrolabe into the vacant receptacle at the meridian prime, a resonant humming filled the chamber. One by one, constellations drawn on the vaulted ceiling sparked with blue phosphor.',
        '“Welcome, Cartographer,” whispered a voice that belonged to neither man nor woman, but seemed to echo from the balance wheels themselves. “The world has waited three hundred years for its next compass bearer.”'
      ],
      pullQuote: {
        text: 'We did not build the sky to look down upon us; we built ourselves so the sky might have eyes to see its own wonders.',
        attribution: 'Inscription on the Vault of Solarium'
      }
    },

    // CHAPTER 3 - PAGE 9
    {
      id: 9,
      pageNumber: 9,
      chapterIndex: 2,
      chapterNumber: 3,
      chapterTitle: 'Chapter III: The Celestial Observatory',
      paragraphs: [
        'A panel beneath the marble plinth slid aside with a whisper of counterweights. Within lay a blank ledger bound in dark calfskin, its paper thick, hand-pressed, and edged in beaten gold.',
        'A glass stylus rested upon the velvet cradle beside it. When Liora lifted the stylus, its crystalline tip flared with starlight.',
        'She realized then the true purpose of the guild: they were not cartographers who merely observed empires rise and crumble. They were the keepers of the world’s balance, entrusted with sketching the unseen bridges that allowed wanderers, dreamers, and seekers to find their way home in times of darkness.'
      ]
    },

    // CHAPTER 4 - PAGE 10
    {
      id: 10,
      pageNumber: 10,
      chapterIndex: 3,
      chapterNumber: 4,
      chapterTitle: 'Chapter IV: The Cartographer’s Oath',
      chapterSubtitle: 'The Map That Whispers The Dawn',
      isChapterOpening: true,
      paragraphs: [
        'The wind outside the observatory dome subsided into a tranquil breeze, carrying the scent of pine needles and snow from the distant peaks. Liora sat at the grand marble drafting table, the virgin calfskin open before her.',
        'She thought of the town below—the quiet weavers at their looms, the bakers kneading rye at the second watch, the tired archivists squinting over ledgers by candlelight. None of them suspected that the world was not a rigid cage of stone and borderlines, but a living tapestry waiting to be tended with courage.',
        'She dipped the crystal stylus into the shimmering pool at the center of the brass astrolabe. A bead of liquid silver gathered at the nib.'
      ]
    },

    // CHAPTER 4 - PAGE 11
    {
      id: 11,
      pageNumber: 11,
      chapterIndex: 3,
      chapterNumber: 4,
      chapterTitle: 'Chapter IV: The Cartographer’s Oath',
      paragraphs: [
        'With a steady hand, she drew the first stroke: a curved shoreline where children could safely gather amber without fear of coastal storms. The marble table resonated in warm approval, a chord in G-major that hummed through her forearms.',
        'Next, she traced a valley where a forgotten aqueduct could lead fresh spring water into the parched lower quarters of Valenholt. As the ink settled into the parchment fibers, a golden thread illuminated the valley on the orrery globe.',
        '“The rule of the cartographer is simple,” the gentle mechanical voice murmured in her heart. “Draw only what frees the spirit, and erase only that which binds the soul.”'
      ],
      pullQuote: {
        text: 'Every line drawn upon the earth is an act of faith in tomorrow.',
        attribution: 'Evelyn Vance, The Cartographer’s Epilogue'
      }
    },

    // CHAPTER 4 - PAGE 12
    {
      id: 12,
      pageNumber: 12,
      chapterIndex: 3,
      chapterNumber: 4,
      chapterTitle: 'Chapter IV: The Cartographer’s Oath',
      paragraphs: [
        'When the twin moons dipped below the eastern rim and the first rose-colored light of dawn kissed the mountain peaks, Liora closed the ledger. Its gilded clasps snapped shut with a reassuring click.',
        'She lifted the copper astrolabe and returned it to its velvet pouch. The forest below was no longer a realm of eerie silence; birds sang in chorus, and through the clearing, the road back to Valenholt shone like a ribbon of sun-warmed amber.',
        'As she rode down the mountain path, Thistle walked with high, confident strides. In her rucksack, the weight of the instruments felt no heavier than a feather, yet she carried the entire future of the valley upon her shoulders.'
      ]
    },

    // CHAPTER 4 - PAGE 13
    {
      id: 13,
      pageNumber: 13,
      chapterIndex: 3,
      chapterNumber: 4,
      chapterTitle: 'Chapter IV: The Cartographer’s Oath',
      paragraphs: [
        'Back in the undercrofts of the Grand Library, old Archivist Corvus was already stirring his morning tea when Liora stepped through the heavy oak door. He looked up, his sharp eyes catching the subtle glimmer of celestial dust on her woolen cuffs.',
        'He did not ask where she had spent the night. He merely slid a fresh cup of tea across the walnut counter and smiled with a quiet, knowing pride.',
        '“Did you find the meridian, my child?” he asked softly.',
        'Liora smiled back, resting her palm over the astrolabe at her hip. “No, Arch-Archivist,” she replied, stepping toward the grand window as morning flooded the library with gold. “The meridian found me.”'
      ],
      footnote: 'End of Book I. The Chronicle of Valenholt will continue in "The Starlit Meridian".'
    }
  ]
};
