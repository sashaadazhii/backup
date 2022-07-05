const workOrders = [
  {
    unscheduled: [
      {
        uid: 'b557f609-af6c-4184-a8ba-4d46499ae5d',
        progress: 'To Do',
        status: 'Not Started',
        number: 14,
        dateStart: '17 Nov 11:00 AM ',
        dateEnd: '18 Nov 3:40 PM',
        estTime: '2h',
        trackedTime: '1 hour 20 min',
        customer: {
          uid: '2f61a152-9c3f-42e9-823c-e412f348ec10',
          firstName: 'Marcus',
          lastName: 'Howard',
          name: 'Marcus Howard',
          cellPhones: ['298 958 1918', '658 583 2329']
        },
        vehicle: {
          uid: '3d2c4314-da40-4548-9829-8f93dfe8e35c',
          make: 'Toyota',
          model: 'Tacoma',
          year: 2003,
          status: 'in-shop',
          currentOdometer: 145984
        },
        notes: [
          {
            author: 'Maynard Bauman',
            alias: 'MB',
            date: '14:53 23 Jun 2022',
            pin: false,
            text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
          },
          {
            author: 'Brett Ostrander',
            alias: 'BO',
            date: '17:30 23 Jun 2022',
            pin: false,
            text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
          }
        ],
        customerRequests: [
          {
            uid: '56b184d4-8d8f-4be1-80b7-c51aedc84589',
            requestType: 'question',
            requestName: 'Vibrations',
            speed: 75,
            requestDetails: [
              {
                question: 'While braking',
                answer: 'Yes'
              },
              {
                question: 'Constant',
                answer: 'No'
              }
            ]
          },
          {
            uid: '5b0b8aa6-b28f-4f43-a441-3d24857f962b',
            requestType: 'question',
            requestName: 'Vibrations',
            speed: 60,
            requestDetails: [
              {
                question: 'While braking',
                answer: 'Yes'
              },
              {
                question: 'Constant',
                answer: 'No'
              }
            ]
          }
        ]
      },
      {
        uid: 'c592ca89-04fd-4076-9d12-e9daff047b04',
        progress: 'To Do',
        status: 'Not Started',
        number: 15,
        dateStart: '18 Nov 10:00 AM ',
        dateEnd: '20 Nov 6:40 PM',
        estTime: '5h',
        trackedTime: '6 hour 54 min',
        customer: {
          uid: '2f61a152-9c3f-42e9-823c-e412f348ec53',
          firstName: 'Mike',
          lastName: 'Smith',
          name: 'Mike Smith',
          cellPhones: ['345 900 2340', '234 566 0987']
        },
        vehicle: {
          uid: '05d7ea34-d613-482a-aabc-4af7b8e8008b',
          make: 'Audi',
          model: 'A7',
          year: 2021,
          status: 'in-shop',
          currentOdometer: 122014
        },
        notes: [
          {
            author: 'Maynard Bauman',
            alias: 'MB',
            date: '14:53 23 Jun 2022',
            pin: false,
            text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
          },
          {
            author: 'Brett Ostrander',
            alias: 'BO',
            date: '17:30 23 Jun 2022',
            pin: false,
            text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
          },
          {
            author: 'Alex Sotskyi',
            alias: 'AS',
            date: '07:50 29 Jun 2022',
            pin: false,
            text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
          }
        ],
        customerRequests: [
          {
            uid: '55224d80-5ddc-4b81-910e-19efcf2b604e',
            requestType: 'question',
            requestName: 'Vibrations',
            speed: 75,
            requestDetails: [
              {
                question: 'While braking',
                answer: 'Yes'
              },
              {
                question: 'Constant',
                answer: 'No'
              }
            ]
          },
          {
            uid: '65e829e2-9631-44de-afb4-1c1f93dfc2f8',
            requestType: 'Customer Request',
            requestName: 'Weird noise is at the back of the vehicle. It seems like some parts are not being connected. Firts time happened a week ago.',
            requestDetails: [
              {
                question: 'While braking',
                answer: 'No'
              },
              {
                question: 'Constant',
                answer: 'No'
              }
            ]
          }
        ]
      }
    ]
  },

  {
    uid: 'd7a997c9-3d59-4315-9dae-f35e2cda9b47',
    progress: 'In Progress',
    status: 'Inspection Report',
    number: 17,
    dateStart: '15 Nov 09:00 AM ',
    dateEnd: '20 Nov 6:40 PM',
    estTime: '3h',
    trackedTime: '2 hour 54 min',
    customer: {
      uid: 'ad7608eb-dfd4-40a9-876f-16972a08465f',
      firstName: 'Scott',
      lastName: 'Sutton',
      name: 'Scott Sutton',
      cellPhones: ['206 944 9639', '568 123 7640']
    },
    vehicle: {
      uid: '05d7ea34-d613-482a-aabc-4af7b8e8008b',
      make: 'Ford',
      model: 'Explorer',
      year: 1992,
      status: 'in-shop',
      currentOdometer: 260961
    },
    notes: [
      {
        author: 'Alex Sotskyi',
        alias: 'AS',
        date: '07:50 29 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      }
    ],
    customerRequests: [
      {
        uid: '4ce6a261-3ff7-42cf-a20d-bc250b0bdcb0',
        requestType: 'question',
        requestName: 'Vibrations',
        speed: 75,
        requestDetails: [
          {
            question: 'While braking',
            answer: 'Yes'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      },
      {
        uid: '3e3b3fc1-0791-4f60-8615-4d720338903d',
        requestType: 'Customer Request',
        requestName: 'Weird noise is at the back of the vehicle. It seems like some parts are not being connected. Firts time happened a week ago.',
        requestDetails: [
          {
            question: 'While braking',
            answer: 'No'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      }
    ]
  },
  {
    uid: '24a820da-caa1-4a82-8808-e972e62dc20e',
    progress: 'In Progress',
    status: 'Needs Clients Confirmation',
    number: 34,
    dateStart: '30 Nov 11:00 AM ',
    dateEnd: '2 Dec 5:40 PM',
    estTime: '7h',
    trackedTime: '10 hour 30 min',
    customer: {
      uid: '6cfd801-ab35-4e96-a807-169af69d5f3e',
      firstName: 'Felicia',
      lastName: 'Perez',
      name: 'Felicia Perez',
      cellPhones: ['089 667 5002']
    },
    vehicle: {
      uid: '3a99bcc0-180f-4ee6-93fb-ed7fb2583403',
      make: 'GMC',
      model: 'Sierra 3500',
      year: 2001,
      status: 'in-shop',
      currentOdometer: 129998
    },
    notes: [
      {
        author: 'Maynard Bauman',
        alias: 'MB',
        date: '14:53 23 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      },
      {
        author: 'Brett Ostrander',
        alias: 'BO',
        date: '17:30 23 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      }
    ],
    customerRequests: [
      {
        uid: '444f1df6-716f-47c9-98c8-507f1e2ed7b6',
        requestType: 'question',
        requestName: 'Vibrations',
        speed: 75,
        requestDetails: [
          {
            question: 'While braking',
            answer: 'Yes'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      }
    ]
  },
  {
    uid: '24a820da-caa1-4a82-8808-e972e62dc20e',
    progress: 'Done',
    status: 'Done',
    number: 5,
    dateStart: '19 Nov 10:00 AM ',
    dateEnd: '21 Dec 8:00 PM',
    estTime: '5h',
    trackedTime: '4 40 min',
    customer: {
      uid: '5a2cec0a-669f-4191-a761-aa734f6559e6',
      firstName: 'Michel',
      lastName: 'Adams',
      name: 'Michel Adams',
      cellPhones: ['633 665 0752', '5998 342 2158', '096 429 6484']
    },
    vehicle: {
      uid: '57a23669-1761-470e-8bc2-49aeb1702dcc',
      make: 'HUMMER',
      model: 'H2',
      year: 2008,
      status: 'in-shop',
      currentOdometer: 54470
    },
    notes: [],
    customerRequests: [
      {
        uid: '56b184d4-8d8f-4be1-80b7-c51aedc84589',
        requestType: 'question',
        requestName: 'Vibrations',
        speed: 75,
        requestDetails: [
          {
            question: 'While braking',
            answer: 'Yes'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      },
      {
        uid: '5b0b8aa6-b28f-4f43-a441-3d24857f962b',
        requestType: 'question',
        requestName: 'Vibrations',
        speed: 60,
        requestDetails: [
          {
            question: 'While braking',
            answer: 'Yes'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      }
    ]
  },
  {
    uid: '24a820da-caa1-4a82-8808-e972e62dc20e',
    progress: 'Done',
    status: 'Done',
    number: 5,
    dateStart: '19 Nov 10:00 AM ',
    dateEnd: '21 Dec 8:00 PM',
    estTime: '5h',
    trackedTime: '4 40 min',
    customer: {
      uid: 'e2bf591a-f346-462e-b9de-b27d336d6d43',
      firstName: 'Krin',
      lastName: 'Brooks',
      name: 'Krin Brooks',
      cellPhones: ['549 730 0464']
    },
    vehicle: {
      uid: '1de24766-07f1-4027-b9a1-87eb68776848',
      make: 'Mitsubishi',
      model: 'Lancer',
      year: 2010,
      status: 'in-shop',
      currentOdometer: 34987
    },
    notes: [
      {
        author: 'Maynard Bauman',
        alias: 'MB',
        date: '14:53 23 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      },
      {
        author: 'Brett Ostrander',
        alias: 'BO',
        date: '17:30 23 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      },
      {
        author: 'Alex Sotskyi',
        alias: 'AS',
        date: '07:50 29 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      }
    ],
    customerRequests: [
      {
        uid: 'f149557a-f869-45da-b33b-f8375ca73e74',
        requestType: 'question',
        requestName: 'Vibrations',
        speed: 75,
        requestDetails: [
          {
            question: 'While braking',
            answer: 'Yes'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      },
      {
        uid: '70ee9c08-cb92-435e-b880-f13cba2d4141',
        requestType: 'Customer Request',
        requestName: 'Weird noise is at the back of the vehicle. It seems like some parts are not being connected. Firts time happened a week ago.',
        requestDetails: [
          {
            question: 'While braking',
            answer: 'No'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      }
    ]
  },
  {
    uid: '24a820da-caa1-4a82-8808-e972e62dc20e',
    progress: 'Done',
    status: 'Done',
    number: 5,
    dateStart: '19 Nov 10:00 AM ',
    dateEnd: '21 Dec 8:00 PM',
    estTime: '5h',
    trackedTime: '4 40 min',
    customer: {
      uid: 'e2bf591a-f346-462e-b9de-b27d336d6d43',
      firstName: 'Krin',
      lastName: 'Brooks',
      name: 'Krin Brooks',
      cellPhones: ['549 730 0464']
    },
    vehicle: {
      uid: '1de24766-07f1-4027-b9a1-87eb68776848',
      make: 'Land Rover',
      model: 'Discovery II',
      year: 2002,
      status: 'in-shop',
      currentOdometer: 1976543
    },
    notes: [
      {
        author: 'Alex Sotskyi',
        alias: 'AS',
        date: '07:50 29 Jun 2022',
        pin: false,
        text: "Call her on her cellphone but keep trying until she answers because she can't get messages."
      }
    ],
    customerRequests: [
      {
        uid: 'f149557a-f869-45da-b33b-f8375ca73e74',
        requestType: 'question',
        requestName: 'Vibrations',
        speed: 100,
        requestDetails: [
          {
            question: 'While braking',
            answer: 'Yes'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      },
      {
        uid: '70ee9c08-cb92-435e-b880-f13cba2d4141',
        requestType: 'Customer Request',
        requestName: 'Weird noise is at the back of the vehicle. It seems like some parts are not being connected. Firts time happened a week ago.',
        requestDetails: [
          {
            question: 'While braking',
            answer: 'No'
          },
          {
            question: 'Constant',
            answer: 'No'
          }
        ]
      }
    ]
  }
]

export {workOrders}
