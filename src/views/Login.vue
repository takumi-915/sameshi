<template>
  <div>
    <p>ここにログインフォーム置く</p>
    <button @click="toTop">Topページへ戻る</button>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  methods: {
    toTop() {
      this.$router.push("/");
    },
  },
};
</script>
