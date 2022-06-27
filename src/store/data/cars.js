const cars = [
  'Acura',
  'Audi',
  'Chevrolet',
  'Cadillac',
  'BMW',
  'Chrysler',
  'Ford',
  'Buick',
  'GMC',
  'Honda',
  'Jeep',
  'Genesis',
  'Dodge',
  'Mercedes-Benz',
  'Mitsubishi',
  'Lincoln',
  'Porsche',
  'Subaru',
  'Toyota',
  'Volkswagen',
  'Volvo',
  'Tesla',
  'Bentley',
  'Saab'
]
const carsModels = [
  {
    make: 'Acura',
    model: 'Sedal',
    type: 'CL'
  },
  {
    make: 'Acura',
    model: 'Sedan',
    type: 'CSX'
  },
  {
    make: 'Acura',
    model: 'SUV',
    type: 'MDX'
  },
  {
    make: 'Audi',
    model: 'A5',
    type: 'Coupe'
  },
  {
    make: 'Audi',
    model: 'TT',
    type: 'Coupe'
  },
  {
    make: 'Audi',
    model: 'A3',
    type: 'Sedan'
  },
  {
    make: 'Audi',
    model: 'e-tron',
    type: 'Coupe'
  },
  {
    make: 'Audi',
    model: 'A1',
    type: 'Hatchback'
  },
  {
    make: 'Audi',
    model: 'A4 Allroad',
    type: 'Wagon'
  },
  {
    make: 'Audi',
    model: 'A6 Allroad',
    type: 'Wagon'
  },
  {
    make: 'Chevrolet',
    model: 'Volt',
    type: 'Hatchback'
  },
  {
    make: 'Chevrolet',
    model: 'SILVERADO C2500',
    type: 'Pickup'
  },
  {
    make: 'Chevrolet',
    model: 'SILVERADO K2500',
    type: 'Hatchback'
  },
  {
    make: 'Chevrolet',
    model: 'Malibu',
    type: 'Sedan'
  },
  {
    make: 'Cadillac',
    model: 'ATS',
    type: 'Sedan'
  },
  {
    make: 'Cadillac',
    model: 'CTS',
    type: 'Sedan'
  },
  {
    make: 'BMV',
    model: 'X1',
    type: 'SUV'
  },
  {
    make: 'BMV',
    model: 'X5',
    type: 'SUV'
  },
  {
    make: 'BMV',
    model: '328',
    type: 'Sedan'
  },
  {
    make: 'BMV',
    model: '528',
    type: 'Sedan'
  },
  {
    make: 'Chrysler',
    model: 'Pacifica',
    type: 'Minivan'
  },
  {
    make: 'Chrysler',
    model: '200',
    type: 'Sedan'
  },
  {
    make: 'Chrysler',
    model: 'Crossfire',
    type: 'Coupe'
  },
  {
    make: 'Ford',
    model: 'F150',
    type: 'Pickup'
  },
  {
    make: 'Ford',
    model: 'Focus',
    type: 'Sedan'
  },
  {
    make: 'Ford',
    model: 'Focus',
    type: 'Hatchback'
  },
  {
    make: 'Ford',
    model: 'Mondeo',
    type: 'Sedan'
  },
  {
    make: 'Ford',
    model: 'Escape',
    type: 'SUV'
  },
  {
    make: 'Ford',
    model: 'Transit Connect',
    type: 'Van'
  },
  {
    make: 'Ford',
    model: 'Transporter',
    type: 'Van'
  },
  {
    make: 'Buick',
    model: 'Riviera',
    type: 'Іувфт'
  },
  {
    make: 'Buick',
    model: 'Encore',
    type: 'ІГМ'
  },
  {
    make: 'Buick',
    model: 'Regal',
    type: 'Sedan'
  },
  {
    make: 'GMC',
    model: 'Terrain',
    type: 'SUV'
  },
  {
    make: 'GMC',
    model: 'Acadia',
    type: 'SUV'
  },
  {
    make: 'Honda',
    model: 'Accord',
    type: 'Sedan'
  },
  {
    make: 'Honda',
    model: 'Pilot',
    type: 'SUV'
  },
  {
    make: 'Honda',
    model: 'Jazz',
    type: 'Hatchback'
  },
  {
    make: 'Honda',
    model: 'Odyssey',
    type: 'Minivan'
  },
  {
    make: 'Honda',
    model: 'CR-V',
    type: 'SUV'
  },
  {
    make: 'Jeep',
    model: 'Wrangler',
    type: 'SUV'
  },
  {
    make: 'Jeep',
    model: 'Renegate',
    type: 'SUV'
  },
  {
    make: 'Jeep',
    model: 'Compass',
    type: 'SUV'
  },
  {
    make: 'Dodge',
    model: 'Journey',
    type: 'SUV'
  },
  {
    make: 'Dodge',
    model: 'Dart',
    type: 'Sedan'
  },
  {
    make: 'Dodge',
    model: 'Dart',
    type: 'Coupe'
  },
  {
    make: 'Dodge',
    model: 'Challenger',
    type: 'Coupe'
  },
  {
    make: 'Mercedes-Benz',
    model: 'ML 270',
    type: 'SUV'
  },
  {
    make: 'Mercedes-Benz',
    model: 'GLE 63',
    type: 'Coupe'
  },
  {
    make: 'Mercedes-Benz',
    model: 'C 300',
    type: 'Sedan'
  },
  {
    make: 'Mercedes-Benz',
    model: 'B 200',
    type: 'Hatchback'
  },
  {
    make: 'Mercedes-Benz',
    model: 'Vito',
    type: 'Van'
  },
  {
    make: 'Mitsubishi',
    model: 'Pajero',
    type: 'SUV'
  },
  {
    make: 'Mitsubishi',
    model: 'Lancer',
    type: 'Sedan'
  },
  {
    make: 'Lincoln',
    model: 'Continental',
    type: 'Sedan'
  },
  {
    make: 'Lincoln',
    model: 'MKZ',
    type: 'Sedan'
  },
  {
    make: 'Lincoln',
    model: 'Aviator',
    type: 'SUV'
  },
  {
    make: 'Porsche',
    model: 'Cayenne',
    type: 'SUV'
  },
  {
    make: 'Porsche',
    model: 'Taycan',
    type: 'Sedan'
  },
  {
    make: 'Porsche',
    model: '911',
    type: 'Coupe'
  },
  {
    make: 'Subaru',
    model: 'Impreza',
    type: 'Sedan'
  },
  {
    make: 'Subaru',
    model: 'Outback',
    type: 'SUV'
  },
  {
    make: 'Subaru',
    model: 'Liberty',
    type: 'Sedan'
  },
  {
    make: 'Subaru',
    model: 'Legasy',
    type: 'Sedan'
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    type: 'Sedan'
  },
  {
    make: 'Toyota',
    model: 'Camry',
    type: 'Sedan'
  },
  {
    make: 'Toyota',
    model: 'Sienna',
    type: 'Minivan'
  },
  {
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    type: 'SUV'
  },
  {
    make: 'Toyota',
    model: 'Rav4',
    type: 'SUV'
  },
  {
    make: 'Volkswagen',
    model: 'ID.4',
    type: 'SUV'
  },
  {
    make: 'Volkswagen',
    model: 'Touran',
    type: 'Minivan'
  },
  {
    make: 'Volkswagen',
    model: 'Golf',
    type: 'Wagon'
  },
  {
    make: 'Volkswagen',
    model: 'Jetta',
    type: 'Sedan'
  },
  {
    make: 'Volkswagen',
    model: 'Beetle',
    type: 'Coupe'
  },
  {
    make: 'Volkswagen',
    model: 'Tiguan',
    type: 'SUV'
  },
  {
    make: 'Volkswagen',
    model: 'Amarok',
    type: 'Pickup'
  },
  {
    make: 'Volvo',
    model: 'V40',
    type: 'Hatchback'
  },
  {
    make: 'Volvo',
    model: 'S60',
    type: 'Sedan'
  },
  {
    make: 'Volvo',
    model: 'S90',
    type: 'Sedan'
  },
  {
    make: 'Volvo',
    model: 'XC60',
    type: 'SUV'
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    type: 'Sedan'
  },
  {
    make: 'Tesla',
    model: 'Model X',
    type: 'SUV'
  },
  {
    make: 'Tesla',
    model: 'Model Y',
    type: 'SUV'
  }
]

export {carsModels, cars}
