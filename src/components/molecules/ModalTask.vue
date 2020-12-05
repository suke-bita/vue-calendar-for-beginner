<template>
  <div>
    {{ taskList }}
    <input v-model="taskName" type="text" />
    <button @click="handleAddTask">+</button>
  </div>
</template>

<script>
export default {
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    handleAddTask() {
      const { taskName, date } = this;
      this.$emit('handle-add-task', { taskName, date });
    },
  },
};
</script>
