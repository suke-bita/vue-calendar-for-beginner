<template>
  <div :class="[$style.cell, $style[modifierClass]]" @click="setModal">
    <span v-if="day.num === 1">{{ day.month }}/</span>{{ day.num }} {{ day.holiday }}
    <span v-if="isToday">今日</span>
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
    index: {
      type: Number,
      required: true,
    },
    taskList: {
      type: Array,
      default: () => [],
    },
    today: {
      type: String,
      default: '',
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
      if (this.isToday) return 'cell--today';
      if (this.day.lastMonth || this.day.nextMonth) return 'cell--darken';
      if (this.day.holiday) return 'cell--holiday';
      if (this.index === 0 || this.index % 7 === 0) return 'cell--sunday';
      if (this.index % 7 === 6) return 'cell--saturday';
      return '';
    },
    extraTask() {
      return this.displayTaskList.length < 2 ? 0 : this.displayTaskList.length - 2;
    },
    isToday() {
      return this.today === this.day.date;
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
  color: #333;
  font-size: 10px;
  height: 100px;
  margin: 5px auto 0;
  overflow: scroll;
  padding: 5px;
  position: relative;
  width: 98%;
  @media screen and (max-width: 400px) {
    max-width: 100%;
  }

  &--holiday {
    background-color: rgba(222, 157, 189, 0.3);
    color: red;
  }
  &--saturday {
    background-color: rgba(171, 196, 255, 0.3);
    color: dodgerblue;
  }
  &--sunday {
    background-color: rgba(222, 157, 189, 0.3);
    color: red;
  }
  &--darken {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &--today {
    background-color: rgba(165, 156, 255, 0.5);
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
  max-width: 100%;
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
