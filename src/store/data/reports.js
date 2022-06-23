const soldTime = [
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 40,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 2, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 30,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 90,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 70,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 93,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 60,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 90,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 90,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  },
  {
    date: 'Jul 4, 2022',
    soldTime: 78.33,
    capacity: 55.0,
    availability: 80.38,
    efficiency: 20,
    warranty: 1,
    discount: 7.25,
    effectiveLabourRate: 110.53
  }
]
const newCustomers = [
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  },
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  },
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  },
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  },
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  },
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  },
  {
    dateAdded: 'Jul 1, 2022',
    name: 'Gary Hartwick',
    phone: '(905)345.34.34',
    lastJobDate: 'Jul 1, 2022',
    refferedBy: 'Ok Tire'
  }
]
const deferredWork = [
  {
    date: 'Jul 1, 2022',
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    declined: [
      {
        name: 'Card',
        quantity: 2,
        color: '#F37878'
      },
      {
        name: 'Card',
        quantity: 2,
        color: '#FF9B70'
      }
    ],
    warranty: 0,
    discountTime: 0,
    costTotal: 320,
    priceTotal: 400,
    profitDeferred: 12333412
  },
  {
    date: 'Jul 1, 2022',
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    declined: [
      {
        name: 'Card',
        quantity: 2,
        color: '#F37878'
      },
      {
        name: 'Card',
        quantity: 2,
        color: '#FF9B70'
      }
    ],
    warranty: 0,
    discountTime: 0,
    costTotal: 320,
    priceTotal: 400,
    profitDeferred: 1233
  },
  {
    date: 'Jul 1, 2022',
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    declined: [
      {
        name: 'Card',
        quantity: 2,
        color: '#F37878'
      },
      {
        name: 'Card',
        quantity: 2,
        color: '#FF9B70'
      }
    ],
    warranty: 0,
    discountTime: 0,
    costTotal: 320,
    priceTotal: 400,
    profitDeferred: 1233
  },
  {
    date: 'Jul 1, 2022',
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    declined: [
      {
        name: 'Card',
        quantity: 2,
        color: '#F37878'
      },
      {
        name: 'Card',
        quantity: 2,
        color: '#FF9B70'
      }
    ],
    warranty: 0,
    discountTime: 0,
    costTotal: 320,
    priceTotal: 400,
    profitDeferred: 1233
  },
  {
    date: 'Jul 1, 2022',
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    declined: [
      {
        name: 'Card',
        quantity: 2,
        color: '#F37878'
      },
      {
        name: 'Card',
        quantity: 2,
        color: '#FF9B70'
      }
    ],
    warranty: 0,
    discountTime: 0,
    costTotal: 320,
    priceTotal: 400,
    profitDeferred: 1233
  },
]
export {soldTime, newCustomers, deferredWork}
