import React, { FormEvent, useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { ISortItem } from "../../types/sorting";
import { Column } from "../ui/column/column";
import { bubbleSort, selectionSort } from "./utils";

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
  const sortHandler = async(direction: string) => {
    if (typeSort === "bubble") {
      setDisableState(true)
      if (direction === "asc") {
        setLoaderAsc(true)
      } else { setLoaderDes(true) }
      await bubbleSort(direction, stateSort, setStateSort);
      if (direction === "asc") {
        setLoaderAsc(false)
      } else { setLoaderDes(false) }
      setDisableState(false)

    } else {
      setDisableState(true)
    if (direction === "asc") {
      setLoaderAsc(true)
    } else { setLoaderDes(true) }
       await selectionSort(direction, stateSort, setStateSort)
       if (direction === "asc") {
        setLoaderAsc(false)
      } else { setLoaderDes(false) }
      setDisableState(false)
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
