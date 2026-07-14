const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const sagaConfig = {
  names: {
    person1: "Mishu",
    person2: "Zeno",
    combined: "MISHU × ZENO",
    short: "M × Z",
  },
  birthdayDate: "2025-05-15T00:00:00Z", // Change this to the actual date
  heroMessage: {
    title: "MISHU × ZENO",
    subtitle: "Two Souls. One Legendary Birthday Saga.",
    description: "Today, the universe pauses to celebrate a bond stronger than every transformation and brighter than every star."
  },
  timeline: [
    {
      id: "ch1",
      chapterNumber: "01",
      title: "The First Encounter",
      date: "Year One",
      story: "The moment two distinct energies crossed paths, sparking a reaction that would echo across galaxies.",
      powerIncrease: 1500
    },
    {
      id: "ch2",
      chapterNumber: "02",
      title: "The Friendship Awakens",
      date: "Year Two",
      story: "Through shared trials and countless laughs, a casual alliance evolved into an unbreakable bond.",
      powerIncrease: 3200
    },
    {
      id: "ch3",
      chapterNumber: "03",
      title: "Training Through Chaos",
      date: "Year Three",
      story: "Facing the daily chaos of the universe together, mastering the art of resilience and humor.",
      powerIncrease: 5000
    },
    {
      id: "ch4",
      chapterNumber: "04",
      title: "The Legendary Adventures",
      date: "Year Four",
      story: "Journeys that pushed the limits of our power levels, exploring new horizons and making epic memories.",
      powerIncrease: 7500
    },
    {
      id: "ch5",
      chapterNumber: "05",
      title: "The Birthday Transformation",
      date: "Today",
      story: "Gathering the energy of a thousand suns to celebrate the most legendary day of the year.",
      powerIncrease: 9000
    },
    {
      id: "ch6",
      chapterNumber: "06",
      title: "The Saga Continues",
      date: "Forever",
      story: "This isn't even our final form. The adventures ahead will surpass every known limit.",
      powerIncrease: 9999
    }
  ],
  gallery: [
    { id: "img1", title: "The day our saga started", caption: "Origin Point", color: "blue", src: publicAsset("image/img1.jpeg"), position: "center 35%" },
    { id: "img2", title: "A memory stronger than any power level", caption: "Maximum Energy", color: "gold", src: publicAsset("image/img2.jpeg"), position: "center 35%" },
    { id: "img3", title: "Partners in every universe", caption: "Multiverse Bond", color: "purple", src: publicAsset("image/img3.jpeg"), position: "center 40%" },
    { id: "img4", title: "Our most chaotic adventure", caption: "Chaos Control", color: "orange", src: publicAsset("image/img4.jpeg"), position: "center 35%" },
    { id: "img5", title: "The smile that defeated every villain", caption: "Victory Pose", color: "cyan", src: publicAsset("image/img5.jpeg"), position: "center 25%" },
    { id: "img6", title: "Energy that lights up the timeline", caption: "Aura Burst", color: "blue", src: publicAsset("image/img6.jpeg"), position: "center 35%" },
    { id: "img7", title: "A chapter worth replaying forever", caption: "Replay Arc", color: "gold", src: publicAsset("image/img7.jpeg"), position: "center 35%" },
    { id: "img8", title: "The finale frame of the legend", caption: "Final Form", color: "orange", src: publicAsset("image/img8.jpeg"), position: "center center" },
  ],
  powerStats: {
    person1: {
      name: "Mishu",
      stats: [
        { label: "Smile Power", value: "9,999", percentage: 99 },
        { label: "Kindness Level", value: "Infinite", percentage: 100 },
        { label: "Chaos Energy", value: "8,700", percentage: 87 },
        { label: "Friendship Strength", value: "Maximum", percentage: 100 },
        { label: "Birthday Aura", value: "Legendary", percentage: 95 }
      ]
    },
    person2: {
      name: "Zeno",
      stats: [
        { label: "Loyalty Power", value: "9,999", percentage: 99 },
        { label: "Adventure Level", value: "Infinite", percentage: 100 },
        { label: "Protective Energy", value: "9,200", percentage: 92 },
        { label: "Comedy Power", value: "Maximum", percentage: 100 },
        { label: "Celebration Aura", value: "Legendary", percentage: 95 }
      ]
    }
  },
  personalLetter: {
    intro: "Through every battle, every laugh, every difficult day, and every unforgettable adventure, our bond has continued to grow stronger. Mishu and Zeno are not only names in this story—they are the heart of an entire universe of memories. May this birthday unlock a new transformation filled with happiness, success, peace, adventure, and countless legendary moments.",
    hiddenMessageTitle: "A Secret Transmission",
    hiddenMessageBody: "If you're reading this, the universe has aligned perfectly. Never forget that your energy inspires everyone around you. Keep leveling up, keep pushing beyond your limits, and know that you always have an ally in every battle. Happy Birthday!"
  },
  sevenWishes: [
    "Unlimited happiness",
    "Legendary health",
    "Infinite success",
    "Unbreakable friendship",
    "Powerful confidence",
    "Endless adventures",
    "A future brighter than every star"
  ],
  finalWish: "May the bond of Mishu × Zeno remain legendary in every universe.",
  musicPaths: {
    background: `${import.meta.env.BASE_URL}audio/background.mp3`,
    calm: `${import.meta.env.BASE_URL}audio/calm.mp3`,
    impact: `${import.meta.env.BASE_URL}audio/impact.mp3`,
    powerUp: `${import.meta.env.BASE_URL}audio/power-up.mp3`,
    energyCharge: `${import.meta.env.BASE_URL}audio/energy-charge.mp3`,
    orbSound: `${import.meta.env.BASE_URL}audio/orb.mp3`,
    hover: `${import.meta.env.BASE_URL}audio/hover.mp3`,
    success: `${import.meta.env.BASE_URL}audio/success.mp3`
  }
};
