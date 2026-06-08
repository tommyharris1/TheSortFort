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
    // Loads sample size and algorithm from localStorage if they exist, otherwise sets defaults
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
        { id: 'heap', name: 'Heap Sort', max: 1000 },
      ],
      localN: localStorage.getItem("n") ? parseInt(localStorage.getItem("n")!) : 10,
    }
  },
  methods: {
    // Emits sample size and saves to localStorage
    emitN() {
      this.$emit('update-n', this.localN)
      localStorage.setItem("n", this.localN.toString())
    },
    // Emits algorithm selection and saves a stringified version to localStorage
    emitSelection() {
      this.$emit('selection', this.selection)
      localStorage.setItem("algorithm", JSON.stringify(this.selection))
    },
    restrictRange(max: number) {
      // Restricts range for number input (sample size) to be between 2 and max of selected algorithm
      if (this.localN > max) {
        this.localN = max
      } else if (this.localN < 0) {
        this.localN = 0
      }
    },
  },
  props: {
    // Prop from parent component (App.vue) to determine if dark mode is enabled
    isBlack: {
      type: Boolean,
    },
  },
  watch: {
    // Keeps sample size within the bounds of 2 and algorithm max when changing algorithm
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
    // Emit initial values for sample size and algorithm selection on mount
    this.emitN()
    this.emitSelection()
  }
}
</script>
