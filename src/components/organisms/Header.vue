<template>
  <div :class="$style.wrapper">
    <div>{{ year }}年 {{ month }}月</div>
    <div>
      <button :class="$style.button" @click="prevMonth">Last Month</button
      ><button :class="$style.button" @click="nextMonth">Next Month</button>
    </div>
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

<style module lang="scss">
.wrapper {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
  @media screen and (max-width: 400px) {
    font-size: 10px;
  }
}
.button {
  font-size: 12px;
  margin-left: 20px;
  @media screen and (max-width: 400px) {
    font-size: 10px;
    margin-left: 10px;
  }
}
</style>
