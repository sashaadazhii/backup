const vehicles = [
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec17',
    uid: 'c66619c9-26c6-4eb4-b8d5-17dea0930491',
    companyID: 1,
    vin: '1GTFK19Y98Z187765',
    license: 'DEV-221',
    make: 'Audi',
    model: 'A4',
    year: 2019,
    engine: {
      size: -32407636,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 122014,
    vehicleType: 'Sedan',
    customFields: {
      color: 'Deep blue',
      clearance: 15
    }
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec17',
    uid: '0d78bb57-9167-40df-ae80-8e81212f7d78',
    companyID: 1,
    vin: '1GTFK19Y98Z187765',
    license: 'DEV-221',
    make: 'Audi',
    model: 'A7',
    year: 2021,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 122014,
    vehicleType: 'Sedan',
    customFields: {
      color: 'White',
      clearance: 17
    }
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec18',
    uid: '70aef68f-9a2b-4fbc-9598-243ed5d7d482',
    companyID: 1,
    vin: '1GTFK19Y98Z187765',
    license: 'DEV-221',
    make: 'Audi',
    model: 'A4',
    year: 2019,
    engine: {
      size: -32407636,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 122014,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec18',
    uid: '30b68f26-f050-4b26-b390-bca6743f9a6e',
    companyID: 1,
    vin: '1GTFK19Y98Z187790',
    license: 'DEV-777',
    make: 'Audi',
    model: 'e-tron GT',
    year: 2022,
    engine: {
      size: 4.2,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 2000,
    vehicleType: 'Sportback',
    customFields: {}
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec18',
    uid: '41145fc2-c385-44c7-8355-720f38618ba1',
    companyID: 1,
    vin: '1GCEK14K8RE106083',
    license: 'DEV-221',
    make: 'Chevrolet',
    model: 'K 1500',
    year: 1994,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 345090,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec23',
    uid: '05d7ea34-d613-482a-aabc-4af7b8e8008b',
    companyID: 1,
    vin: '1GTFK19Y98Z187765',
    license: 'DEV-221',
    make: 'Audi',
    model: 'A7',
    year: 2021,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 122014,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec10',
    uid: '3d2c4314-da40-4548-9829-8f93dfe8e35c',
    companyID: 1,
    vin: '5TEWN72N63Z275910',
    license: 'DEV-221',
    make: 'Toyota',
    model: 'Tacoma',
    year: 2003,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 145984,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec10',
    uid: '3f8ab673d-1997-497f-be5a-4e7fee3e7d84',
    companyID: 1,
    vin: 'WDDHF8JB4DA682581',
    license: 'DEV-221',
    make: 'Mercedes Benz',
    model: 'E230',
    year: 2013,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 98974,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '2f61a152-9c3f-42e9-823c-e412f348ec10',
    uid: '20a5c5d5-6a52-462f-91bc-7123cbe71a42',
    companyID: 1,
    vin: 'JH4DA9350MS000938',
    license: 'DEV-221',
    make: 'Acura',
    model: 'Integra',
    year: 1991,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 490965,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: 'ad7608eb-dfd4-40a9-876f-16972a08465f',
    uid: '24f682c1e-c87d-444d-8ac5-1ffe1a816ae7',
    companyID: 1,
    vin: '1FMCU24X4NUD21099',
    license: 'DEV-221',
    make: 'Ford',
    model: 'Explorer',
    year: 1992,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 260961,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: 'ad7608eb-dfd4-40a9-876f-16972a08465f',
    uid: '2a619e9d-17c4-4347-bd26-97bcf0239398',
    companyID: 1,
    vin: '1B4HR38N12F149556',
    license: 'DEV-221',
    make: 'Dodge',
    model: 'Durango',
    year: 2002,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 180986,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: 'ad7608eb-dfd4-40a9-876f-16972a08465f',
    uid: '5f5135c6-cc3f-41af-8df0-266f7d21fe0a',
    companyID: 1,
    vin: '3C6JR6AGXEG316377',
    license: 'DEV-221',
    make: 'Dodge',
    model: 'Ram Series Pickup',
    year: 2014,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 186961,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: 'ad7608eb-dfd4-40a9-876f-16972a08465f',
    uid: '3292aa1d-c5b0-4387-b8c5-261332f4ef89',
    companyID: 1,
    vin: '2C3HE76K02H303921',
    license: 'DEV-221',
    make: 'Chrysler',
    model: '300M',
    year: 2002,
    engine: {
      size: 83406194,
      cylinders: 8,
      code: 'CQ-12-02'
    },
    odometer: 125068,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '40b55867-ba5f-430a-a458-d936a28be20e',
    uid: '496970e4-be48-424b-a4c6-d489cdd18100',
    companyID: 1,
    vin: '1C3CCBBG7DN702159',
    license: 'DEV-221',
    make: 'Chrysler',
    model: '200',
    year: 2013,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 225068,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: '26cfd801-ab35-4e96-a807-169af69d5f3e',
    uid: 'f5a0e263-4519-4be0-a8ff-3de56dfcd624',
    companyID: 1,
    vin: '1C4NJPBB0GD502519',
    license: 'DEV-221',
    make: 'Jeep',
    model: 'Patriot',
    year: 2016,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 81068,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: '26cfd801-ab35-4e96-a807-169af69d5f3e',
    uid: '3a99bcc0-180f-4ee6-93fb-ed7fb2583403',
    companyID: 1,
    vin: '1GTJK34G71E314515',
    license: 'DEV-221',
    make: 'GMC',
    model: 'Sierra 3500',
    year: 2001,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 129998,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: '26cfd801-ab35-4e96-a807-169af69d5f3e',
    uid: '3a99bcc0-180f-4ee6-93fb-ed7fb2583403',
    companyID: 1,
    vin: '1GTJK39103E110484',
    license: 'DEV-221',
    make: 'GMC',
    model: 'Sierra 3500',
    year: 2003,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 129998,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: '26cfd801-ab35-4e96-a807-169af69d5f3e',
    uid: '4b0d5d33-4c6f-4546-9296-3f38d20bc45b',
    companyID: 1,
    vin: '1GKS2CKJ4FR529941',
    license: 'DEV-221',
    make: 'GMC',
    model: 'Yukon',
    year: 2015,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 56340,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: 'e461f1c5-333c-4ed5-9b58-3b8d495d6a6f',
    uid: 'ae7bb03b-0dd3-4c03-9ea8-d4b02f941795',
    companyID: 1,
    vin: '1G4CU53L0M1618127',
    license: 'DEV-221',
    make: 'Buick',
    model: 'Park Avenue',
    year: 1991,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 209340,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: 'e461f1c5-333c-4ed5-9b58-3b8d495d6a6f',
    uid: 'ee8b6edf-ee8d-4302-841e-1c21b52bebda',
    companyID: 1,
    vin: 'WAULFAFH0BN002395',
    license: 'DEV-221',
    make: 'Audi',
    model: 'A5',
    year: 2005,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 124340,
    vehicleType: 'Coupe',
    customFields: {}
  },
  {
    customerUID: '5a2cec0a-669f-4191-a761-aa734f6559e6',
    uid: '57a23669-1761-470e-8bc2-49aeb1702dcc',
    companyID: 1,
    vin: '5GRGN23888H0001EX',
    license: 'DEV-221',
    make: 'HUMMER',
    model: 'H2',
    year: 2008,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 54470,
    vehicleType: 'SUV',
    customFields: {}
  },
  {
    customerUID: 'e2bf591a-f346-462e-b9de-b27d336d6d43',
    uid: '31241961-99a5-41ed-92f9-a4936029ccff',
    companyID: 1,
    vin: 'JM1GJ1U53G1411565',
    license: 'DEV-221',
    make: 'Mazda',
    model: '6',
    year: 2016,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 176470,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: 'e2bf591a-f346-462e-b9de-b27d336d6d43',
    uid: '1de24766-07f1-4027-b9a1-87eb68776848',
    companyID: 1,
    vin: 'JA32U2FU4AU603805',
    license: 'DEV-221',
    make: 'Mitsubishi',
    model: 'Lancer',
    year: 2010,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 34987,
    vehicleType: 'Sedan',
    customFields: {}
  },
  {
    customerUID: 'e2bf591a-f346-462e-b9de-b27d336d6d43',
    uid: 'a770203b-9766-49aa-b6e8-0bd93e525cc6',
    companyID: 1,
    vin: 'SALTL124624A74735',
    license: 'DEV-221',
    make: 'Land Rover',
    model: 'Discovery II',
    year: 2002,
    engine: {
      size: 83406194,
      cylinders: 6,
      code: 'CQ-12-02'
    },
    odometer: 1976543,
    vehicleType: 'SUV',
    customFields: {}
  }
]

const cars = [
  {
    name: 'Audi',
    list: ['e-tron', 'a6']
  },
  {
    name: 'Seat',
    list: ['Cordoba', 'Ibiza', 'Leon']
  },
  {
    name: 'Ford',
    list: ['Focus', 'Mondeo', 'F-150']
  },
  {
    name: 'Peugeot',
    list: ['3008', '2008', '208']
  },
  {
    name: 'Toyota',
    list: ['Prado', 'Land Cruiser', 'Prius']
  }
]

export {vehicles, cars}
