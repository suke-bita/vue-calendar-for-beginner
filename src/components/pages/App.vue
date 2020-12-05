<template>
  <div :class="$style.wrapper">
    <Header :year="date.year" :month="date.month" />
    <Calender :date="date" @handle-set-date="setDate" />
    <Modal v-if="isModal" :task-list="taskList" :selected-date="selectedDate" @handle-add-task="addTask" />
  </div>
</template>
<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import Header from '~/components/organisms/Header.vue';
import Calender from '~/components/organisms/Calender.vue';
import Modal from '~/components/organisms/Modal.vue';

const url = 'https://holidays-jp.github.io/api/v1/date.json';
const fetchHolidays = async () => {
  try {
    const res = await axios.get(url);
    console.log(res);
  } catch {
    console.log('error');
  }
};
export default {
  components: {
    Header,
    Calender,
    Modal,
  },
  computed: {
    ...mapState(['date', 'isModal', 'taskList', 'selectedDate']),
  },
  created() {
    fetchHolidays();

    // セルで管理する情報
    // 日にち
    this.initialize();
  },
  methods: {
    ...mapActions(['initialize', 'setDate', 'addTask']),
  },
};
</script>
<style module lang="scss">
.wrapper {
  position: relative;
}
</style>
