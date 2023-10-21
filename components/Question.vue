<template>
    <div class="m-auto max-w-2xl p-5 text-center grid">
        <h1 class="mb-2 text-xl">
            {{ question.attributes.title }}</h1>
        <button @click="$emit('onAnswerSelected', index)" :class="{
            'bg-green-300':
                question.selectedAnswer != null && index == question.attributes.correctAnswerIndex
        },
        {
            'bg-red-300':
                question.selectedAnswer != question.attributes.correctAnswerIndex && index == question.selectedAnswer
        },
            { 'hover:bg-blue-500 hover:text-white': question.selectedAnswer == null }"
            class="p-2 mb-2 bg-gray-200 rounded-md  w-full" v-for="(answer, index) in question.attributes.answers"
            :key="question.id">{{
                answer }}</button>

        <button @click="$emit('onNextQuestion',index)" v-show="question.selectedAnswer != null"
            class="p-2 mb-2 bg-blue-200 rounded-md">Next
            Question</button>
    </div>
</template>

<script setup>
const props = defineProps({
    question: Object
})
const emit = defineEmits(['onAnswerSelected', 'onNextQuestion'])
// setup code
</script>