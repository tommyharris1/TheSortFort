export async function mergeSort(arr: number[]): Promise<number[]> {
  if (arr.length <= 1) {
    return arr
  }
  const middle = Math.floor(arr.length / 2)
  const left = await mergeSort(arr.slice(0, middle))
  const right = await mergeSort(arr.slice(middle))
  return await merge(left, right)
}

export async function merge(left: number[], right: number[]): Promise<number[]> {
  const result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    await new Promise((r) => setTimeout(r, 20))
    if (left[leftIndex]! < right[rightIndex]!) {
      result.push(left[leftIndex++]!)
    } else {
      result.push(right[rightIndex++]!)
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
