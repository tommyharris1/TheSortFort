<template>
  <body id="sort">
    <button :disabled="sortRunning" @click="shuffleAndSort">Shuffle & Sort!</button>
    <div id="sortGraph">
      <div v-for="i in array" :key="i">
        <div id="bar" :style="{ height: i * (36 / n) + 'vmin', width: 73 / n + 'vmin' }"></div>
      </div>
    </div>
    <span>
      <select required>
        <option disabled>--Select an algorithm--</option>
        <option>Quick Sort</option>
        <option>Bogo Sort</option>
      </select>
      <input
        style="font-size: 50px"
        type="number"
        min="1"
        max="100"
        value="10"
        v-model.number="n"
      />
    </span>
    <h2 style="font-size: 50px">{{ sortRunning ? 'Sorting...' : 'Sorted!' }}</h2>
    <br /><br />
  </body>
</template>

<style>
#sort {
  text-align: center;
}

#sort > button,
option,
select {
  font-size: 50px;
  margin: 25px;
}

#sortGraph {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  border: solid 5px black;
  width: 73vmin;
  height: 36vmin;
  margin: 0 auto;
  border-radius: 10px;
}

#bar {
  width: 1px;
  background-color: blue;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      graphWidth: 0 as number,
      sortRunning: false as boolean,
      n: 10 as number,
      array: [] as number[],
    }
  },
  methods: {
    async sleep(time: number) {
      await new Promise((r) => setTimeout(r, time))
    },
    async shuffleAndSort() {
      this.sortRunning = true
      await this.shuffle()
      await this.sleep(1000)
      await this.sort()
      this.sortRunning = false
    },
    async shuffle() {
      for (let i = 0; i < this.array.length; i++) {
        await this.sleep(1)
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.array[i], this.array[j]] = [this.array[j] ?? 0, this.array[i] ?? 0]
      }
    },
    async sort() {
      await this.quickSort(0, this.n - 1)
      //await this.bogoSort()
    },
    async partition(low: number, high: number): Promise<number> {
      const pivot = this.array[high] as number
      let i = low - 1

      for (let j = low; j <= high - 1; j++) {
        await new Promise((r) => setTimeout(r, 1))
        const curr = this.array[j] as number
        if (curr < pivot) {
          i++
          ;[this.array[i], this.array[j]] = [this.array[j] ?? 0, this.array[i] ?? 0]
        }
      }
      ;[this.array[i + 1], this.array[high]] = [this.array[high] ?? 0, this.array[i + 1] ?? 0]
      return i + 1
    },
    async quickSort(low: number, high: number) {
      if (low < high) {
        const p = await this.partition(low, high)
        await this.quickSort(low, p - 1)
        await this.quickSort(p + 1, high)
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
}
</script>
