import React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [stateFibonacci, setStateFibonacci] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const value: number | string = Number(e.target.value);
    if (value > 0 && value < 20 && !isNaN(value)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const fibonacci = (n: number) => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
    }
    return arr;
  }

  const fibonacciHandler = (e: FormEvent) => {
    e.preventDefault();
    let n: number = Number(inputValue);
    const arrFib: number[] = fibonacci(n);
    console.log(arrFib)
    const arrOutput: number[] = [];
    setLoader(true);
    for (let i = 0; i < arrFib.length; i++) {
      setTimeout(() => {
        arrOutput.push(arrFib[i]);
        setStateFibonacci([...arrOutput]);
        if (i === arrFib.length - 1) {
          setLoader(false);
        }
      }, SHORT_DELAY_IN_MS * i);
    }
    setInputValue("");
    setDisableButton(true);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.container}>
        <div className={styles.input}>
          <Input
            type="text"
            maxLength={19}
            max={19}
            isLimitText={true}
            onChange={onChange}
            value={inputValue || ""}
          >
          </Input>
        </div>
        <Button
          onClick={fibonacciHandler}
          text={'Рассчитать'}
          type="submit"
          linkedList="small"
          disabled={disableButton}
          isLoader={loader}
        />
      </form>

      <section className={styles.numcontainer}>
        {stateFibonacci.map((item, index) => {
          return (
            <Circle
              letter={"" + item}
              key={index}
              index={index}
            />
          );
        })}
      </section>
    </SolutionLayout>
  );

}

