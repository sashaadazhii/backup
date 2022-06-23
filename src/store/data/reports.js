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
const monthlyEfficiency = [
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86,
    jobEfficiency: 45
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 61
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 86
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 87
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 97
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 78
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 34
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 95
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 34
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 72
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 79
  },
  {
    date: 'Jul 1, 2022',
    availableTime: 78.33,
    hoursOnJob: 55.00,
    idleTime: 12.45,
    timeOnJob: 86, jobEfficiency: 60
  },

]
const profit = [
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 0.00,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 0.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 0.00,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },
  {
    date: 'Jul 1, 2022',
    soldTime: 78.33,
    warrantyTime: 5.50,
    discountTime: 80.31,
    billableTime: 80.31,
    labourPrice: 1165.26,
    additionalLabour: 1165.26,
    partsCost: 989.74,
    partsPrice: 989.74,
    totalPrice: 1169.36,
    totalProfit: 1169.36
  },

]
const serviceDue = [
  {
    dueDate: 'Jul 1, 2022',
    dueKM: 800000,
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    service: 'Rear Brake Service',
    callback: 'Wed, May 11, 2022',
    note: 'Remind customer of replacing tires...'
  },
  {
    dueDate: 'Jul 1, 2022',
    dueKM: 800000,
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    service: 'Rear Brake Service',
    callback: '',
    note: ''
  },
  {
    dueDate: 'Jul 1, 2022',
    dueKM: 800000,
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    service: 'Rear Brake Service',
    callback: 'Wed, May 11, 2022',
    note: ''
  },
  {
    dueDate: 'Jul 1, 2022',
    dueKM: 800000,
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    service: 'Rear Brake Service',
    callback: '',
    note: ''
  },
  {
    dueDate: 'Jul 1, 2022',
    dueKM: 800000,
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    service: 'Rear Brake Service',
    callback: '',
    note: ''
  },
  {
    dueDate: 'Jul 1, 2022',
    dueKM: 800000,
    customer: 'Justin Anderson',
    vehicle: 'Dodge Caravan 2013',
    service: 'Rear Brake Service',
    callback: 'Wed, May 11, 2022',
    note: 'Remind customer of replacing tires...'
  },

]
const payrollHours = [
  {
    technician: 'Andrew Martin',
    hoursWorked: 45.2
  },
  {
    technician: 'Andrew Marshall',
    hoursWorked: 41.8
  },
  {
    technician: 'Andrew Zetter',
    hoursWorked: 37.2
  },
  {
    technician: 'Dominic',
    hoursWorked: 39.6
  },
  {
    technician: 'Merlin',
    hoursWorked: 45.2
  },
  {
    technician: 'Simon',
    hoursWorked: 43.0
  },
  {
    technician: 'Tonny Smith',
    hoursWorked: 42.2
  },
]
export { soldTime, newCustomers, deferredWork, monthlyEfficiency, profit, serviceDue, payrollHours }
