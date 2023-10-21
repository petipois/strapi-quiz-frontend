// pages/index.vue
<template>
  <div class="mx-auto mx-8 my-10 p-8">

    <h1 class="text-2xl font-bold">Quizzes</h1>
    <div class="flex flex-cols col-3 m-4 p-4">
      <div v-for="quiz in quizzes" :key="quiz.id" class="w-full rounded overflow-hidden shadow-lg m-2">
        <img class="w-full h-48 object-cover" :src="getStrapiMedia(quiz.attributes.image.data.attributes.url)"
          :alt="quiz.attributes.image.data.attributes.alternativeText" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            {{ quiz.attributes.name }}
          </div>
          <NuxtLink class="btn bg-gray-300 p-2" :to="`/quiz/${quiz.id}`">
            Start Quiz
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>
  
  
<script setup>
import { reactive, onBeforeMount } from 'vue';
const strapiBaseUri = "https://strapinuxt-quiz-app.onrender.com";
const quizzes = reactive([]);

const getQuizzes = async () => {
  await $fetch(strapiBaseUri + '/api/quizzes?populate=*').then((data) => {
    data.data.forEach(element => {
      quizzes.push(element)
    });
  }).catch((error) => error.data)
}

onBeforeMount(() => {
  getQuizzes();
})
</script>