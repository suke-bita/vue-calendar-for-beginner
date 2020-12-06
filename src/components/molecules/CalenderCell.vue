<template>
  <div :class="$style.cell" @click="setModal">
    {{ day.date }}
    {{ day.holiday }}
    <div v-for="task in displayTaskList" :key="task.id">{{ task.task }}</div>
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
  height: 100px;
  width: 100px;
}
.holiday {
  color: palevioletred;
}
</style>
