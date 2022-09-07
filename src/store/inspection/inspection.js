export default {
  namespaced: true,
  state: {
    allCards: [
      {
        id: 0,
        title: 'Power Steering System Service',
        status: 'Component Unsafe',
        statusColor: '#F37878',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 96,
        icon: true,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}],
        services: [
          {
            name: 'Canned Service 1',
            serviceGuides: 4,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              },
              {
                name: '15w20 Full Synthetic Oil',
                price: 145.34,
                availability: 0
              }
            ]
          },
          {
            name: 'Canned Service 2',
            serviceGuides: 1,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          },
          {
            name: 'Canned Service 3',
            serviceGuides: 2,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          }
        ]
      },
      {
        id: 1,
        title: 'Transmission Service',
        status: 'Good',
        statusColor: '#10B981',
        customerStatus: '',
        customerStatusColor: '',
        progress: 50,
        icon: false,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}],
        services: [
          {
            name: 'Canned Service 1',
            serviceGuides: 4,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              },
              {
                name: '15w20 Full Synthetic Oil',
                price: 145.34,
                availability: 0
              }
            ]
          },
          {
            name: 'Canned Service 2',
            serviceGuides: 1,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          },
          {
            name: 'Canned Service 3',
            serviceGuides: 2,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Transmission Service',
        status: 'Highly Recommended',
        statusColor: '#FF9B70',
        customerStatus: 'Approved by SA',
        customerStatusColor: '#3EB3BB',
        progress: 72,
        icon: true,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}],
        services: [
          {
            name: 'Canned Service 1',
            serviceGuides: 4,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              },
              {
                name: '15w20 Full Synthetic Oil',
                price: 145.34,
                availability: 0
              }
            ]
          },
          {
            name: 'Canned Service 2',
            serviceGuides: 1,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          },
          {
            name: 'Canned Service 3',
            serviceGuides: 2,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Cooling System Service',
        status: 'No Status',
        statusColor: '#6B7280',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 50,
        icon: false,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}],
        services: [
          {
            name: 'Canned Service 1',
            serviceGuides: 4,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              },
              {
                name: '15w20 Full Synthetic Oil',
                price: 145.34,
                availability: 0
              }
            ]
          },
          {
            name: 'Canned Service 2',
            serviceGuides: 1,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          },
          {
            name: 'Canned Service 3',
            serviceGuides: 2,
            suggestedTime: 10,
            averageTime: 9,
            timesUsed: 14,
            details: [
              {
                name: '597-205 5w20 Full Synthetic Oil',
                price: 45.34,
                availability: 3
              },
              {
                name: 'Antifreeze ( Khameleon)',
                price: 145.34,
                availability: 2
              }
            ]
          }
        ]
      }
    ],
    cards: [
      {
        id: 0,
        title: 'Winter Tires',
        status: 'Component Unsafe',
        statusColor: '#F37878',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 96,
        icon: true,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}],
        tires: true
      },
      {
        id: 1,
        title: 'Transmission Service',
        status: 'Good',
        statusColor: '#10B981',
        customerStatus: '',
        customerStatusColor: '',
        progress: 50,
        icon: false,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}]
      },
      {
        id: 2,
        title: 'Summer Tires',
        status: 'Highly Recommended',
        statusColor: '#FF9B70',
        customerStatus: 'Approved by SA',
        customerStatusColor: '#3EB3BB',
        progress: 72,
        icon: true,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}],
        history: [
          {
            id: 0,
            name: 'Front Brake Service',
            date: '21 Dec 2021',
            status: 'Warranty Service',
            description: 'Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the bo 3 years/60000km)'
          },
          {
            id: 1,
            name: 'Front Brake Service',
            date: '21 Dec 2021',
            status: 'Warranty Service',
            description: 'Freeup, clean and lube sliders. Clean rust from brake rotors. This is done ake warranty to 3 years/60000km)'
          },
          {
            id: 2,
            name: 'Front Brake Service',
            date: '11 Dec 2020',
            status: 'Warranty Service',
            description: 'Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to and extend your brake warranty to 3 years/60000km)'
          }
        ],
        tires: true
      },
      {
        id: 3,
        title: 'Cooling System Service',
        status: 'No Status',
        statusColor: '#6B7280',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 50,
        icon: false,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}]
      },
      {
        id: 4,
        title: 'Engine Tuneup/Spark Plugs',
        status: 'No Status',
        statusColor: '#6B7280',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 50,
        icon: false,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}]
      },
      {
        id: 5,
        title: 'Engine Timing Belt',
        status: 'No Status',
        statusColor: '#6B7280',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 50,
        icon: true,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}]
      },
      {
        id: 6,
        title: 'Direct Injection System Service',
        status: 'No Status',
        statusColor: '#6B7280',
        customerStatus: 'No customer status',
        customerStatusColor: '#E5E7EB',
        progress: 50,
        icon: false,
        assigns: [{id: 0, name: 'SG'}],
        technicians: [{id: 0, name: 'Serhio Gazen'}]
      }
    ],
    requests: [1, 2, 3, 4, 5]
  },
  mutations: {},
  actions: {}
}
