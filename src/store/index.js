// import node_modules
import Vue from 'vue';
import Vuex from 'vuex';
import { STORAGE_KEY } from '../constants/index';

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getCalendar = (year, month) => {
  const firstDay = new Date(year, month - 1, 1);
  const weekdayIndex = firstDay.getDay();
  const lastMonthDays = month === 1 ? days[11] : days[month - 2];
  const thisMonthDays = days[month - 1];
  return {
    year,
    month,
    weekdayIndex,
    lastMonthDays,
    thisMonthDays,
  };
};

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
        name: '予定1',
        id: '1',
      },
      {
        date: '2020-12-21',
        name: 'タスク',
        id: '2',
      },
    ],
    holidays: {},
    today: '',
  },
  getters: {
    displayDateList: (state) => {
      // カレンダー表示
      const array = [...Array(42).keys()]; // 0から41
      return array.map((i) => {
        const point = i - state.currentCalendar.weekdayIndex + 1;
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
          num: day,
          month,
          date,
          holiday,
          lastMonth,
          nextMonth,
        };
      });
    },
  },
  mutations: {
    setCalendar(state) {
      const today = new Date();
      const day = today.getDate();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      state.currentCalendar = getCalendar(year, month);
      state.today = `${year}-${`0${String(month)}`.slice(-2)}-${`0${String(day)}`.slice(-2)}`;
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
      } = state;
      const thisMonth = month === 1 ? 12 : month - 1;
      const thisYear = month === 1 ? year - 1 : year;

      state.currentCalendar = getCalendar(thisYear, thisMonth);
    },
    nextMonth(state) {
      const {
        currentCalendar: { month, year },
      } = state;
      const thisMonth = month === 12 ? 1 : month + 1;
      const thisYear = month === 12 ? year + 1 : year;
      state.currentCalendar = getCalendar(thisYear, thisMonth);
    },
    addTask(state, payload) {
      state.taskList = [...state.taskList, payload];
    },
    saveTaskList(state) {
      const json = JSON.stringify(state.taskList);
      if (!json) return;
      localStorage.setItem(STORAGE_KEY, json);
    },
    fetchLocalStorage(state) {
      const json = localStorage.getItem(STORAGE_KEY);
      if (!json) return;
      const obj = JSON.parse(json);
      state.taskList = obj;
    },
    removeTask(state, payload) {
      state.taskList = state.taskList.filter((task) => task.id !== payload.id);
    },
  },
  actions: {
    initialize({ commit }, payload) {
      commit('fetchLocalStorage');
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
    removeTask({ commit }, payload) {
      commit('removeTask', payload);
    },
    saveTaskList({ commit }, payload) {
      commit('saveTaskList', payload);
    },
    setDisplayDateList({ commit }) {
      commit('setDisplayDateList');
    },
  },
});
