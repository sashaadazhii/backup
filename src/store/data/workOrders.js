/* eslint-disable */

const workOrders = {
  unscheduled: [],
  todo: [],
  inProgress: [],
  done: []
}
const requests = [
  {
    id: 1,
    // workOrderID: 1,
    status: 'Not Processed',
    techs: [
      {
        id: 23483,
        firstName: 'Enzo',
        lastName: 'Ferrari'
      }
    ],
    cards: [],
    notes:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed',
    estimatedTime: '2h',
    trackedTime: '1h 20min'
  },
  {
    id: 2,
    // workOrderID: 1,
    status: 'Not Processed',
    techs: [
      {
        id: 23483,
        firstName: 'Enzo',
        lastName: 'Ferrari'
      }
    ],
    cards: [],
    notes: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    estimatedTime: '3h',
    trackedTime: '2h'
  },
  {
    id: 3,
    // workOrderID: 1,
    status: 'Not Processed',
    techs: [
      {
        id: 23483,
        firstName: 'Enzo',
        lastName: 'Ferrari'
      }
    ],
    cards: [],
    notes: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    estimatedTime: '3h',
    trackedTime: '2h'
  }
]

export {workOrders, requests}
