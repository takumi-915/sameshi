<template>
  <v-app>
    <div>
      <h2>あなたのサ飯を教えてください</h2>
      <v-row>
        <v-col cols="4">
          <form>
            <v-text-field
              v-model="sameshi.restaurant"
              label="店名"
            ></v-text-field>
            <v-text-field
              v-model="sameshi.menu"
              label="メニュー"
            ></v-text-field>
            <v-textarea v-model="sameshi.詳細" label="詳細"></v-textarea>

            <v-btn
              depressed
              elevation="6"
              large
              color="accent"
              class="post"
              @click="onSubmit"
              >投稿する</v-btn
            >
          </form>
        </v-col>
        <v-col cols="8">
          <table>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>aa</td>
              <td>aa</td>
              <td>show</td>
              <td>Edit</td>
              <td>Destroy</td>
            </tr>
          </table>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sameshi: {},
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>

<style scoped>
</style>
