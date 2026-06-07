<template>
  <div id="options">
    <select
      v-model="selection"
      @change="emitSelection"
      :class="{ dark: isBlack, light: !isBlack }"
      required
    >
      <option disabled>--Select an algorithm--</option>
      <option v-for="algo in algorithms" :key="algo.id" :value="algo">
        {{ algo.name }}
      </option>
    </select>
    <input
      v-model.number="localN"
      type="number"
      min="2"
      :max="selection.max"
      value="10"
      @change="emitN"
      @input="restrictRange(selection.max)"
      :class="{ dark: isBlack, light: !isBlack }"
      @contextmenu.prevent
    />
  </div>
</template>

<style>
#options select,
input {
  margin: 2vmin;
  font-size: 4vmin;
  align-items: center;
}

#options {
  text-align: center;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      selection: localStorage.getItem("algorithm")
                ? JSON.parse(localStorage.getItem("algorithm")!)
                : { id: 'quick', name: 'Quick Sort', max: 500 },
      algorithms: [
        { id: 'quick', name: 'Quick Sort', max: 500 },
        { id: 'bogo', name: 'Bogo Sort', max: 7 },
        { id: 'bubble', name: 'Bubble Sort', max: 1000 },
        { id: 'merge', name: 'Merge Sort', max: 1000 },
        { id: 'selection', name: 'Selection Sort', max: 50 },
        { id: 'insertion', name: 'Insertion Sort', max: 100 },
      ],
      localN: localStorage.getItem("n") ? parseInt(localStorage.getItem("n")!) : 10,
    }
  },
  methods: {
    emitN() {
      this.$emit('update-n', this.localN)
      localStorage.setItem("n", this.localN.toString())
    },
    emitSelection() {
      this.$emit('selection', this.selection)
      localStorage.setItem("algorithm", JSON.stringify(this.selection))
    },
    restrictRange(max: number) {
      if (this.localN > max) {
        this.localN = max
      } else if (this.localN < 0) {
        this.localN = 0
      }
    },
  },
  props: {
    isBlack: {
      type: Boolean,
    },
  },
  watch: {
    selection(algo) {
      if (this.localN > algo.max) {
        this.localN = algo.max
      }

      if (this.localN < 2) {
        this.localN = 2
      }
      this.emitN()
    },
  },
  mounted() {
    this.emitN()
    this.emitSelection()
  }
}
</script>
