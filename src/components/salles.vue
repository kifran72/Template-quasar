<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <h2>Salles</h2>
      <p v-for="n in 15" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
        praesentium molestias a adipisci, dolore vitae odit, quidem consequatur
        optio voluptates asperiores pariatur eos numquam rerum delectus commodi
        perferendis voluptate?
      </p>
    </div>
  </q-page>
</template>

<style></style>

<script>
import { auth, onAuthStateChanged } from "../utils/auth/google";

export default {
  name: "Salles",
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$router.push("/");
      }
    });
  },
};
</script>
