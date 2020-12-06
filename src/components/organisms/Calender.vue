<template>
  <div>
    <div :class="$style.calender">
      <div v-for="day in $options.static.days" :key="day" :class="$style.cell">{{ day }}</div>
      <CalenderCell v-for="day in displayDateList" :key="day.date" :day="day" @handle-set-date="handleSetDate" />
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
