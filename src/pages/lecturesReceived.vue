<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>

        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasLectures && !isLoading">
          <request-item
            v-for="req in receivedLectures"
            :key="req.id"
            :userId="req.userId"
            :name="req.name"
			:fileUrl="req.fileUrl"
			:quiz="req.quiz"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any lectures yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../components/RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedLectures() {
      return this.$store.getters['lectures/lectures'];
    },
    hasLectures() {
      return this.$store.getters['lectures/hasLectures'];
    },
  },
  created() {
    this.loadLectures();
  },
  methods: {
    async loadLectures() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('lectures/fetchLectures');
      } catch (error) {
        this.error = error.message || 'Something failed!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>