<template>
  <body id="sort">
    <button
      :disabled="sortRunning == 1 || sortRunning == 2"
      @click="shuffleAndSort"
      :class="{ 'dark': isBlack, 'light': !isBlack, 'disabled': sortRunning == 1 || sortRunning == 2 }"
    >
      Shuffle & Sort!
    </button>
    <div id="sortGraph" :class="{ 'light-border': isBlack, 'dark-border': !isBlack }">
      <div v-for="i in array" :key="i" class="bar-wrapper">
        <div class="bar" :style="{ height: i * (55 / n) + 'vmin' }" :class="{ 'light-background': isBlack, 'dark-background': !isBlack }"></div>
      </div>
    </div>
    <h2>
      {{ sortRunning == 0 ? 'Sorted!' : sortRunning == 1 ? 'Shuffling...' : 'Sorting...' }}
    </h2>
  </body>
</template>

<style>
#sort {
  text-align: center;
}

#sort > button,
option,
select,
h2 {
  font-size: 3.75vmin;
  margin-bottom: 2.5vmin;
}

#sortGraph {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 93vmin;
  height: 55vmin;
  margin: 0 auto;
  overflow: hidden;
}

.bar {
  flex: 1 1 0;
  min-width: 0;
}

.bar-wrapper {
  flex: 1;
}

.dark-border {
  border: solid 5px black;
}

.light-border {
  border: solid 5px white;
}

.dark-background {
  background-color: rgb(57, 145, 175);
}

.light-background {
  background-color: rgb(3, 3, 104);
}

.disabled {
  color: gray;
}
</style>

<script setup lang="ts">
import { ref, type Ref, watch } from 'vue'
import { quickSort } from '../components/algorithms/QuickSort'
import { bubbleSort } from '../components/algorithms/BubbleSort'

const sortRunning: Ref<number> = ref(0);
const array = ref<number[]>(Array.from({ length: 10 }, (_, i) => i + 1));

const props = defineProps<{
  n: number
  isBlack?: boolean
  current: {
    name: string
  }
}>();

watch(
  () => props.n,
  (n) => {
    array.value = Array.from({ length: n }, (_, i) => i + 1);
  }
)

async function sleep(time: number) {
  await new Promise((r) => setTimeout(r, time))
}

async function shuffleAndSort() {
  sortRunning.value = 1
  await shuffle()
  await sleep(500)
  sortRunning.value = 2
  await sleep(500)
  await sort()
  sortRunning.value = 0
}

async function shuffle() {
  for (let i = 0; i < array.value.length; i++) {
    await sleep(1)
    const j = Math.floor(Math.random() * (i + 1))
    ;[array.value[i], array.value[j]] = [array.value[j]!, array.value[i]!]
  }
}

async function sort() {
  switch(props.current.name) {
    case "":
    case "Quick Sort":
      await quickSort(array.value, 0, props.n - 1);
      break;
    case "Bogo Sort":
      await bogoSort();
      break;
    case "Bubble Sort":
      await bubbleSort(array.value);
      break;
    default:
      alert("Not yet implemented!");
      break;
  }
}

function isSorted(): boolean {
  for (let i = 1; i < array.value.length; i++) {
    if ((array.value[i] as number) < (array.value[i - 1] as number)) {
      return false
    }
  }
  return true
}

async function bogoSort() {
  while (!isSorted()) {
    await shuffle()
  }
}
</script>
