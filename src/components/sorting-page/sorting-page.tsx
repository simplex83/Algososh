import React, { FormEvent, useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { ISortItem } from "../../types/sorting";
import { Column } from "../ui/column/column";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [typeSort, setTypeSort] = useState<string>("selection");
  const [stateSort, setStateSort] = useState<ISortItem[]>([]);
  const [loaderRandom, setLoaderRandom] = useState<boolean>(false);
  const [loaderAsc, setLoaderAsc] = useState<boolean>(false);
  const [loaderDes, setLoaderDes] = useState<boolean>(false);
  const [disableState, setDisableState] = useState<boolean>(false);
  //получить случайное число
  const getRandomNum = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // получить новый массив
  const randomArr = () => {
    const length: number = getRandomNum(3, 17);
    const arr: ISortItem[] = [];
    for (let i = 0; i <= length - 1; i++) {
      let num = getRandomNum(0, 100);
      const item = {
        el: num,
        state: ElementStates.Default
      }
      arr.push(item)
    }
    return arr
  }
  
  useEffect(() => {
    const sortArr = randomArr();
    setStateSort([...sortArr]);
    // eslint-disable-next-line
  }, []);

  // поменять местами
  const swap = (arr: ISortItem[], i: number) => {
    let temp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = temp;
  };
  //сортировка пузырьком
  const bubbleSort = async (direction: string) => {
    setDisableState(true)
    if (direction === "asc") {
      setLoaderAsc(true)
    } else { setLoaderDes(true) }
    const arr = stateSort;
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        arr[i].state = ElementStates.Changing;
        arr[i + 1].state = ElementStates.Changing;
        setStateSort([...arr])
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
      setStateSort([...arr])
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

      arr[0].state = ElementStates.Modified;
      setStateSort([...arr])
    }
    if (direction === "asc") {
      setLoaderAsc(false)
    } else { setLoaderDes(false) }
    setDisableState(false)
    return arr
  }
  // сортировка выбором
  const selectionSort = async (direction: string) => {
    setDisableState(true)
    if (direction === "asc") {
      setLoaderAsc(true)
    } else { setLoaderDes(true) }
    const arr = stateSort;
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      arr[indexMin].state = ElementStates.Changing;
      for (let j = i + 1; j < l; j++) {
        arr[j].state = ElementStates.Changing;
        setStateSort([...arr])
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
        setStateSort([...arr])
      }
      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
      arr[i].state = ElementStates.Modified;
      setStateSort([...arr])
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setStateSort([...arr])
    if (direction === "asc") {
      setLoaderAsc(false)
    } else { setLoaderDes(false) }
    setDisableState(false)
    return arr
  }
  //хендлер для получения массива
  const randomHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoaderRandom(true);
    setTimeout(() => {
      const sortArr = randomArr();
      setStateSort([...sortArr]);
      setLoaderRandom(false)
    }, 500)
  }
  //хендлер для сортировки
  const sortHandler = (direction: string) => {
    if (typeSort === "bubble") {
      bubbleSort(direction);
    } else {
      selectionSort(direction)
    }
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container}>
        <div className={styles.radio}>
          <RadioInput
            onChange={() => setTypeSort("selection")}
            label="Выбор"
            value="selection"
            disabled={disableState}
            checked={typeSort === "selection" ? true : false}

          />
          <RadioInput
            onChange={() => setTypeSort("bubble")}
            label="Пузырек"
            value="selection"
            disabled={disableState}
            checked={typeSort === "bubble" ? true : false}
          />
        </div>
        <div className={styles.sorting}>
          <Button
            onClick={() => sortHandler("asc")}
            text={'По возрастанию'}
            type="button"
            sorting={Direction.Ascending}
            isLoader={loaderAsc}
            disabled={disableState}
            extraClass={styles.widthbut}
          />
          <Button
            onClick={() => sortHandler("des")}
            text={'По убыванию'}
            type="button"
            sorting={Direction.Descending}
            isLoader={loaderDes}
            disabled={disableState}
            extraClass={styles.widthbut}
          />
        </div>
        <div className={styles.start}>
          <Button
            onClick={randomHandler}
            text={'Новый массив'}
            type="button"
            isLoader={loaderRandom}
            disabled={disableState}
            extraClass={styles.widthbut}
          />
        </div>
      </form>
      <div className={styles.result}>
        {stateSort.map((item, index) => {
          return (
            <Column
              state={item.state}
              index={item.el}
              key={index}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
