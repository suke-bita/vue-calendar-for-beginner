<template>
  <div>
    <input v-model="task" type="text" />
    <button @click="handleAddTask">+</button>
  </div>
</template>

<script>
import uniqId from 'uniqid';

export default {
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      task: '',
    };
  },
  methods: {
    handleAddTask() {
      const { task, date } = this;
      const id = uniqId();

      this.$emit('handle-add-task', { task, date, id });
    },
  },
};
</script>
