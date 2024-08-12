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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <TravelList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
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

const TravelList = ({ items, onDeleteItem, onToggleItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
};

const Footer = ({ items }) => {
  const numLength = items.length;
  const packedQuantity = items.filter((item) => item.packed === true).length;
  const packedStats = Math.floor((packedQuantity / numLength) * 100);
  return (
    <footer className="stats">
      <em>
        You have {numLength} items on your lsit and have packed {packedQuantity}
        ..
        {packedStats}%
      </em>
      ;
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
