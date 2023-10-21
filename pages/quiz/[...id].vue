// pages/index.vue
<template>
    <div class="mx-auto m-8 p-3">

        <h1 class="text-2xl font-bold">{{ quiz.name }}</h1>
        <Question @on-answer-selected="answerSelected" :question="questions[currentQuestion]"
            @on-next-question="currentQuestion++" v-if="currentQuestion <= questions.length - 1" />
        <Results :questions="questions" @on-finished-quiz="FinishedQuiz" :score="score" v-else />
    </div>
</template>
  
  
<script setup>
import { reactive, ref, onMounted } from 'vue';
const strapiBaseUri = "https://strapinuxt-quiz-app.onrender.com";
const questions = reactive([]);
const score = ref(0)
const quiz = reactive({
    id: 1,
    name: "",
    attributes: [],
});
const router = useRouter()
const route = useRoute()
let currentQuestion = ref(0)
const answerSelected = (index) => {
    if (questions[currentQuestion.value].selectedAnswer != null) return false
    questions[currentQuestion.value].selectedAnswer = index;

    checkAnswer(index);
}
const checkAnswer = (index) => {
    if (index == questions[currentQuestion.value].attributes.correctAnswerIndex) {
        score.value++;
    }
}
const FinishedQuiz = () => {
    router.push('/')
}
const getQuiz = async () => {
    await $fetch(strapiBaseUri + '/api/quizzes?populate=*').then((data) => {

        data.data.forEach(element => {
            if (element.id == route.params.id) {
                quiz.id = element.id;
                quiz.name = element.attributes.title
                quiz.attributes = element.attributes;
            }
        });
     getQuestions();

    }).catch((error) => error.data)
}
const getQuestions = async () => {
    await $fetch(strapiBaseUri + '/api/questions?populate=*').then((data) => {
        data.data.forEach(element => {
            if (element.attributes.quiz.data.id == quiz.id) {
                questions.push(element);
            }
        });
        quiz.attributes.questions.forEach(element => {
            questions.push(element);
        });

    }).catch((error) => error.data)
}
onBeforeMount (()=>
{

    getQuiz();
})
</script>