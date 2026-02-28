<template>
  <body id="sort">
    <button :disabled="sortRunning == 1 || sortRunning == 2" @click="shuffleAndSort" :class="{ 'dark': isBlack, 'light': !isBlack, 'disabled': sortRunning == 1 || sortRunning == 2 }">
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

<script lang="ts">
import { quickSort } from '../components/algorithms/QuickSort'

export default {
  data() {
    return {
      graphWidth: 0 as number,
      sortRunning: 0 as number,
      array: [] as number[],
    }
  },
  methods: {
    async sleep(time: number) {
      await new Promise((r) => setTimeout(r, time))
    },
    async shuffleAndSort() {
      this.sortRunning = 1
      await this.shuffle()
      await this.sleep(500)
      this.sortRunning = 2
      await this.sleep(500)
      await this.sort()
      this.sortRunning = 0
    },
    async shuffle() {
      for (let i = 0; i < this.array.length; i++) {
        await this.sleep(1)
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.array[i], this.array[j]] = [this.array[j] ?? 0, this.array[i] ?? 0]
      }
    },
    async sort() {
      switch(this.current.name) {
        case "":
        case "Quick Sort":
          await quickSort(this.array, 0, this.n - 1);
          break;
        case "Bogo Sort":
          await this.bogoSort();
          break;
        default:
          alert("Not yet implemented!");
          break;
      }
    },
    isSorted(): boolean {
      for (let i = 1; i < this.array.length; i++) {
        if ((this.array[i] as number) < (this.array[i - 1] as number)) {
          return false
        }
      }
      return true
    },

    async bogoSort() {
      while (!this.isSorted()) {
        await this.shuffle()
      }
    },
  },
  watch: {
    n: {
      immediate: true,
      handler(n: number) {
        this.array = Array.from({ length: n }, (_, i) => i + 1)
      },
    },
  },
  props: {
    n: {
      type: Number,
      required: true,
    },
    isBlack: {
      type: Boolean
    },
    current: {
      type: Object,
      required: true
    }
  },
}
</script>
