import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import TravelList from "./travel-list";
import Footer from "./Footer";

function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) =>
    //use callbalcks to update state based on the current state
    setItems((items) => [...items, item]);

  const handleDeleteItems = (id) => {
    //updating state based on the current state
    setItems((items) => items.filter((item) => item.id !== id));
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
