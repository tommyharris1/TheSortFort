import { sleep } from '../../components/utils/Sleep'

export async function heapSort(arr: number[]): Promise<void> {
  const n: number = arr.length
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i)
  }
  for(let i = n - 1; i > 0; i--) {
    await sleep(1)
    ;[arr[0], arr[i]] = [arr[i]!, arr[0]!]
    await heapify(arr, i, 0)
  }
}

export async function heapify(arr: number[], n: number, i: number): Promise<void> {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < n && arr[left]! > arr[largest]!) {
    largest = left
  }

  if (right < n && arr[right]! > arr[largest]!) {
    largest = right
  }

  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest]!, arr[i]!]
    await sleep(1)
    await heapify(arr, n, largest)
  }
}
