import React, { useState, useMemo, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "../list-page/list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { TListItem } from "../../types/list";
import { LinkedList } from "./list-class";
import { ILoader } from "../../types/list";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueIndex, setInputValueIndex] = useState<string>('');
  const [listState, setListState] = useState<TListItem[]>([]);
  const [color, setColor] = useState({ ind: 0, colour: false });
  const [coloredIndex, setColoredIndex] = useState(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueIndex(e.target.value);
  };
  const [isLoading, setIsLoading] = useState<ILoader>({
    addHead: false,
    addTail: false,
    delHead: false,
    delTail: false,
    addAtIndex: false,
    delAtIndex: false
  });

  const loading = () => {
    for (let key in isLoading) {
      if (isLoading[key]) return true
    }
    return false
  }

  const startList = useMemo(() => {
    const list = new LinkedList<string>();
    list.append('0');
    list.append('34');
    list.append('8');
    list.append('1');
    setListState([...list.modify()]);
    return list;
  }, []);

  //вставка в "голову"
  const insertAtHead = (isFromInsertAt: boolean = false) => {
    if (!isFromInsertAt) setIsLoading({ ...isLoading, addHead: true });
    startList.insert(inputValue, 0);

    const newList = listState;
    if (listState.length > 0) newList[0].upCircle = <Circle letter={inputValue} state={ElementStates.Changing} isSmall={true} />
    setListState([...newList]);
    setTimeout(() => {
      setListState([...startList.modify()]);
      setInputValue('');
      setColor({ ind: 0, colour: true });
      setTimeout(() => {
        setColor({ ind: 0, colour: false });
        setIsLoading({ ...isLoading, addHead: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }
// вставка в "хвост"
  const insertAtTail = () => {
    setIsLoading({ ...isLoading, addTail: true });
    startList.append(inputValue);

    const newList = listState;
    const tailIndex = listState.length - 1;
    if (listState.length > 0) newList[tailIndex].upCircle = <Circle letter={inputValue} state={ElementStates.Changing} isSmall={true} />
    setListState([...newList]);

    setTimeout(() => {
      setListState([...startList.modify()]);
      setInputValue('');
      setColor({ ind: tailIndex + 1, colour: true });
      setTimeout(() => {
        setColor({ ind: tailIndex + 1, colour: false });
        setIsLoading({ ...isLoading, addTail: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }
  //удаление из "головы"
  const deleteHead = (isFromDeleteAt: boolean = false) => {
    if (!isFromDeleteAt) setIsLoading({ ...isLoading, deleteHead: true });
    startList.removeHead();
    const newList = listState;
    newList[0].downCircle = <Circle letter={newList[0].value} state={ElementStates.Changing} isSmall={true} />;
    newList[0].value = '';
    setListState([...newList]);

    setTimeout(() => {
      setListState([...startList.modify()]);
      setIsLoading({ ...isLoading, deleteHead: false });
    }, SHORT_DELAY_IN_MS);
  }
//удаление из "хвоста"
  const deleteTail = () => {
    setIsLoading({ ...isLoading, deleteTail: true });
    startList.removeTail();
    const newList = listState;
    const tailIndex = listState.length - 1;
    newList[tailIndex].downCircle = <Circle letter={newList[tailIndex].value} state={ElementStates.Changing} isSmall={true} />;
    newList[tailIndex].value = '';
    setListState([...newList]);

    setTimeout(() => {
      setListState([...startList.modify()]);
      setIsLoading({ ...isLoading, deleteTail: false });
    }, SHORT_DELAY_IN_MS);
  }
  //вставка по индексу
  const insertAtIndex = () => {
    setIsLoading({ ...isLoading, addAtIndex: true });
    let index = Number(inputValueIndex);
    if (index === 0) insertAtHead(true);
    if (index > listState.length - 1) return;

    const newList = listState;

    for (let i = 0; i < index + 1; i++) {
      setTimeout(() => {
        newList[i].upCircle = <Circle letter={inputValue} state={ElementStates.Changing} isSmall={true} />;
        if (i > 0) newList[i - 1].upCircle = <></>;
        setColoredIndex(i);
        setListState([...newList]);
        i++;
      }, SHORT_DELAY_IN_MS * i);
    }

    setTimeout(() => {
      setColoredIndex(0);
      setColor({ ind: index, colour: true });
      if (index) startList.insert(inputValue, index);
      setListState([...startList.modify()]);
    }, SHORT_DELAY_IN_MS * (index + 1));

    setTimeout(() => {
      setColor({ ind: index, colour: false });
      setListState([...startList.modify()]);
      setIsLoading({ ...isLoading, addAtIndex: false });
    }, SHORT_DELAY_IN_MS * (index + 2));

    setInputValueIndex('');
    setInputValue('');
  }
//удаление по индексу
  const deleteAtIndex = () => {
    setIsLoading({ ...isLoading, delAtIndex: true });
    let index = Number(inputValueIndex);
    if (index === 0) deleteHead(true);
    if (index > listState.length - 1) return;

    if (index > 0) {
      startList.removeAt(index);
      const newList = listState;

      for (let i = 0; i < index + 1; i++) {
        setTimeout(() => {
          setColoredIndex(i + 1);
        }, SHORT_DELAY_IN_MS * i);
      }

      setTimeout(() => {
        newList[index].downCircle = <Circle letter={listState[index].value} state={ElementStates.Changing} isSmall={true} />;
        newList[index].value = '';
        setColoredIndex(index);
        setListState([...newList]);
      }, SHORT_DELAY_IN_MS * (index + 1));

      setTimeout(() => {
        setColoredIndex(0);
        setListState([...startList.modify()]);
        setIsLoading({ ...isLoading, delAtIndex: false });
      }, SHORT_DELAY_IN_MS * (index + 2));
    }
    setInputValueIndex('');
    setInputValue('');
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} >
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder={'Введите значение'}
          extraClass={styles.input}
          onChange={onChange}
          value={inputValue || ""}
        />
        <Button
          data-testid= 'add_in_head'
          text={"Добавить в head"}
          extraClass={styles.buttonup}
          onClick={() => insertAtHead()}
          isLoader={isLoading.addHead}
          disabled={inputValue === '' || loading()}

        />
        <Button
          data-testid= 'add_in_tail'
          text={"Добавить в tail"}
          extraClass={styles.buttonup}
          onClick={() => insertAtTail()}
          isLoader={isLoading.addTail}
          disabled={inputValue === '' || loading() || listState.length === 0}
        />
        <Button
        data-testid= 'remove_from_head'
          text={"Удалить из head"}
          extraClass={styles.buttonup}
          onClick={() => deleteHead()}
          isLoader={isLoading.deleteHead}
          disabled={loading() || listState.length === 0}
        />
        <Button
        data-testid= 'remove_from_tail'
          text={"Удалить из tail"}
          extraClass={styles.buttonup}
          onClick={() => deleteTail()}
          isLoader={isLoading.deleteTail}
          disabled={loading() || listState.length === 0}
        />
      </form>
      <form className={styles.form}>
        <Input
          maxLength={4}
          placeholder={'Введите индекс'}
          type="number"
          min={0}
          max={Math.max(listState.length - 1, 0)}
          onChange={onChangeIndex}
          value={inputValueIndex}
        />
        <Button
          data-testid= 'add_by_index'
          text={"Добавить по индексу"}
          extraClass={styles.buttondown}
          onClick={insertAtIndex}
          disabled={Number(inputValueIndex) < 0 || Number(inputValueIndex) > Math.max(listState.length - 1, 0) || inputValueIndex === '' || inputValue === '' || loading()}
          isLoader={isLoading.addAtIndex}
        />
        <Button
          data-testid= 'remove_by_index'
          text={"Удалить по индексу"}
          extraClass={styles.buttondown}
          onClick={deleteAtIndex}
          disabled={Number(inputValueIndex) < 0 || Number(inputValueIndex) > listState.length - 1 || inputValueIndex === '' || loading()}
          isLoader={isLoading.delAtIndex}
        />
      </form>
      <div className={styles.container}>
        {listState.map((el, index) => {
          return (
            <div key={index} className={styles.list__el}>
              <Circle
                letter={el.value}
                index={index}
                head={el.upCircle ? el.upCircle : index === 0 ? 'head' : ""}
                tail={el.downCircle ? el.downCircle : index === listState.length - 1 ? 'tail' : ''}
                state={color.ind === index && color.colour ? ElementStates.Modified :
                  index < coloredIndex ? ElementStates.Changing : ElementStates.Default
                }
              />
              {el.next && <ArrowIcon />}
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};

