<template>
  <div :class="$style.modal" @click.self="handleModal('close')">
    <div :class="$style.modal__inner">
      <span :class="$style.modal__close" @click="handleModal('close')">✖️</span>
      <ModalTaskList v-for="task in displayedTaskList" :key="setId(task.date)" :task="task.taskName" />
      <ModalTaskInput :date="selectedDate" @handle-add-task="handleAddTask" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import uniqId from 'uniqid';
import ModalTaskList from '~/components/molecules/ModalTaskList.vue';
import ModalTaskInput from '~/components/molecules/ModalTaskInput.vue';

export default {
  components: {
    ModalTaskList,
    ModalTaskInput,
  },
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
    selectedDate: {
      type: String,
      default: '',
    },
  },
  computed: {
    displayedTaskList() {
      return this.taskList.filter(({ date }) => date === this.selectedDate);
    },
  },
  methods: {
    ...mapActions(['handleModal']),
    handleAddTask(task) {
      this.$emit('handle-add-task', task);
    },
    setId(date) {
      return uniqId(`${date}_`);
    },
  },
};
</script>

<style module lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.modal__inner {
  background-color: white;
  border-radius: 10px;
  height: 350px;
  left: 50%;
  padding: 40px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}
.modal__close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
