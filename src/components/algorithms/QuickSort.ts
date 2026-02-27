export async function partition(arr: number[], low: number, high: number): Promise<number> {
  const pivot = arr[high] as number
  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    await new Promise((r) => setTimeout(r, 1))
    const curr = arr[j] as number
    if (curr < pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j] ?? 0, arr[i] ?? 0]
    }
  }
  ;[arr[i + 1], arr[high]] = [arr[high] ?? 0, arr[i + 1] ?? 0]
  return i + 1
}

export async function quickSort(arr: number[], low: number, high: number) {
  if (low < high) {
    const p = await partition(arr, low, high)
    await quickSort(arr, low, p - 1)
    await quickSort(arr, p + 1, high)
  }
}