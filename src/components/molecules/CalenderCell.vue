<template>
  <div :class="$style.cell" @click="setModal">
    <span :class="$style.holiday">{{ holiday }}</span>
    {{ displayYear }}-{{ displayMonth }}-{{ displayDay }}
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    index: {
      Type: Number,
      required: true,
    },
    month: {
      Type: Number,
      required: true,
    },
    weekdayIndex: {
      Type: Number,
      required: true,
    },
    firstDay: {
      Type: String,
      required: true,
    },
    year: {
      Type: Number,
      required: true,
    },
    holidays: {
      Type: Object,
      required: true,
    },
  },
  data() {
    return {
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
  },
  computed: {
    displayNumber() {
      return this.index - this.weekdayIndex;
    },
    lastMonthDays() {
      if (this.month === 1) return this.days[0];
      return this.days[this.month - 2];
    },
    thisMonthDays() {
      return this.days[this.month - 1];
    },
    displayDay() {
      if (this.displayNumber <= 0) return this.lastMonthDays + this.displayNumber; // 先月
      return this.displayNumber <= this.thisMonthDays ? this.displayNumber : this.displayNumber - this.thisMonthDays; // 今月もしくは来月
    },
    displayMonth() {
      if (this.displayNumber < 1 && this.month === 1) return 12;
      if (this.displayNumber > this.thisMonthDays && this.month === 12) return 1;
      if (this.displayNumber < 1) return this.month - 1; // 先月
      return this.displayNumber <= this.thisMonthDays ? this.month : this.month + 1; // 今月もしくは来月
    },
    displayYear() {
      if (this.displayNumber <= 0 && this.month === 1) return this.year - 1; // 先月
      return this.displayNumber > this.thisMonthDays && this.month === 12 ? this.year + 1 : this.year; // 今月もしくは来月
    },
    holiday() {
      return this.holidays[this.formatDate];
    },
    formatDate() {
      return `${this.displayYear}-${`0${String(this.displayMonth)}`.slice(-2)}-${`0${String(this.displayDay)}`.slice(
        -2
      )}`;
    },
  },
  methods: {
    ...mapActions(['handleModal']),
    setModal() {
      this.handleModal('open');
      const date = this.formatDate;
      this.$emit('handle-set-date', { date });
    },
  },
};
</script>

<style module lang="scss">
.cell {
  height: 100px;
  width: 100px;
}
.holiday {
  color: palevioletred;
}
</style>
