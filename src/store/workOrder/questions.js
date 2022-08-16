export default {
  namespaced: true,
  state: {
    questions: [
      {
        title: 'When you feel these vibrations:',
        time: 0,
        id: 124124,
        blocks: [
          {
            type: 'Input',
            title: 'At what approximate speed you’re usually going?',
            placeholder: 'Enter Speed',
            value: null
          },
          {
            type: 'Select',
            title: 'Do you feel it while you’re braking?',
            list: ['Yes', 'No'],
            value: null
          },
          {
            type: 'Select',
            title: 'Is this vibration constant?',
            list: ['Yes', 'No'],
            value: null
          }
        ]
      },
      {
        title: 'When you hear these sounds:',
        time: 0,
        id: 132324,
        blocks: [
          {
            type: 'Input',
            title: 'Where do you generally hear them from?',
            placeholder: 'Choose Side',
            value: null
          }
        ]
      },
      {
        title: 'When do you generally hear the noise when you’re driving?',
        time: 0,
        id: 12412092,
        blocks: [
          {
            type: 'Drop-Down',
            title: 'Choose option or a few options:',
            placeholder: 'Chose option',
            value: null,
            list: ['off road', 'highway', 'when turning']
          }
        ]
      }
    ],
    activeQuestions: {}
  },
  mutations: {
    set(state, questions) {
      state.activeQuestions = questions
    },
    add(state, questions) {
      state.questions.push(questions)
    },
    remove(state, id) {
      const idx = state.questions.findIndex(q => q.id === id)
      state.questions.splice(idx, 1)
    },
    update(state, group) {
      const idx = state.questions.findIndex(q => q.id === group.id)
      state.questions.splice(idx, 1, group)
    }
  },
  actions: {}
}
