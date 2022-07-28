/* eslint-disable */
// {
//   templateID: 42,
//   authorID: 12,
//   name: 'Fuel filter',
//   description:
//     'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
//   descriptionForCustomer:
//     'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
//   cardRelationType: 'custom-vehicles',
//   cardType: 'maintenance',
//   odometerTrack: 80000,
//   timeTrackLength: 18,
//   timeTrackType: 'months',
//   vehicleUID: '123e4567-e89b-12d3-a456-426614174000',
//   createdAt: '2022-01-13T10:39:32.000Z',
//   updatedAt: '2022-01-18T10:39:32.000Z',
//   updatedBy: 55,
//   servicesCount: 2,
//   relations: [
//     {
//       id: 313,
//       make: 'Audi',
//       model: 'A4',
//       yearFrom: 2009,
//       yearTo: 2010
//     }
//   ]
// }

const cardsList = {
  data: [
    {
      cardRelationType: 'all',
      description: '',
      name: 'Air Filter',
      odometerTrack: 48_000,
      timeTrackLength: 24,
      relations: [],
      templateID: 1
    },
    {
      cardRelationType: 'all',
      description: '',
      name: 'Cabin Filter',
      odometerTrack: 48_000,
      timeTrackLength: 24,
      relations: [],
      templateID: 2
    },
    {
      cardRelationType: 'all',
      description: '',
      name: 'Cooling System Service',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      relations: [],
      templateID: 3
    },
    {
      name: 'Transmission Service',
      cardRelationType: 'all',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      description: '',
      relations: [],
      templateID: 4
    },
    {
      name: 'Power Steering System Service',
      cardRelationType: 'all',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      description: '',
      relations: [],
      templateID: 5
    },
    {
      name: 'Engine Tuneup/Spark Plugs',
      cardRelationType: 'all',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      description: '',
      relations: [],
      templateID: 6
    },
    {
      name: 'Engine Timing Belt',
      cardRelationType: 'all',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      description: '',
      relations: [],
      templateID: 7
    },
    {
      name: 'Direct Injection System Service',
      cardRelationType: 'all',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      description: '',
      relations: [],
      templateID: 8
    },
    {
      name: 'Brake Fluid System Service',
      cardRelationType: 'all',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      description: '',
      relations: [],
      templateID: 9
    },
    {
      name: 'Front Brake Service',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 10
    },
    {
      name: 'Rear Brake Service',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 11
    },
    {
      templateID: 12,
      name: 'Windshield Wipers',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: []
    },
    {
      name: 'Exterior Lights',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 13
    },
    {
      name: 'Battery',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 14
    },
    {
      name: 'Summer Tires',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 15
    },
    {
      name: 'Winter Tires',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 16
    },
    {
      name: 'Accessories Belt',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 17
    },
    {
      name: 'Fluid Leaks',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 18
    },
    {
      name: 'Front Brakes',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 19
    },
    {
      name: 'Rear Brakes',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 20
    },
    {
      name: 'Shocks and Struts',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 21
    },
    {
      name: 'Ball Joints',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 22
    },
    {
      name: 'Tie-rod Ends',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 23
    },
    {
      name: 'Wheel hub and Bearings',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 24
    },
    {
      name: 'Exhaust System',
      cardRelationType: 'all',
      odometerTrack: 30_000,
      timeTrackLength: 18,
      description: '',
      relations: [],
      templateID: 25
    },
    {
      templateID: 26,
      name: 'Battery',
      description: '',
      cardRelationType: 'custom-vehicles',
      odometerTrack: 150_000,
      timeTrackLength: 84,
      servicesCount: 2,
      relations: [
        {
          make: 'Audi',
          model: 'A4',
          yearFrom: 2009,
          yearTo: 2010
        }
      ]
    }
  ],
  pagination: {
    page: 1,
    perPage: 100,
    total: 26
  }
}
export {cardsList}
