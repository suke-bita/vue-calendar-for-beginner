<template>
  <div :class="[$style.cell, $style[modifierClass]]" @click="setModal">
    {{ day.num }}
    {{ day.holiday }}
    <div v-for="task in displayTaskList" :key="task.id">{{ task.name }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    day: {
      type: Object,
      required: true,
    },
    taskList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
  },
  computed: {
    displayTaskList() {
      return this.taskList.filter((task) => task.date === this.day.date);
    },
    modifierClass() {
      return this.day.lastMonth || this.day.nextMonth ? 'cell--darken' : '';
    },
  },
  methods: {
    ...mapActions(['handleModal']),
    setModal() {
      this.handleModal('open');
      const { date } = this.day;
      this.$emit('handle-set-date', { date });
    },
  },
};
</script>

<style module lang="scss">
.cell {
  font-size: 10px;
  height: 100px;
  margin: 5px auto 0;
  padding: 5px;
  width: 100px;

  &--darken {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.holiday {
  color: palevioletred;
}
</style>
