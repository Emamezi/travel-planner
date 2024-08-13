import { useState } from "react";
import "./App.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];
function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) =>
    //use callbalcks to update state based on the current state
    setItems((items) => [...items, item]);

  const handleDeleteItems = (id) => {
    //updating state based on the current state
    setItems((items) => items.filter((item) => item.id !== id));
    // const deletedItem = items.filter((item) => id !== item.id);
    // setItems(deletedItem);
  };
  const handleToggleItem = (id) => {
    setItems((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    const confirmed = items.length
      ? window.confirm("Are you sure you want to delete the list?")
      : null;
    confirmed && setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <TravelList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Footer items={items} />
    </div>
  );
}

export default App;

const Logo = () => {
  return (
    <header>
      <h1>🛫 Travel Away 👝</h1>
    </header>
  );
};

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addItemHandler = (event) => {
    event.preventDefault();
    if (!description) return;
    //create new Item object
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    console.log(newItem);
  };
  return (
    <form className="add-form" onSubmit={addItemHandler}>
      <h3>Enter a travel packlist</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="enter an item"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button onClick={addItemHandler}>Add</button>
    </form>
  );
};

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
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
};

const Footer = ({ items }) => {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your list</em>
      </p>
    );
  const numLength = items.length;
  const packedQuantity = items.filter((item) => item.packed === true).length;
  const packedStats = Math.floor((packedQuantity / numLength) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {packedStats === 100
          ? "You got everything. Ready to go"
          : `You have ${numLength} items on your lsit and have packed ${packedQuantity}
        (${packedStats})%`}
      </em>
    </footer>
  );
};

const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className="delete-btn" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
};
