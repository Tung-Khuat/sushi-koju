export const sushiData = [
  {
    name: 'Lohi Nigiri',
    image: 'https://www.manusmenu.com/wp-content/uploads/2013/09/1-Salmon-Nigiri-1-1-of-1.jpg',
    ingredients: ['Lohi', 'Riisi', 'Wasabi'],
  },
  {
    name: 'Tonnikala Nigiri',
    image: 'https://ca-times.brightspotcdn.com/dims4/default/f420f30/2147483647/strip/true/crop/1600x900+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fca-times.brightspotcdn.com%2F8b%2F4f%2Fad4af978fed31e6c48eee829eb8b%2Fla-1508268219-cre2i3ewqn-snap-image',
    ingredients: ['Lohi', 'Riisi', 'Wasabi'],
  },
  {
    name: 'Grilled Lohi Nigiri',
    image: 'https://i.pinimg.com/564x/d8/86/cd/d886cd495e4c0d5e616db99c4cf87f62.jpg',
    ingredients: ['Lohi', 'Riisi', 'Wasabi', 'Majoneesi', 'Terijaki'],
  },
  {
    name: 'Lohi Maki',
    image: 'https://setosushi.com/img/cdn/533_762cca022855c39e6eb343a9f92f63e5.jpg',
    ingredients: ['Lohi', 'Riisi', 'Wasabi', 'Majoneesi'],
  },
];

export const sushiBoxData = [
  {
    type: 'small',
    label: 'Small',
    maxContainNumber: 14,
    image: 'https://www.sushihub.com.au/images/stories/virtuemart/product/assorted_sushi_box.png',
  },
  {
    type: 'medium',
    label: 'Medium',
    maxContainNumber: 30,
    image: 'https://www.ibifast.com/shop/image/cache/Pizza/sushi-sashimi-mix-box-a-500x500.jpg',
  },
  {
    type: 'large',
    label: 'Large',
    maxContainNumber: 50,
    image: 'http://cdn.shopify.com/s/files/1/0922/0858/products/Depositphotos_25494479_s-2015_grande.jpg?v=1437208170',
  },
];

export const sampleSushiPresetList = [
  {
    name: 'Premium sushilajitelma Miyabi 100',
    numberOfPieces: 100,
    price: 45.00,
    image: 'https://www.sushikauppa.fi/image_view.php?name=1/listaus__1111_1.jpg',
    nigiri: [
      { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
      { amount: 10, name: 'lohi' },
      { amount: 5, name: 'ebi (tiikerirapu)' },
      { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
      { amount: 10, name: 'lohi' },
      { amount: 5, name: 'ebi (tiikerirapu)' },
    ],
    maki: [
      { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
      { amount: 10, name: 'lohi' },
      { amount: 5, name: 'ebi (tiikerirapu)' },
      { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
      { amount: 10, name: 'lohi' },
      { amount: 5, name: 'ebi (tiikerirapu)' },
      { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
      { amount: 10, name: 'lohi' },
      { amount: 5, name: 'ebi (tiikerirapu)' },
      { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
      { amount: 10, name: 'lohi' },
      { amount: 5, name: 'ebi (tiikerirapu)' },
    ],
  },
  {
    name: 'Platter Premium',
    numberOfPieces: 52,
    price: 45.00,
    image: 'https://www.sushikauppa.fi/image_view.php?name=1/tuotesivu_57kplVege-plattert_2000751800001_2.jpg',
    leftInfo: {
      label: 'nigiri',
      content: [
        { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
        { amount: 10, name: 'lohi' },
        { amount: 5, name: 'ebi (tiikerirapu)' },
        { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
        { amount: 10, name: 'lohi' },
        { amount: 5, name: 'ebi (tiikerirapu)' },
      ],
    },
    rightInfo: {
      label: 'maki',
      content: [
        { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
        { amount: 10, name: 'lohi' },
        { amount: 5, name: 'ebi (tiikerirapu)' },
        { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
        { amount: 10, name: 'lohi' },
        { amount: 5, name: 'ebi (tiikerirapu)' },
        { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
        { amount: 10, name: 'lohi' },
        { amount: 5, name: 'ebi (tiikerirapu)' },
        { amount: 10, name: 'Maguro (Yellowfin tonnikala)' },
        { amount: 10, name: 'lohi' },
        { amount: 5, name: 'ebi (tiikerirapu)' },
      ],
    },
    sushiPieceIngredients: [
      {
        name: 'Salmon Nigiri',
        ingredients: 'rice, water, sugar, salt, rice vinegar, wasabi; horseradish, mustard, vitamin c, dyes: brilliant blue, tartrazine, salmon.',
      },
      {
        name: 'Grilled salmon nigiri',
        ingredients: 'Ingredients: rice, water, sugar, salt, rice vinegar, wasabi; horseradish, mustard, vitamin c, coloring matters: brilliant blue, tartazine, salmon, chives, mayonnaise: egg white and yolk, modified starch rapeseed oil, (E 621, E635) stabilizer; (E 407), coloring pepper extract, carrage contain; mustard residue, rapeseed oil, chili, teriyaki sauce: water, brown sugar, vinegar, E150a, ginger, yeast, sweet rice wine, salt.',
      },
      {
        name: 'Tamago nigiri',
        ingredients: 'rice, water, sugar, salt, rice vinegar, seaweed, Tamagoyaki; egg, modified starch, rapeseed oil, Wasabi; horseradish, mustard, vitamin c, dyes: brilliant blue, tartazine.',
      },
      {
        name: 'Ebi nigiri (shrimp)',
        ingredients: 'Rice, Water, Sugar, Salt, Rice Wine Vinegar, Wasabi; horseradish; mustard; vitamin C; dyes; (brilliant blue, tartrazine), shrimp, salt, sulfite.',
      },
    ],
  },
  {
    name: 'Platter Premium',
    numberOfPieces: 79,
    price: 69.00,
    image: 'https://www.sushikauppa.fi/image_view.php?name=2/listaus_52kplPlatterpremium_6430072720072_2.jpg',

  },
  {
    name: 'Platter',
    numberOfPieces: 51,
    price: 40.00,
    image: 'https://www.sushikauppa.fi/image_view.php?name=2/listaus_52kplPlatterpremium_6430072720072_2.jpg',

  },
  {
    name: 'Platter',
    numberOfPieces: 57,
    price: 59.00,
    image: 'https://www.sushikauppa.fi/image_view.php?name=2/listaus_52kplPlatterpremium_6430072720072_2.jpg',

  },
  {
    name: 'Vege-Plattert',
    numberOfPieces: 57,
    price: 49.00,
    image: 'https://www.sushikauppa.fi/image_view.php?name=2/listaus_52kplPlatterpremium_6430072720072_2.jpg',

  },
];
