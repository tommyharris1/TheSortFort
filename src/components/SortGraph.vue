<template>
  <body id="sort">
    <button
      :disabled="sortRunning == 1 || sortRunning == 2"
      @click="shuffleAndSort"
      :class="{ dark: isBlack, light: !isBlack, disabled: sortRunning == 1 || sortRunning == 2 }"
    >
      Shuffle & Sort!
    </button>
    <div
      id="sortGraph"
      :style="{ gridTemplateColumns: `repeat(${N}, 1fr)` }"
      :class="{ 'light-border': isBlack, 'dark-border': !isBlack }"
    >
      <div v-for="i in array" :key="i">
        <div
          :style="{ height: i * (55 / N) + 'vmin' }"
          :class="{ 'light-background': isBlack, 'dark-background': !isBlack }"
        ></div>
      </div>
    </div>
    <h2>
      {{ sortRunning == 0 ? 'Sorted!' : sortRunning == 1 ? 'Shuffling...' : 'Sorting...' }}
    </h2>
    <SortOptions @update-n="updateN" @selection="updateSelection" :is-black="isBlack"></SortOptions>
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
  display: grid;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 93vmin;
  height: 55vmin;
  margin: 0 auto;
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, 1fr);
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
import { mergeSort } from '../components/algorithms/MergeSort'
import { selectionSort } from '../components/algorithms/SelectionSort'
import { insertionSort } from '../components/algorithms/InsertionSort'
import SortOptions from '../components/SortOptions.vue'
import { sleep } from '../components/utils/Sleep'

const sortRunning: Ref<number> = ref(0)
const array = ref<number[]>(Array.from({ length: 10 }, (_, i) => i + 1))
const selection = ref({ id: 'quick', name: 'Quick Sort', max: 500 })
const N = ref(10)

defineProps<{
  isBlack?: boolean
}>()

watch(
  () => N.value,
  (N) => {
    array.value = Array.from({ length: N }, (_, i) => i + 1)
  },
)

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
  switch (selection.value.name) {
    case 'Quick Sort':
      await quickSort(array.value, 0, N.value - 1)
      break
    case 'Bogo Sort':
      await bogoSort()
      break
    case 'Bubble Sort':
      await bubbleSort(array.value)
      break
    case 'Merge Sort':
      array.value = await mergeSort(array.value)
      break
    case 'Selection Sort':
      await selectionSort(array.value)
      break
    case 'Insertion Sort':
      await insertionSort(array.value)
      break
    default:
      alert('Not yet implemented!')
      break
  }
}

async function bogoSort() {
  while (!isSorted()) {
    await shuffle()
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

function updateSelection(sel: { id: string; name: string; max: number }) {
  selection.value = sel
}

function updateN(newN: number) {
  N.value = newN
}
</script>
