import { bubbleSort, selectionSort } from "./utils"
import { ISortItem } from "../../types/sorting";
import { ElementStates } from "../../types/element-states";

describe("Sorting-bubble", () => {
    it("Sorting empty array asc", async () => {
        const array: Array<ISortItem> = [];
        const result = await bubbleSort("asc", array);
        expect(result).toEqual([]);
    })
    it("Sorting empty array des", async () => {
        const array: Array<ISortItem> = [];
        const result = await bubbleSort("des", array);
        expect(result).toEqual([]);
    });
    it("Sorting array 1 el asc", async () => {
        const array: Array<ISortItem> = [
            { el: 11, state: ElementStates.Default }
        ];
        const result = await bubbleSort("asc", array);
        expect(result).toEqual([
            { el: 11, state: ElementStates.Modified }
        ]);
    });
    it("Sorting array 1 el des", async () => {
        const array: Array<ISortItem> = [
            { el: 11, state: ElementStates.Default }
        ];
        const result = await bubbleSort("des", array);
        expect(result).toEqual([
            { el: 11, state: ElementStates.Modified }
        ]);
    })
    it("Sorting array >1 el asc", async () => {
        const array: Array<ISortItem> = [
            { el: 55, state: ElementStates.Default },
            { el: 111, state: ElementStates.Default },
            { el: 11, state: ElementStates.Default }
        ];
        const result = await bubbleSort("asc", array);
        expect(result).toEqual([
            { el: 11, state: ElementStates.Modified },
            { el: 55, state: ElementStates.Modified },
            { el: 111, state: ElementStates.Modified },
        ]);
    })
    it("Sorting array >1 el des", async () => {
        const array: Array<ISortItem> = [
            { el: 55, state: ElementStates.Default },
            { el: 111, state: ElementStates.Default },
            { el: 11, state: ElementStates.Default }
        ];
        const result = await bubbleSort("des", array);
        expect(result).toEqual([
            { el: 111, state: ElementStates.Modified },
            { el: 55, state: ElementStates.Modified },
            { el: 11, state: ElementStates.Modified }
        ]);
    })
})

describe("Sorting-selection", () => {
    it("Sorting empty array asc", async () => {
        const array: Array<ISortItem> = [];
        const result = await selectionSort("asc", array);
        expect(result).toEqual([]);
    })
    it("Sorting empty array des", async () => {
        const array: Array<ISortItem> = [];
        const result = await selectionSort("des", array);
        expect(result).toEqual([]);
    });
    it("Sorting array 1 el asc", async () => {
        const array: Array<ISortItem> = [
            { el: 11, state: ElementStates.Default }
        ];
        const result = await selectionSort("asc", array);
        expect(result).toEqual([
            { el: 11, state: ElementStates.Modified }
        ]);
    });
    it("Sorting array 1 el des", async () => {
        const array: Array<ISortItem> = [
            { el: 11, state: ElementStates.Default }
        ];
        const result = await selectionSort("des", array);
        expect(result).toEqual([
            { el: 11, state: ElementStates.Modified }
        ]);
    })
    it("Sorting array >1 el asc", async () => {
        const array: Array<ISortItem> = [
            { el: 55, state: ElementStates.Default },
            { el: 111, state: ElementStates.Default },
            { el: 11, state: ElementStates.Default }
        ];
        const result = await selectionSort("asc", array);
        expect(result).toEqual([
            { el: 11, state: ElementStates.Modified },
            { el: 55, state: ElementStates.Modified },
            { el: 111, state: ElementStates.Modified },
        ]);
    })
    it("Sorting array >1 el des", async () => {
        const array: Array<ISortItem> = [
            { el: 55, state: ElementStates.Default },
            { el: 111, state: ElementStates.Default },
            { el: 11, state: ElementStates.Default }
        ];
        const result = await selectionSort("des", array);
        expect(result).toEqual([
            { el: 111, state: ElementStates.Modified },
            { el: 55, state: ElementStates.Modified },
            { el: 11, state: ElementStates.Modified }
        ]);
    })
})