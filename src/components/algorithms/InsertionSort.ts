export async function insertionSort(arr: number[]): Promise<number[]> {
  for (let i = 1; i < arr.length; i++) {
    const currentValue = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j]! > currentValue!) {
      await new Promise((r) => setTimeout(r, 1))
      arr[j + 1] = arr[j]!
      j--
    }

    arr[j + 1] = currentValue!
  }
  return arr
}
