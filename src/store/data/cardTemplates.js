/* eslint-disable */
const cardsListOld = {
  data: [
    {
      templateID: 42,
      authorID: 12,
      name: 'Fuel filter',
      description:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      descriptionForCustomer:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      cardRelationType: 'custom-vehicles',
      cardType: 'maintenance',
      odometerTrack: 80000,
      timeTrackLength: 18,
      timeTrackType: 'months',
      vehicleUID: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: '2022-01-13T10:39:32.000Z',
      updatedAt: '2022-01-18T10:39:32.000Z',
      updatedBy: 55,
      servicesCount: 2,
      relations: [
        {
          id: 313,
          make: 'Audi',
          model: 'A4',
          yearFrom: 2009,
          yearTo: 2010
        }
      ]
    },
    {
      templateID: 44,
      authorID: 12,
      name: 'Oil filter',
      description:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      descriptionForCustomer:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      cardRelationType: 'custom-vehicles',
      cardType: 'maintenance',
      odometerTrack: 80000,
      timeTrackLength: 18,
      timeTrackType: 'months',
      vehicleUID: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: '2022-01-13T10:39:32.000Z',
      updatedAt: '2022-01-18T10:39:32.000Z',
      updatedBy: 55,
      relations: [
        {
          id: 313,
          make: 'Audi',
          model: 'A4',
          yearFrom: 2009,
          yearTo: 2010
        }
      ]
    },
    {
      templateID: 45,
      authorID: 12,
      name: 'Oil filter',
      description:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      descriptionForCustomer:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      cardRelationType: 'custom-vehicles',
      cardType: 'maintenance',
      odometerTrack: 80000,
      timeTrackLength: 18,
      timeTrackType: 'months',
      vehicleUID: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: '2022-01-13T10:39:32.000Z',
      updatedAt: '2022-01-18T10:39:32.000Z',
      updatedBy: 55,
      relations: [
        {
          id: 313,
          make: 'Audi',
          model: 'A4',
          yearFrom: 2009,
          yearTo: 2010
        }
      ]
    },
    {
      templateID: 43,
      authorID: 12,
      name: 'Oil filter',
      description:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      descriptionForCustomer:
        'An oil filter is a filter designed to remove contaminants from engine oil, transmission oil, lubricating oil, or hydraulic oil. Their chief use is in internal-combustion engines for motor vehicles (both on- and off-road ), powered aircraft, railway locomotives, ships and boats, and static engines such as generators and pumps.',
      cardRelationType: 'custom-vehicles',
      cardType: 'maintenance',
      odometerTrack: 80000,
      timeTrackLength: 18,
      timeTrackType: 'months',
      vehicleUID: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: '2022-01-13T10:39:32.000Z',
      updatedAt: '2022-01-18T10:39:32.000Z',
      updatedBy: 55,
      relations: [
        {
          id: 313,
          make: 'Audi',
          model: 'A4',
          yearFrom: 2009,
          yearTo: 2010
        }
      ]
    },
    {
      cardRelationType: 'all',
      cardType: 'inspection',
      description: 'asf',
      name: 'Cabin Filter',
      odometerTrack: 50000,
      timeTrackLength: 18,
      relations: [],
      templateID: 1657639605826
    }
  ],
  pagination: {
    page: 1,
    perPage: 20,
    total: 4
  }
}

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
    perPage: 20,
    total: 11
  }
}
export {cardsList}
