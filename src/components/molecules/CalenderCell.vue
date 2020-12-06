<template>
  <div :class="[$style.cell, $style[modifierClass]]" @click="setModal">
    {{ day.num }}
    {{ day.holiday }}
    <div :class="[$style.wrapper, { 'is-hidden': isShorten }]">
      <div v-for="task in displayTaskList" :key="task.id" :class="$style.task">
        <span :class="$style.task__close" @click.stop="removeTask(task.id)">×</span>
        {{ task.name }}
      </div>
    </div>
    <button v-if="isShorten && extraTask" :class="$style.button" @click.stop="isShorten = false">
      +{{ extraTask }} More
    </button>
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
      isShorten: true,
    };
  },
  computed: {
    displayTaskList() {
      return this.taskList.filter((task) => task.date === this.day.date);
    },
    modifierClass() {
      if (this.day.holiday) return 'cell--holiday';
      return this.day.lastMonth || this.day.nextMonth ? 'cell--darken' : '';
    },
    extraTask() {
      return this.displayTaskList.length < 2 ? 0 : this.displayTaskList.length - 2;
    },
  },
  methods: {
    ...mapActions(['handleModal']),
    setModal() {
      this.handleModal('open');
      const { date } = this.day;
      this.$emit('handle-set-date', { date });
    },
    removeTask(id) {
      this.$emit('handle-remove-task', { id });
    },
  },
};
</script>

<style module lang="scss">
.cell {
  background-color: ghostwhite;
  font-size: 10px;
  height: 100px;
  margin: 5px auto 0;
  overflow: scroll;
  padding: 5px;
  position: relative;
  width: 98%;
  @media screen and (max-width: 400px) {
    width: 100%;
  }

  &--darken {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &--holiday {
    background-color: rgba(222, 157, 189, 0.3);
  }
}

.wrapper {
  height: auto;
  transition: height 3s;
  &:global(.is-hidden) {
    max-height: 32px;
    overflow: hidden;
  }
}

.task {
  background-color: deepskyblue;
  color: white;
  margin-bottom: 1px;
  overflow: hidden;
  padding: 0 5px;
  padding-right: 10px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task__close {
  color: white;
  cursor: pointer;
  position: absolute;
  right: 3px;
  top: 0;
}
.button {
  bottom: 10px;
  display: block;
  margin: 0 auto;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
</style>
