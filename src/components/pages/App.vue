<template>
  <div v-if="connection" :class="$style.wrapper">
    <Header :year="currentCalendar.year" :month="currentCalendar.month" />
    <Calender
      :current-calendar="currentCalendar"
      :holidays="holidays"
      :display-date-list="displayDateList"
      @handle-set-date="setDate"
    />
    <Modal v-if="isModal" :task-list="taskList" :selected-date="selectedDate" @handle-add-task="addTask" />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import axios from 'axios';
import Header from '~/components/organisms/Header.vue';
import Calender from '~/components/organisms/Calender.vue';
import Modal from '~/components/organisms/Modal.vue';

const HOLIDAY_URL = 'https://holidays-jp.github.io/api/v1/date.json';

export default {
  components: {
    Header,
    Calender,
    Modal,
  },
  data() {
    return {
      connection: false,
    };
  },
  computed: {
    ...mapState(['currentCalendar', 'isModal', 'taskList', 'selectedDate', 'holidays']),
    ...mapGetters(['displayDateList']),
  },
  created() {
    (async () => {
      try {
        const { data: holidays } = await axios.get(HOLIDAY_URL);
        this.initialize({ holidays });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.connection = true;
      }
    })();
  },
  methods: {
    ...mapActions(['initialize', 'setDate', 'addTask', 'setDisplayDateList']),
  },
};
</script>
<style module lang="scss">
.wrapper {
  position: relative;
}
</style>
