import React from "react";
import { useRepeatable } from ".";

function RepeatableList<T>({
  initialState,
  newItem,
  onChange,
  Card,
  Layout,
}: ModularRepeatableListProps<T>) {
  const { items, addItem } = useRepeatable<T>({
    initialState: initialState || [],
    newItem: newItem,
    onChange: onChange,
  });

  return (
    <Layout
      addItem={addItem}
      Cards={() => (
        <div>
          asdjfkasdf
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    />
  );
}

export { RepeatableList };

interface ModularRepeatableListProps<T> {
  initialState: T[];
  newItem: T;
  onChange?: (items: (T & { id: string })[]) => void;
  Card: React.FC<{ item: T }>;
  Layout: React.FC<{ Cards: React.FC<{}>; addItem: () => void }>;
}
