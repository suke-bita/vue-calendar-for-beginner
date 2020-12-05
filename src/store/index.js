// import node_modules
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    date: {
      today: '',
      year: '',
      month: '',
      firstDay: '',
      weekdayIndex: '',
    },
    isModal: false,
    selectedDate: '',
    taskList: [
      {
        date: '2020-12-20',
        task: 'アイウエオ',
      },
      {
        date: '2020-12-21',
        task: 'アイウエオ',
      },
    ],
  },
  getters: {},
  mutations: {
    initialize(state) {
      const today = new Date(); // Fri Dec 04 2020 16:19:49
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // 11 index
      const firstDay = new Date(2020, state.date.month, 1); // Fri Dec 04 2020 16:19:49 G
      const weekdayIndex = firstDay.getDay(); // 2 index
      state.date = {
        year,
        today,
        month,
        firstDay,
        weekdayIndex,
      };
    },
    handleModal(state, payload) {
      this.state.isModal = payload === 'open';
    },
    setDate(state, payload) {
      this.state.selectedDate = payload.date;
    },
    prevMonth(state) {
      if (state.date.month === 1) {
        state.date.month = 12;
        state.date.year -= 1;
      } else {
        state.date.month -= 1;
      }
    },
    nextMonth(state) {
      if (state.date.month === 12) {
        state.date.month = 1;
        state.date.year += 1;
      } else {
        state.date.month += 1;
      }
    },
    addTask(state, payload) {
      console.log(payload);
      state.taskList = [...state.taskList, payload];
    },
  },
  actions: {
    initialize({ commit }) {
      commit('initialize');
    },
    handleModal({ commit }, payload) {
      commit('handleModal', payload);
    },
    setDate({ commit }, payload) {
      commit('setDate', payload);
    },
    prevMonth({ commit }) {
      commit('prevMonth');
    },
    nextMonth({ commit }) {
      commit('nextMonth');
    },
    addTask({ commit }, payload) {
      console.log(payload);
      commit('addTask', payload);
    },
  },
});
