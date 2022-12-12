import React from 'react';
import { TodoItem } from '@pages/api/TodoItem';
import Item from '@pages/parts/components/Item';

export type ItemListProps = {
  todoList: TodoItem[],
};

const ItemList: React.FC<ItemListProps> = ({ todoList }) => {
  return <>
    {
      todoList.map(item => <Item id={item.id} content={item.content}/>)
    }
  </>;
};

export default ItemList;
