import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stateQueue, setStateQueue] = useState<(string | null)[]>([]);
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [loaderRemove, setLoaderRemove] = useState<boolean>(false);
  const [loaderClear, setLoaderClear] = useState<boolean>(false);
  const [color, setColor] = useState({ head: false, tail: false });

  const queue = useMemo(() => {
    const queue = new Queue<string>(7);
    setStateQueue([...queue.getItems()]);
    return queue
  }, []);
  let head = queue.head;
  let tail = queue.tail;
  let length = queue.length;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  };

  const addHandler = (e: FormEvent) => {
    e.preventDefault();
    setColor({ head: false, tail: true });
    setLoaderAdd(true);
    queue.enqueue(inputValue);
    setStateQueue([...queue.getItems()]);
    setInputValue("");
    setTimeout(() => {
      setColor({ head: false, tail: false });
      setLoaderAdd(false);
    }, SHORT_DELAY_IN_MS);
  }
  const removeHandler = (e: FormEvent) => {
    e.preventDefault();
    setColor({ head: true, tail: false });
    setLoaderRemove(true);
    setTimeout(() => {
      queue.dequeue();
      setStateQueue([...queue.getItems()]);
      setColor({ head: false, tail: false });
      setLoaderRemove(false);
    }, SHORT_DELAY_IN_MS);
  }
  const clearHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoaderClear(true);
    setTimeout(() => {
      queue.clear();
      setStateQueue([...queue.getItems()])
      setLoaderClear(false);
    }, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.container}>
        <div className={styles.input}>
          <Input
            type="text"
            maxLength={4}
            max={4}
            isLimitText={true}
            onChange={onChange}
            value={inputValue || ""}
          >
          </Input>
          <Button
            data-testid= 'add'
            onClick={addHandler}
            text={'Добавить'}
            type="submit"
            linkedList="small"
            disabled={inputValue && queue.size !== tail ? false : true}
            isLoader={loaderAdd}
          />
          <Button
            data-testid= 'remove'
            onClick={removeHandler}
            text={'Удалить'}
            type="submit"
            linkedList="small"
            disabled={queue.isEmpty()}
            isLoader={loaderRemove}
          />
        </div>
        <Button
        data-testid= 'clear'
          onClick={clearHandler}
          text={'Очистить'}
          type="submit"
          linkedList="small"
          disabled={(head === 0 && tail === 0 && length === 0) ? true : false}
          isLoader={loaderClear}
        />
      </form>
      <section className={styles.queuecontainer}>
        {stateQueue.map((el, index: number) => {
          return (
            <Circle
              letter={el ? el : ""}
              key={index}
              index={index}
              head={index === head && stateQueue[index] ? "head" : ""}
              tail={index === tail - 1 && stateQueue[index] ? "tail" : ""}
              state={
                (index === head && color.head) ||
                  (index === tail - 1 && color.tail)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          );
        })}
      </section>
    </SolutionLayout>
  );
};
