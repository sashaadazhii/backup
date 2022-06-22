<template>
  <div class="calendar__wrapper">
    <TheHeader :viewCol="viewCol" @changeView="changeView" :activeDay="activeDay" @changeDay="changeDay" />
    <div v-if="!viewCol" class="calendar__inner row">
      <div class="calendar__days">
        <Day v-for="day of days" :key="day.id" :day="day" @click="selectDay(day.id)" />
      </div>
      <div v-if="selectedDay" class="calendar__tasks">
        <Accordion v-for="task of selectedDay.tasks" :key="task.id" :task="task" />
      </div>
    </div>
    <div v-else class="calendar__inner col">
      <div v-for="day of days" :key="day.id" class="col-wrapper">
        <div class="col-day">
          <Day :day="day" />
        </div>
        <div class="col-tasks">
          <Accordion v-for="task of day.tasks" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './CalendarHeader'
import Day from './CalendarDay'
import dayjs from 'dayjs'
import Accordion from './AccordionCalendar'
import _ from 'lodash'
export default {
  name: 'CalendarPage',
  components: {Day, Accordion, TheHeader},
  data() {
    return {
      days: [],
      activeDay: dayjs(),
      selectedDay: null,
      viewCol: false
    }
  },
  watch: {
    selectedDay(d) {
      this.$nextTick().then(() => {
        const tasksDom = document.querySelector('.calendar__inner.row .calendar__days')
        const pointer = this.days.indexOf(d)
        const optionHeight = 320
        const pointerPosition = pointer * optionHeight
        const visibleElements = tasksDom.offsetWidth / optionHeight
        if (tasksDom.scrollLeft <= pointerPosition - (visibleElements - 2) * optionHeight) {
          tasksDom.scrollLeft = pointerPosition - (visibleElements - 2) * optionHeight
        } else if (tasksDom.scrollLeft > pointerPosition) {
          tasksDom.scrollLeft = pointerPosition
        }
      })

      // console.log(tasksDom.scrollLeft, pointer, tasksDom.offsetWidth)
      // tasksDom.scrollLeft = pointer * 320 - (tasksDom.offsetWidth / 320 - 1) * 320
      // console.dir(tasksDom)
      // if (this.$refs.list.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight) {
    }
  },
  created() {
    this.createCalendar()
  },
  mounted() {
    this.scrollToDay()
  },
  methods: {
    createCalendar(month) {
      this.days = []
      if (month) {
        for (let i = 0; i < dayjs(month).daysInMonth(); i++) {
          const task = {
            id: this.$getID(),
            active: false,
            day: dayjs(month).add(i, 'day'),
            tasks: this.createTasks(_.random(6), _.random(6))
          }
          if (dayjs(task.day).isSame(dayjs(month), 'day')) {
            task.active = true
            this.selectedDay = task
          }
          this.days.push(task)
        }
      } else {
        for (let i = 0; i <= 10; i++) {
          const task = {
            id: this.$getID(),
            active: false,
            day: dayjs().add(i, 'day'),
            tasks: this.createTasks(_.random(6), _.random(6))
          }
          const previousTask = {
            id: this.$getID(),
            active: false,
            day: dayjs().subtract(i, 'day'),
            tasks: this.createTasks(_.random(6), _.random(6))
          }
          if (i === 0) {
            previousTask.active = true
            this.selectedDay = previousTask
          }

          this.days.unshift(previousTask)
          if (i > 0) this.days.push(task)
        }
      }
    },
    changeDay({day}) {
      const isCurrentMonth = dayjs(this.activeDay).isSame(dayjs(day), 'month')
      if (!isCurrentMonth) {
        this.createCalendar(dayjs(dayjs(day).startOf('month')))
      }
      this.activeDay = day
      this.days.forEach(d => (d.active = false))
      this.selectedDay = this.days.find(d => dayjs(d.day).isSame(dayjs(day), 'day'))
      this.selectedDay.active = true
      // this.$nextTick().then(() => this.scrollToDay())
      //================================================================

      // this.activeDay = day
      // this.days.forEach(d => (d.active = false))
      // this.selectedDay = this.days.find(d => dayjs(d.day).isSame(dayjs(day), 'day'))
      // this.selectedDay.active = true
      //================================================================

      // if (today) {
      //   if (dayjs().isSame(dayjs(this.activeDay), 'day')) return

      //   this.activeDay = dayjs()
      //   this.createCalendar(dayjs(dayjs().startOf('month')))
      //   this.$nextTick().then(() => this.scrollToday())
      // }

      //================================================================
      // if (day) {
      //   this.activeDay = day
      //   this.createCalendar(dayjs(dayjs(day).startOf('month')))
      //   this.selectedDay = this.days[0]
      //   if (this.viewCol) {
      //     const tasksDom = document.querySelector('.calendar__inner.col')
      //     tasksDom.scrollTop = 0
      //   } else {
      //     const tasksDom = document.querySelector('.calendar__inner.row .calendar__days')
      //     tasksDom.scrollLeft = 0
      //   }
      // }
    },
    scrollToDay() {
      if (this.viewCol) {
        const tasksDom = document.querySelector('.calendar__inner.col')
        const activeTask = document.querySelector('.day__wrapper.active')
        tasksDom.scrollTop = activeTask.offsetTop - 20 // Padding in DOM Father
      } else {
        const tasksDom = document.querySelector('.calendar__inner.row .calendar__days')
        const activeTask = document.querySelector('.day__wrapper.active')
        tasksDom.scrollLeft = activeTask.offsetLeft - 20 // Padding in DOM Father
      }
    },
    createTasks(taskQnt, jobQnt) {
      const colors = ['#62D00C', '#0B77F5', '#10B981', '#F55F0B', '#374151']
      const titles = [
        'Inspection Report',
        'Waiting for client to pick up',
        'Done and waiting',
        'Needs clients confirmation',
        'Done and paid'
      ]
      const texts = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id quam vitae ex dignissim gravida. Nulla vitae dictum augue. Aliquam commodo ultrices turpis. Fusce rutrum purus id sollicitudin euismod. Praesent maximus, nisl ac ullamcorper vulputate, nisi dui interdum sapien, ut.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis facilisis sem. Mauris quis sapien vel enim tincidunt placerat vitae vestibulum sapien. Curabitur interdum efficitur eros ut mattis. Pellentesque semper vestibulum lorem, ut pellentesque mi gravida ac. Donec eu enim turpis. Ut maximus magna placerat cursus pretium. Integer bibendum ante.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales lacus et neque accumsan rhoncus. Aliquam mi sem, mattis sit amet rutrum quis, tempor in nulla. Etiam nisl nibh, vehicula.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius lectus nulla, id fermentum lacus finibus sit amet. Morbi nec.'
      ]
      const tasks = []
      for (let i = 0; i < taskQnt; i++) {
        const task = {
          id: this.$getID(),
          color: _.sample(colors),
          title: _.sample(titles),
          jobs: []
        }
        for (let i = 0; i < _.random(jobQnt); i++) {
          const job = {
            id: this.$getID(),
            title: _.sample(titles),
            text: _.sample(texts)
          }
          task.jobs.push(job)
        }
        tasks.push(task)
      }
      // const task = {
      //   id: 0,
      //   color: _.sample(colors),
      //   title: 'Inspection Report',
      //   jobs: [
      //     {
      //       id: 0,
      //       title: 'Inspection Report',
      //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus varius viverra. Vestibulum mattis at orci ac molestie. Vivamus vitae dui ut sapien ultricies tempor sed non enim. Nunc sed pulvinar nulla, vitae tempus mi. Duis dignissim laoreet leo non pulvinar. Integer leo nunc, molestie vehicula urna ac, imperdiet accumsan sapien. Vivamus mattis, massa ut viverra sollicitudin, eros dui pulvinar risus, id accumsan felis dui in urna'
      //     },
      //     {
      //       id: 1,
      //       title: 'Inspection Report',
      //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus varius viverra. Vestibulum mattis at orci ac molestie. Vivamus vitae dui ut sapien ultricies tempor sed non enim. Nunc sed pulvinar nulla, vitae tempus mi. Duis dignissim laoreet leo non pulvinar. Integer leo nunc, molestie vehicula urna ac, imperdiet accumsan sapien. Vivamus mattis, massa ut viverra sollicitudin, eros dui pulvinar risus, id accumsan felis dui in urna'
      //     },
      //     {
      //       id: 2,
      //       title: 'Inspection Report',
      //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus varius viverra. Vestibulum mattis at orci ac molestie. Vivamus vitae dui ut sapien ultricies tempor sed non enim. Nunc sed pulvinar nulla, vitae tempus mi. Duis dignissim laoreet leo non pulvinar. Integer leo nunc, molestie vehicula urna ac, imperdiet accumsan sapien. Vivamus mattis, massa ut viverra sollicitudin, eros dui pulvinar risus, id accumsan felis dui in urna'
      //     },
      //     {
      //       id: 3,
      //       title: 'Inspection Report',
      //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus varius viverra. Vestibulum mattis at orci ac molestie. Vivamus vitae dui ut sapien ultricies tempor sed non enim. Nunc sed pulvinar nulla, vitae tempus mi. Duis dignissim laoreet leo non pulvinar. Integer leo nunc, molestie vehicula urna ac, imperdiet accumsan sapien. Vivamus mattis, massa ut viverra sollicitudin, eros dui pulvinar risus, id accumsan felis dui in urna'
      //     }
      //   ]
      // }
      return tasks
    },
    selectDay(id) {
      this.days.forEach(d => (d.active = false))
      const selectedDay = this.days.find(day => day.id === id)
      selectedDay.active = true
      this.selectedDay = selectedDay
      this.activeDay = selectedDay.day
    },
    changeView(view) {
      this.viewCol = view
      this.$nextTick().then(() => this.scrollToDay())
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
