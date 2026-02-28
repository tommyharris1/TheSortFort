export async function bubbleSort(arr: number[]): Promise<void> {
    const n: number = arr.length;
    let swapped: boolean;

    for(let i = 0; i < n; i++) {
        await new Promise((r) => setTimeout(r, 1))
        swapped = false;
        for(let j = 0; j < n - i - 1; j++) {
            if(arr[j]! > arr[j + 1]!) {
                const tmp = arr[j];
                arr[j]! = arr[j + 1];
                arr[j + 1]! = tmp;
                swapped = true;
            }
        }

        if(!swapped) break;
    }
}