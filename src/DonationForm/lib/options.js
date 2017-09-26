const organizationTypeOptions = [
  {value: 'individual', label: 'Individual'},
  {value: 'corporation', label: 'Corporation'},
  {value: 'ngo', label: 'NGO'}
]

const needsTransportationOptions = [
  {value: 'yes', label: 'Yes'},
  {value: 'no', label: 'No'}
]

const donationCategoriesOptions = [
    {value: 'energy', label: 'Energy & Generator'},
    {value: 'foodWater', label: 'Food & Water'},
    {value: 'clothes', label: 'Clothes & Shoes'},
    {value: 'construction', label: 'Construction Material'},
    {value: 'telecommunications', label: 'Telecommunications'},
    {value: 'Transportation', label: 'Transporation'},
    {value: 'search', label: 'Search & Rescue Equipment or Services'},
    {value: 'other', label: 'Other'},
  ];

  const transportationTypeOptions = [
      {value: 'land', label: 'Land transporation'},
      {value: 'air', label: 'Air Cargo'},
      {value: 'maritime', label: 'Maritime Transportation'},
      {value: 'other', label: 'Other - please explain in the comment section (at end)'},
    ];


export default {
  organizationTypeOptions,
  needsTransportationOptions,
  donationCategoriesOptions,
  transportationTypeOptions
}
