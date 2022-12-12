import React, { useRef, useCallback } from 'react';

export type ItemProps = {
  id: number;
  content: string;
}

const Item: React.FC<ItemProps> = ({id, content}) => {
  return <div>
    <label>{id}. {content}</label>
  </div>;
};

export default Item;
