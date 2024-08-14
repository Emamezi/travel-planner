import { useState } from "react";
import Item from "./Item";

const TravelList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description)); //compare description string

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed)); //converting true and false to 0,1 values for sorting
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      {items.length > 0 && (
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">sort by input order</option>
            <option value="description">sort by description</option>
            <option value="packed">sort by packed status</option>
          </select>
          <button onClick={onClearList}>Clear List</button>
        </div>
      )}
    </div>
  );
};
export default TravelList;
