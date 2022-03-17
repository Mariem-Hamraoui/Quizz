<template>
<div>

<base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

<section>
      <base-card>
        <header>
          <h2>Your Lectures</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasLectures && !isLoading">
          <request-item
            v-for="lecture in receivedLectures"
            :key="lecture.id"
            :quiz="lecture.quiz"
            :name="lecture.name"
			:file="lecture.file"
          ></request-item>
        </ul>
        <h3 v-else>You have no lectures!</h3>
      </base-card>
    </section>



</div>

</template>

<script>
import RequestItem from '../components/RequestItem.vue'
export default {

	components: {
    RequestItem,
  },
  data() {
    return {};
  },
};
</script>
