<template>
    <div class="m-auto max-w-2xl p-5 text-center grid ">
        <h1 class="mb-2 text-xl">Results</h1>
        <div>Score: {{ score }} / {{ questions.length }}</div>
        <button @click="$emit('onFinishedQuiz')" class="p-2 mb-2 bg-blue-200 rounded-md">End Quiz</button>
    </div>
</template>

<script setup>
const props = defineProps({
    questions: Array,
    score: Number
})
const emit = defineEmits(['onFinishedQuiz'])
</script>