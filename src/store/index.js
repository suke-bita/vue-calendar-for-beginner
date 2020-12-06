// import node_modules
import Vue from 'vue';
import Vuex from 'vuex';

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCalendar: {
      year: '',
      month: '',
      weekdayIndex: '',
      lastMonthDays: '',
      thisMonthDays: '',
    },
    displayDateList: [
      {
        date: '',
        holiday: '',
        taskList: [],
      },
    ], // 表示するカレンダーの日
    isModal: false,
    selectedDate: '',
    taskList: [
      {
        date: '2020-12-20',
        name: 'アイウエオ',
        id: 'aaa',
      },
      {
        date: '2020-12-21',
        name: 'アイウエオ',
        id: 'aaaa',
      },
    ],
    holidays: {},
  },
  getters: {
    displayDateList: (state) => {
      // カレンダー表示
      const array = [...Array(42).keys()]; // 0から41
      return array.map((i) => {
        const point = i - state.currentCalendar.weekdayIndex;
        const lastMonth = point < 1;
        const nextMonth = point > state.currentCalendar.thisMonthDays;

        const day = (() => {
          if (lastMonth) return state.currentCalendar.lastMonthDays + point; // 先月
          if (nextMonth) return point - state.currentCalendar.thisMonthDays; // 来月
          return point; // 今月
        })();
        const month = (() => {
          if (nextMonth && state.currentCalendar.month === 12) return 1; // 来月が1月の時
          if (lastMonth && state.currentCalendar.month === 1) return 12; // 先月が12月の時
          if (lastMonth) return state.currentCalendar.month - 1; // 先月
          if (nextMonth) return state.currentCalendar.month + 1; // 来月
          return state.currentCalendar.month; // 今月
        })();
        const year = (() => {
          if (lastMonth && state.currentCalendar.month === 1) return state.currentCalendar.year - 1; // 去年
          if (nextMonth && state.currentCalendar.month === 12) return state.currentCalendar.year + 1; // 来年
          return state.currentCalendar.year; // 今年
        })();

        const date = `${year}-${`0${String(month)}`.slice(-2)}-${`0${String(day)}`.slice(-2)}`;
        const holiday = state.holidays[date];

        return {
          date,
          holiday,
        };
      });
    },
  },
  mutations: {
    setCalendar(state) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const firstDay = new Date(2020, state.currentCalendar.month, 1);
      const weekdayIndex = firstDay.getDay();
      const lastMonthDays = month === 1 ? days[11] : days[month - 2];
      const thisMonthDays = days[month - 1];
      state.currentCalendar = {
        year,
        month,
        weekdayIndex,
        lastMonthDays,
        thisMonthDays,
      };
    },
    setHolidays(state, payload) {
      state.holidays = payload.holidays;
    },
    handleModal(state, payload) {
      state.isModal = payload === 'open';
    },
    setDate(state, payload) {
      state.selectedDate = payload.date;
    },
    prevMonth(state) {
      const {
        currentCalendar: { month, year },
        currentCalendar,
      } = state;
      state.currentCalendar = // 1月の時は1年減らして12月にする
        month === 1 ? { ...currentCalendar, month: 12, year: year - 1 } : { ...currentCalendar, month: month - 1 };
    },
    nextMonth(state) {
      const {
        currentCalendar: { month, year },
        currentCalendar,
      } = state;
      state.currentCalendar = // 12月の時は1年足して1月にする
        month === 12 ? { ...currentCalendar, month: 1, year: year + 1 } : { ...currentCalendar, month: month + 1 };
    },
    addTask(state, payload) {
      state.taskList = [...state.taskList, payload];
    },
  },
  actions: {
    initialize({ commit }, payload) {
      commit('setCalendar');
      commit('setHolidays', payload);
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
      commit('addTask', payload);
    },
    setDisplayDateList({ commit }) {
      commit('setDisplayDateList');
    },
  },
});
