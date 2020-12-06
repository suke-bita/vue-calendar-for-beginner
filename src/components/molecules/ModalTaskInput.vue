<template>
  <div>
    <input v-model="name" type="text" />
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
      name: '',
    };
  },
  methods: {
    handleAddTask() {
      const { name, date } = this;
      const id = uniqId();

      this.$emit('handle-add-task', { name, date, id });
    },
  },
};
</script>
