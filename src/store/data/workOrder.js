const workOrder = {
  uid: '58db3ad2-d82e-49e5-88ea-7cdeeb9aa0b6',
  customer: {
    uid: 'f73f3076-092f-4ab2-8d16-8e6c5c07c0bf',
    firstName: 'Tony',
    lastName: 'Stark',
    name: 'Tony Stark',
    cellPhones: ['497 783 4727', '044 155 7555']
  },
  vehicle: {
    uid: '0c80bd61-8230-41bb-8406-6fd1645c997c',
    make: 'Audi',
    model: 'e-tron GT',
    year: 2022,
    status: 'in-shop',
    currentOdometer: 12000
  },
  vehicleInShop: false,
  talkSA: false,
  partsOrdered: false,
  timeComing: null,
  timePromised: null,
  technician: null,
  serviceAdvisor: null,
  notes: [
    {
      author: 'Maynard Bauman',
      alias: 'MB',
      date: '14:53 23 Jun 2022',
      pin: false,
      text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
    },
    {
      author: 'Maynard Bauman',
      alias: 'MB',
      date: '14:53 23 Jun 2022',
      pin: false,
      text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
    }
  ],
  schedulingTime: {
    all: 12,
    planned: 0
  },
  scheduling: [
    {
      date: 'Fri Jul 01 2022',
      shift: {name: 'Day'},
      time: 0
    }
  ],
  needRide: {
    date: 'Fri Jul 01 2022',
    note: 'lorem ipsum dolor sit amet, consectet'
  },
  courtesyVehicle: {
    date: {start: 'Jul 01 2022', end: 'Jul 05 2022'},
    note: 'lorem ipsum dolor sit amet, consectet',
    vehicle: 'Tesla Model S'
  },
  customRequests: [
    {
      text: 'lorem ipsum dolor sit amet, consectet  ',
      time: 2
    },
    {
      text: 'lorem ipsum dolor sit amet, consectet  ',
      time: 1.5
    },
    {
      text: 'lorem ipsum dolor sit amet, consectet  ',
      time: 1
    }
  ],

  // =========== OLD ===================
  startsAt: '10 Jan, 10:00AM',
  endsAt: '17 Jan, 2:30PM',
  logicalStatus: 'in-progress',
  customStatus: {
    uid: '6a6eaf56-9c3a-46f9-823c-f4f2a348ece2',
    name: 'Pending Inspection',
    color: '#8ae9ff'
  },
  customerRequests: [
    {
      uid: '2f61a152-9c3f-42e9-823c-e412f348ec01',
      requestType: 'question',
      requestName: 'Vibrations',
      requestDetails: [
        {
          question: 'While braking',
          answer: 'Yes'
        },
        {
          question: 'While braking',
          answer: 'Yes'
        }
      ],
      cardUIDs: ['ed12b952-9ace-42e9-823c-e412f348ec01', 'ed12b952-9ace-42e9-823c-e412f348ec01']
    },
    {
      uid: '2f61a152-9c3f-42e9-823c-e412f348ec01',
      requestType: 'question',
      requestName: 'Vibrations',
      requestDetails: [
        {
          question: 'While braking',
          answer: 'Yes'
        },
        {
          question: 'While braking',
          answer: 'Yes'
        }
      ],
      cardUIDs: ['ed12b952-9ace-42e9-823c-e412f348ec01', 'ed12b952-9ace-42e9-823c-e412f348ec01']
    }
  ],
  initialWalkaround: [
    {
      filename: 'a45c16a9-5f84-4324-9568-5bee8f58bd53.png',
      mimetype: 'image/png',
      url: 'http://localhost/a45c16a9-5f84-4324-9568-5bee8f58bd53.png'
    },
    {
      filename: 'a45c16a9-5f84-4324-9568-5bee8f58bd53.png',
      mimetype: 'image/png',
      url: 'http://localhost/a45c16a9-5f84-4324-9568-5bee8f58bd53.png'
    }
  ],
  inspectedAt: '10 Jan, 10:00AM'
}
export {workOrder}
