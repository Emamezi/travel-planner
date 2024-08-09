import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];
function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <TravelList />
      <Footer />
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

const Form = () => {
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

const TravelList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="stats">
      <em>You have X items on your lsit and have packed X (X%)</em>;
    </footer>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <input type="checkbox"></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};
