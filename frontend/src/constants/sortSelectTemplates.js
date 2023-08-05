const priceRangesTemplate = [
  {
    value: [0, 250],
    name: '- $250',
  },
  {
    value: [250, 500],
    name: '$250 - $500',
  },
  {
    value: [500, 750],
    name: '$500 - $750',
  },
  {
    value: [750, 1000],
    name: '$750 - $1,000',
  },
  {
    value: [1000, 1500],
    name: '$1,000 - $1,500',
  },
  {
    value: [1500, 100000],
    name: '$1,500 +',
  },
];

const sortingTemplate = [
  {
    value: ['', ''],
    name: 'Sorty By...',
  },
  {
    value: ['name', 'asc'],
    name: 'A-Z',
  },
  {
    value: ['name', 'desc'],
    name: 'Z-A',
  },
  {
    value: ['price', 'asc'],
    name: 'Price: Low-to-High',
  },
  {
    value: ['price', 'desc'],
    name: 'Price: High-to-Low',
  },
  {
    value: ['created', 'desc'],
    name: 'Newest first',
  },
  {
    value: ['created', 'asc'],
    name: 'Oldest first',
  },
];

const pageLimitTemplate = [
  {
    value: '',
    name: ' ',
  },
  {
    value: 10,
    name: '10',
  },
  {
    value: 20,
    name: '20',
  },
  {
    value: 50,
    name: '50',
  },
  {
    value: 100,
    name: '100',
  },

];

export {
  pageLimitTemplate, sortingTemplate, priceRangesTemplate,
};
