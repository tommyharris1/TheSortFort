import { sleep } from '../../components/utils/Sleep'

export async function mergeSort(arr: number[], start: number, end: number): Promise<void> {
  if(end - start <= 1) return
  const mid = Math.floor((start + end) / 2)
  await mergeSort(arr, start, mid)
  await mergeSort(arr, mid, end)
  await merge(arr, start, mid, end)
}

export async function merge(arr: number[], start: number, mid: number, end: number): Promise<void> {
  let leftIndex = 0
  let rightIndex = 0

  const left = arr.slice(start, mid)
  const right = arr.slice(mid, end)
  while (leftIndex < left.length && rightIndex < right.length) {
    await sleep(1)
    if (left[leftIndex]! < right[rightIndex]!) {
      arr[start + leftIndex + rightIndex] = left[leftIndex]!
      leftIndex++
    } else {
      arr[start + leftIndex + rightIndex] = right[rightIndex]!
      rightIndex++
    }
  }

  while (leftIndex < left.length) {
    await sleep(1)
    arr[start + leftIndex + rightIndex] = left[leftIndex]!
    leftIndex++
  }

  while (rightIndex < right.length) {
    await sleep(1)
    arr[start + leftIndex + rightIndex] = right[rightIndex]!
    rightIndex++
  }
}
