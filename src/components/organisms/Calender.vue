<template>
  <div>
    <div :class="$style.calender">
      <div v-for="day in $options.static.days" :key="day" :class="$style.cell">{{ day }}</div>
      <CalenderCell
        v-for="day in displayDateList"
        :key="day.date"
        :task-list="taskList"
        :day="day"
        @handle-set-date="handleSetDate"
        @handle-remove-task="handleRemoveTask"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import CalenderCell from '~/components/molecules/CalenderCell.vue';

export default {
  components: {
    CalenderCell,
  },
  props: {
    currentCalendar: {
      type: Object,
      required: true,
    },
    holidays: {
      type: Object,
      default: () => {},
    },
    displayDateList: {
      type: Array,
      required: true,
    },
    taskList: {
      type: Array,
      default: () => [],
    },
  },
  static: {
    days: ['日', '月', '火', '水', '木', '金', '土'],
    day: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  },
  methods: {
    ...mapActions(['setDisplayDateList']),
    handleSetDate(payload) {
      this.$emit('handle-set-date', payload);
    },
    handleRemoveTask(payload) {
      this.$emit('handle-remove-task', payload);
    },
  },
};
</script>

<style module lang="scss">
.calender {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 10px;
  min-width: 900px;
  @media screen and (max-width: 400px) {
    min-width: auto;
  }
}
.cell {
  border-bottom: 1px dashed black;
  height: 30px;
  margin: 0 auto;
  text-align: center;
  width: 100px;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
}
</style>
