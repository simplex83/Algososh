import { ElementStates } from "../../types/element-states";
import { ISortItem } from "../../types/sorting";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

// поменять местами
const swap = (arr: ISortItem[], i: number) => {
    let temp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = temp;
};
//сортировка пузырьком
export const bubbleSort = async (direction: string, state: ISortItem[], setter?: React.Dispatch<React.SetStateAction<ISortItem[]>>) => {
    const arr = state;
    for (let j = arr.length - 1; j >= 0; j--) {
        for (let i = 0; i < j; i++) {
            arr[i].state = ElementStates.Changing;
            arr[i + 1].state = ElementStates.Changing;
            setter && setter([...arr])
            if (direction === "asc") {
                if (arr[i].el > arr[i + 1].el) {
                    swap(arr, i)
                }
            } else if (direction === "des") {
                if (arr[i].el < arr[i + 1].el) {
                    swap(arr, i)
                }
            }
            await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
            arr[i].state = ElementStates.Default;
            arr[i + 1].state = ElementStates.Default;
        }
        arr[j].state = ElementStates.Modified;
        setter && setter([...arr])
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

        arr[0].state = ElementStates.Modified;
        setter && setter([...arr])
    }
    return arr
}

// сортировка выбором
export const selectionSort = async (direction: string, state: ISortItem[], setter?: React.Dispatch<React.SetStateAction<ISortItem[]>>) => {
    const arr = state;
    if(arr.length===0) return []
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
        let indexMin = i;
        arr[indexMin].state = ElementStates.Changing;
        for (let j = i + 1; j < l; j++) {
            arr[j].state = ElementStates.Changing;
            setter && setter([...arr])
            if (direction === "asc") {
                if (arr[indexMin].el > arr[j].el) {
                    indexMin = j;
                }
            } else {
                if (arr[indexMin].el < arr[j].el) {
                    indexMin = j;
                }
            }
            await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
            arr[j].state = ElementStates.Default;
            setter && setter([...arr])
        }
        if (indexMin !== i) {
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        }
        arr[i].state = ElementStates.Modified;
        setter && setter([...arr])
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setter && setter([...arr])
    return arr
}