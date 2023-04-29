import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { IString } from "../../types/string";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [stateOutput, setStateOutput] = useState<IString[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const inputArr = Array.from(inputValue);
  const outputArr: IString[] = [];

  const stringHandler = (e: FormEvent) => {
    e.preventDefault();
    let start = 0;
    let end = inputArr.length - 1;
    let counter = 1;
    setInputValue("");
    setLoader(true);

    inputArr.forEach((el, index) => {
      const item = {
        letter: el,
        state: ElementStates.Default,
      }
      outputArr.push(item)
    });

    setStateOutput([...outputArr]);
    while (start <= end) {
      reverseString(outputArr, start, end, counter);
      start++;
      end--;
      counter++;
    }
  }

  const swap = (arr: IString[], start: number, end: number) => {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
  };

  const reverseString = (arr: IString[], start: number, end: number, counter: number) => {
    setTimeout(() => {
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setStateOutput([...arr]);
    }, DELAY_IN_MS * counter);
    setTimeout(() => {
      swap(arr, start, end);
      arr[start].state = ElementStates.Modified;
      arr[end].state = ElementStates.Modified;
      setStateOutput([...arr]);

    }, DELAY_IN_MS * counter + DELAY_IN_MS);
    if (start + 1 === end || start === end) {
      setTimeout(() => {
        setLoader(false);
      }, DELAY_IN_MS * counter + DELAY_IN_MS);
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.container}>
        <div className={styles.input}>
          <Input
            type="text"
            maxLength={11}
            max={11}
            isLimitText={true}
            onChange={onChange}
            value={inputValue || ""}
          >
          </Input>
        </div>
        <Button
          onClick={stringHandler}
          text={'Развернуть'}
          type="submit"
          linkedList="small"
          disabled={inputValue ? false : true}
          isLoader={loader}
        />
      </form>

      <section className={styles.numcontainer}>
        {stateOutput.map((item, index) => {
          return (
            <Circle state={item.state} letter={item.letter} key={index} />
          );
        })}
      </section>
    </SolutionLayout>
  );
};
