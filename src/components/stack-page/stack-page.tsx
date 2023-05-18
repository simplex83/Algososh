import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack-class";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stateStack, setStateStack] = useState<Array<string>>([]);
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [loaderRemove, setLoaderRemove] = useState<boolean>(false);
  const [loaderClear, setLoaderClear] = useState<boolean>(false);
  const [color, setColor] = useState<ElementStates>(ElementStates.Default);

  const stack = useMemo(() => {
    return new Stack<string>();
  }, []);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoaderAdd(true);
    stack.push(inputValue);
    setInputValue("");
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setStateStack([...stack.getElements()])
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      setColor(ElementStates.Default);
      setLoaderAdd(false);
    }, DELAY_IN_MS)
  }

  const removeHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoaderRemove(true);
    
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setStateStack([...stack.getElements()])
    }, SHORT_DELAY_IN_MS);
   
    setTimeout(() => {
      stack.pop();
      setStateStack([...stack.getElements()])
      setColor(ElementStates.Default);
      setLoaderRemove(false);
    }, DELAY_IN_MS)
  }
  const clearHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoaderClear(true);
    setTimeout(() => {
      stack.clear();
      setStateStack([...stack.getElements()])
      setLoaderClear(false);
    }, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Стек">
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
            disabled={inputValue ? false : true}
            isLoader={loaderAdd}
          />
          <Button
            data-testid= 'remove'
            onClick={removeHandler}
            text={'Удалить'}
            type="submit"
            linkedList="small"
            disabled={stateStack.length > 0 ? false : true}
            isLoader={loaderRemove}
          />
        </div>
        <Button
        data-testid= 'clear'
          onClick={clearHandler}
          text={'Очистить'}
          type="submit"
          linkedList="small"
          disabled={stateStack.length > 0 ? false : true}
          isLoader={loaderClear}
        />
      </form>
      <div className={styles.stackcontainer}>

        {stateStack.map((item, index) => {
          return (
            <Circle
              letter={item}
              key={index}
              index={index}
              head={index === stateStack.length - 1 ? "top" : ""}
              state={stateStack.length - 1 === index ? color : ElementStates.Default}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
