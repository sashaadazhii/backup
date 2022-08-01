/* eslint-disable */
const serviceList = [
  {
    id: 1,
    templateID: 42,
    name: 'Replace oil Filter',
    hours: 1.5,
    createdAt: '2022-01-18T10:39:32.000Z',
    warrantyType: 'global',
    warranty: {
      time: 10,
      range: 30000
    },
    parts: [
      {
        id: 1,
        serviceID: 1,
        name: 'Filtron OP-595',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      },
      {
        id: 2,
        serviceID: 1,
        name: 'Filtron OP-575',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      }
    ]
  },
  {
    id: 2,
    templateID: 42,
    name: 'Replace oil Filter',
    hours: 1.5,
    createdAt: '2022-01-18T10:39:32.000Z',
    warrantyType: 'global',
    warranty: {
      time: 10,
      range: 30000
    },
    parts: [
      {
        id: 3,
        serviceID: 2,
        name: 'Filtron OP-595',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      },
      {
        id: 4,
        serviceID: 2,
        name: 'Filtron OP-575',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      }
    ]
  },
  {
    id: 3,
    templateID: 43,
    name: 'Replace oil Filter',
    hours: 1.5,
    createdAt: '2022-01-18T10:39:32.000Z',
    warrantyType: 'global',
    warranty: {
      time: 10,
      range: 30000
    },
    parts: [
      {
        id: 5,
        serviceID: 3,
        name: 'Filtron OP-595',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      },
      {
        id: 6,
        serviceID: 3,
        name: 'Filtron OP-575',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      }
    ]
  },
  {
    id: 4,
    templateID: 43,
    name: 'Replace oil Filter',
    hours: 1.5,
    createdAt: '2022-01-18T10:39:32.000Z',
    warrantyType: 'global',
    warranty: {
      time: 10,
      range: 30000
    },
    parts: [
      {
        id: 7,
        serviceID: 4,
        name: 'Filtron OP-595',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      },
      {
        id: 8,
        serviceID: 4,
        name: 'Filtron OP-575',
        price: 150,
        createdAt: '2022-01-18T10:39:32.000Z'
      }
    ]
  },
  //============= new ================
  {
    id: 5,
    templateID: 1,
    name: 'Replace air Filter',
    hours: 1.5, // REMOVE / old value
    estimatedTime: 1.2,
    averageTime: 1.2,
    used: 4,
    warrantyType: 'global',
    warranty: {
      time: 10,
      range: 30_000
    },
    select: false,
    parts: [
      {
        id: 12,
        serviceID: 5,
        name: 'Filter OP-595',
        price: 150,
        type: 'Warranty Claim',
        select: false
      },
      {
        id: 13,
        serviceID: 5,
        name: 'sealer AR-5938',
        price: 10,
        type: 'In-house',
        select: false
      },
      {
        id: 14,
        serviceID: 5,
        name: 'bolt 6x40',
        price: 2,
        type: 'Manufacturers',
        select: false
      }
    ]
  },
  {
    id: 6,
    templateID: 1,
    name: 'Replace air Filter',
    hours: 1.5, // REMOVE / old value
    estimatedTime: 1.2,
    averageTime: 1.2,
    used: 4,
    warrantyType: 'custom',
    warranty: {
      time: 48,
      range: 140_000
    },
    select: false,
    parts: [
      {
        id: 12,
        serviceID: 5,
        name: 'Filter OP-595',
        price: 150,
        type: 'Warranty Claim',
        select: false
      },
      {
        id: 13,
        serviceID: 5,
        name: 'sealer AR-5938',
        price: 10,
        type: 'In-house',
        select: false
      },
      {
        id: 14,
        serviceID: 5,
        name: 'bolt 6x40',
        price: 2,
        type: 'Manufacturers',
        select: false
      }
    ]
  },
  {
    id: 7,
    templateID: 1,
    name: 'Replace air Filter',
    hours: 1.5, // REMOVE / old value
    estimatedTime: 1.2,
    averageTime: 1.2,
    used: 4,
    warrantyType: 'off',
    warranty: {
      time: 0,
      range: 0
    },
    select: false,
    parts: [
      {
        id: 12,
        serviceID: 5,
        name: 'Filter OP-595',
        price: 150,
        type: 'Warranty Claim',
        select: false
      },
      {
        id: 13,
        serviceID: 5,
        name: 'sealer AR-5938',
        price: 10,
        type: 'In-house',
        select: false
      },
      {
        id: 14,
        serviceID: 5,
        name: 'bolt 6x40',
        price: 2,
        type: 'Manufacturers',
        select: false
      }
    ]
  }
]
const historyList = [
  {
    id: 1,
    templateID: 1,
    name: 'Air Filter Service',
    date: '28 Jun 2022',
    type: 'Warranty Service',
    description:
      'Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3 years/60000km)'
  },
  {
    id: 2,
    templateID: 1,
    name: 'Air Filter Service',
    date: '28 Jun 2022',
    type: 'Warranty Service',
    description:
      'Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3 years/60000km)'
  },
  {
    id: 3,
    templateID: 1,
    name: 'Air Filter Service',
    date: '28 Jun 2022',
    type: 'Warranty Service',
    description:
      'Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes and extend your brake warranty to 3 years/60000km)'
  }
]
export {serviceList, historyList}
