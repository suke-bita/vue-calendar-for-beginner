<template>
  <div>
    <div>{{ year }}年 {{ month }}月</div>
    <div><button @click="prevMonth">-</button><button @click="nextMonth">+</button></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(['prevMonth', 'nextMonth']),
  },
};
</script>
