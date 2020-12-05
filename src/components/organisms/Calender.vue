<template>
  <div>
    <div :class="$style.calender">
      <div v-for="day in $options.static.days" :key="day" :class="$style.cell">{{ day }}</div>
      <CalenderCell
        v-for="index in 42"
        :key="index"
        :index="index"
        :month="date.month"
        :weekday-index="date.weekdayIndex"
        :first-day="date.firstDay"
        :year="date.year"
        @handle-set-date="handleSetDate"
      />
    </div>
  </div>
</template>
<script>
import CalenderCell from '~/components/molecules/CalenderCell.vue';

export default {
  components: {
    CalenderCell,
  },
  props: {
    date: {},
  },
  static: {
    days: ['日', '月', '火', '水', '木', '金', '土'],
  },
  methods: {
    handleSetDate(payload) {
      this.$emit('handle-set-date', payload);
    },
  },
};
</script>

<style module lang="scss">
.calender {
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.cell {
  height: 30px;
  width: 100px;
}
</style>
