<template>
  <div>
    <input v-model="name" :class="$style.input" type="text" />
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
      if (!name) return;
      const id = uniqId();
      this.$emit('handle-add-task', { name, date, id });
    },
  },
};
</script>
<style module lang="scss">
.input {
  width: 92%;
}
</style>
