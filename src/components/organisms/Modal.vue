<template>
  <div :class="$style.modal" @click.self="handleModal('close')">
    <div :class="$style.modal__inner">
      <span :class="$style.modal__close" @click="handleModal('close')">✖️</span>
      <ModalTask :task-list="displayedTaskList" :date="selectedDate" @handle-add-task="handleAddTask" />
      <!--      TODO keyをユニークにする-->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ModalTask from '~/components/molecules/ModalTask.vue';

export default {
  components: {
    ModalTask,
  },
  props: {
    taskList: {
      type: Array,
    },
    selectedDate: {
      type: String,
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
