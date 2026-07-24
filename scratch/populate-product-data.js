const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const db = JSON.parse(rawData);

// Festival mapping
const festivalMap = {
  'navratri-puja-samagri-durga-puja-kit': 'navratri',
  'diwali-puja-samagri-mahalakshmi-pujan-kit': 'diwali',
  'ganesh-pujan-ganpati-pujan-kit': 'ganesh-chaturthi',
  'karva-chauth-pujan-samagri': 'karva-chauth',
  'rakshabandhan-puja-set': 'rakshabandhan',
  'tulsi-vivah-pujan-samagri': 'tulsi-vivah',
  'sankranti-pujan-samagri': 'makar-sankranti',
  'diwali-dhanteras-pujan-samagri-5-day': 'diwali',
  'mahashivratri-pujan-samagri-kit': 'mahashivratri',
  'holika-dahan-holi-pujan-samagri': 'holi',
  'hariyali-teej-pujan-samagri': 'hariyali-teej',
  'nag-panchami-pujan-samagri': 'nag-panchami',
  'shri-krishna-janmashtami-pujan-samagri': 'janmashtami',
};

// Data generator for all 99 products
function generateProductData(product) {
  const { id, slug, categorySlug, nameEnglish, nameHindi } = product;

  // Set festivalSlug if mapped
  let festivalSlug = festivalMap[slug] || undefined;

  let benefits = [];
  let usage = [];

  // Helper template rules customized per product
  if (categorySlug === 'festival-kits') {
    benefits = [
      `Complete and authentic samagri curated specifically for traditional ${nameEnglish} rituals.`,
      `Hand-picked, pure ingredients sourced directly to ensure divine sanctity and spiritual energy during worship.`,
      `Saves time and eliminates the risk of missing essential ritual items required by Vedic pandits.`,
      `Includes high-grade items packaged safely to retain freshness and aromatic purity.`,
      `Backed by Vishwanath Pooja Bhandar's 40+ years of trusted heritage in West Patel Nagar, Delhi.`
    ];
    usage = [
      `Unpack the kit items onto a clean puja thali or altar before commencing the ${nameEnglish} rituals.`,
      `Use during main festival hours as per auspicious shubh muhurat and vidhi.`,
      `Handle sacred samagri like roli, chandan, and akshat with clean, washed hands after bath.`,
      `Store remaining unused dry items in a cool, dry place away from direct sunlight.`
    ];
  } else if (categorySlug === 'vrat-katha-kits') {
    benefits = [
      `Contains all essential items and ritual samagri required to perform complete ${nameEnglish} with full devotion.`,
      `Helps fulfill vow obligations (vrat sankalp) according to traditional Hindu scriptures.`,
      `Ensures 100% pure, natural, and unadulterated ingredients for maximum spiritual merit (Punya).`,
      `Convenient all-in-one pack suitable for home mandir or community vrat recitations.`
    ];
    usage = [
      `Arrange items orderly around the puja chowki before commencing the vrat katha reading.`,
      `Perform the ritual on designated vrat days following morning or evening fast routines.`,
      `Offer samagri step-by-step as prescribed in the accompanying or traditional katha vidhi.`,
      `Keep unused contents in dry sealed containers to preserve freshness for upcoming fasts.`
    ];
  } else if (categorySlug === 'devta-vishesh-kits') {
    benefits = [
      `Specially curated for dedicated deity worship and specialized remedies (${nameEnglish}).`,
      `Infuses positive vibes, divine grace, and spiritual protection into the household.`,
      `Prepared according to authentic Vedic guidelines prescribed by experienced priests.`,
      `All-inclusive kit ensures seamless execution of complex ritual ceremonies.`
    ];
    usage = [
      `Present the items to the pandit ji or place them neatly at the deity's feet on the altar.`,
      `Perform the puja during appropriate tithi, nakshatra, or specific day of divine invocation.`,
      `Maintain ritual cleanliness and chanting of relevant deity mantras during offering.`,
      `Store any leftover dry samagri in an airtight pouch in your puja mandir shelf.`
    ];
  } else if (categorySlug === 'incense') {
    benefits = [
      `Emits rich, natural fragrance of ${nameEnglish} that purifies home air and eliminates negative energy.`,
      `Sourced from pure aromatic resins and natural herbal ingredients without harsh chemicals.`,
      `Creates a serene, meditative environment ideal for daily puja, japa, and relaxation.`,
      `Long-lasting burn time with steady smoke flow for uplifting sacred atmosphere.`
    ];
    usage = [
      `Light the tip of the ${nameEnglish} using a match or diya until it catches flame, then gently blow out flame.`,
      `Place securely on a fireproof incense holder or dhoop stand placed on a flat surface.`,
      `Burn during morning and evening sandhya puja or spiritual meditation sessions.`,
      `Keep away from flammable objects, children, and pets. Store in a cool, dry, moisture-free location.`
    ];
  } else if (categorySlug === 'havan-samagri') {
    benefits = [
      `High-purity ${nameEnglish} selected specifically for Vedic yagna and sacred fire rituals.`,
      `Releases divine aroma and atmospheric purification when offered into holy agni.`,
      `100% natural, chemical-free herbal preparation preserving traditional scriptural potency.`,
      `Promotes health, harmony, and spiritual cleansing in home and workplace environments.`
    ];
    usage = [
      `Offer small quantities into the lit havan kund alongside pure cow ghee during ahuti chanting.`,
      `Use during home havan, griha pravesh, festival yagnas, or monthly auspicious occasions.`,
      `Handle with a clean spoon or dedicated wooden ahuti spoon (sruk/sruva).`,
      `Keep in an airtight container to protect against atmospheric humidity.`
    ];
  } else if (categorySlug === 'brass-items' || categorySlug === 'copper-items' || categorySlug === 'diyas') {
    benefits = [
      `Crafted from high-grade ${categorySlug === 'copper-items' ? 'pure copper' : categorySlug === 'diyas' ? 'clay/brass' : 'solid brass'} designed for lifelong ritual use.`,
      `Traditional design that retains divine energy and enhances the aesthetic elegance of your mandir.`,
      `Durable, easy to clean, and resistant to corrosion or heat damage.`,
      `Symbolizes eternal light, auspiciousness, and spiritual clarity in the home.`
    ];
    usage = [
      `Fill with clean water, til oil, or pure ghee as required by ritual vidhi before lighting or offering.`,
      `Place on a stable puja thali or wooden chowki to protect underlying surfaces.`,
      `Clean regularly using pitambari powder, lemon, or warm water to maintain golden shine.`,
      `Wipe thoroughly dry after washing to prevent water marks or tarnish.`
    ];
  } else if (categorySlug === 'temple-accessories') {
    benefits = [
      `Premium quality ${nameEnglish} designed to maintain sacred decorum and comfort during worship.`,
      `Vibrant colors and durable fabric crafted for traditional temple and home mandir setups.`,
      `Protects deity idols and sacred puja items from dust, moisture, and surface scratches.`,
      `Easy to clean and maintain for long-term daily use.`
    ];
    usage = [
      `Spread cleanly over the puja chowki or altar before placing idols, kalash, and thali.`,
      `Use during daily worship, festival decorations, and special ritual ceremonies.`,
      `Wash gently by hand in mild soap water when needed and air dry in shade.`,
      `Store folded neatly in a clean mandir drawer when not in active use.`
    ];
  } else {
    // General pooja-samagri items (Roli, Kalawa, Supari, Ganga Jal, Chandan, Kesar, etc.)
    benefits = [
      `Pure and authentic ${nameEnglish} essential for daily mandir rituals and grand ceremonies.`,
      `Carefully selected and processed to guarantee 100% purity without harmful synthetic additives.`,
      `Invocative of positive spiritual vibrations and divine grace as per ancient shastras.`,
      `Sourced and packed with care by Vishwanath Pooja Bhandar, Delhi's trusted name for 40+ years.`
    ];
    usage = [
      `Apply or offer in appropriate quantities during tilak, archana, or sacred offerings.`,
      `Suitable for daily morning/evening puja, festival rituals, and special religious functions.`,
      `Handle only after washing hands and maintaining ritual purity.`,
      `Seal tightly in a cool, dry place away from moisture and direct sunlight.`
    ];
  }

  // Customize specific individual products for maximum uniqueness
  if (slug === 'ganga-jal') {
    benefits = [
      `100% pure Ganga Jal bottled from holy river origins for sacred purification.`,
      `Essential for sankalpa, idol abhishek, and purifying puja spaces prior to rituals.`,
      `Destroys spiritual impurities and invokes sacred energy of Holy Mother Ganga.`,
      `Authentic purity guaranteed by Vishwanath Pooja Bhandar.`
    ];
    usage = [
      `Sprinkle a few drops around the puja room and over samagri for pavitrikaran.`,
      `Add to abhishek water for Lord Shiva, Laddu Gopal, or deity idols.`,
      `Keep bottle closed tightly after use to maintain sacred purity.`,
      `Store in a clean, elevated mandir shelf.`
    ];
  } else if (slug === 'bhimsaini-kapoor-camphor') {
    benefits = [
      `100% pure edible-grade Bhimsaini Kapoor (crystal camphor) with intense divine aroma.`,
      `Leaves zero ash residue when burnt, symbolizing total surrender of ego to the Divine.`,
      `Purifies indoor atmosphere, dispels mosquitoes, and clears respiratory passages.`,
      `Emits bright white flame during Aarti for maximum spiritual positivity.`
    ];
    usage = [
      `Place 1-2 crystals on an Aarti lamp or kapoor dani and ignite with matchstick.`,
      `Perform Aarti in clockwise direction before deity idols during morning and evening puja.`,
      `Do not touch burning camphor directly with bare hands.`,
      `Store in a tight airtight glass or metal jar as pure kapoor evaporates in open air.`
    ];
  } else if (slug === 'roli-kumkum') {
    benefits = [
      `Traditional fine red Roli Kumkum made from natural turmeric and lime.`,
      `Essential for applying auspicious Tilak on deity forehead and devotees during puja.`,
      `Symbolizes Goddess Lakshmi's grace, marital bliss (saubhagya), and spiritual protection.`,
      `Skin-friendly, chemical-free formulation safe for daily forehead application.`
    ];
    usage = [
      `Mix a small pinch of Roli with a drop of Ganga Jal or water in a tilak bowl to form paste.`,
      `Apply with ring finger on deity idols first, then on devotees' Ajna chakra (forehead).`,
      `Optionally apply akshat (unbroken rice grains) over the tilak for completeness.`,
      `Store in a dry container tightly closed to prevent moisture clump.`
    ];
  } else if (slug === 'moli-kalawa') {
    benefits = [
      `Pure cotton red-yellow sacred thread (Moli / Raksha Sutra) for divine protection.`,
      `Invokes the blessings of Lord Brahma, Vishnu, and Maheshwar when tied on wrist.`,
      `Durable, non-irritating natural cotton thread with vibrant fast colors.`,
      `Essential for tying on kalash, coconut, deity idols, and devotees' wrists during sankalp.`
    ];
    usage = [
      `Tie 3 or 5 rounds around the wrist (right wrist for men/unmarried women, left for married women).`,
      `Recite 'Yena Baddho Bali Raja...' mantra while tying for raksha protection.`,
      `Also tie around the neck of kalash, coconut, and puja utensils during rituals.`,
      `Keep stored in a clean mandir drawer.`
    ];
  } else if (slug === 'rudraksh-mala') {
    benefits = [
      `Authentic 108+1 bead Rudraksha Mala sourced from genuine holy trees.`,
      `Resonates with Lord Shiva's divine energy, promoting mental peace, focus, and low stress.`,
      `Ideal for mantra japa (chanting) and wearing for daily spiritual protection.`,
      `Carefully selected and strung with sturdy thread for long-lasting spiritual use.`
    ];
    usage = [
      `Use for chanting Shiva or deity mantras using middle finger and thumb (avoiding index finger).`,
      `Store in a silk/cotton mala pouch when not in use; keep off bare ground.`,
      `Condition periodically with pure sesame oil or cow ghee to preserve beads.`,
      `Remove before sleeping, bathing, or consuming non-satvik food.`
    ];
  } else if (slug === 'tulsi-mala') {
    benefits = [
      `Handcrafted natural Tulsi wood mala sacred to Lord Vishnu, Shri Krishna, and Rama.`,
      `Purifies the aura, calms the mind, and enhances devotion (bhakti bhava).`,
      `Lightweight beads smooth to the touch, ideal for daily Hare Krishna or Vishnu mantra japa.`,
      `Authentic natural holy basil wood without artificial polish or varnish.`
    ];
    usage = [
      `Chant Vishnu or Krishna mantras daily using the 108 beads starting from the Bindu bead.`,
      `Can be worn around neck by devotees following Satvik lifestyle.`,
      `Keep dry and store in a dedicated cloth pouch when not chanting.`,
      `Avoid exposure to water, soap, or chemical cleaners.`
    ];
  }

  return {
    festivalSlug,
    benefits,
    usage
  };
}

// Update all products
let updatedCount = 0;
let festivalMappedCount = 0;

db.products = db.products.map((p) => {
  const generated = generateProductData(p);
  if (generated.festivalSlug) {
    p.festivalSlug = generated.festivalSlug;
    festivalMappedCount++;
  }
  p.benefits = generated.benefits;
  p.usage = generated.usage;
  updatedCount++;
  return p;
});

fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} products with benefits & usage. (${festivalMappedCount} mapped to festivalSlugs)`);
