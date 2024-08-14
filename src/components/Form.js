import { useState } from "react";

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

export default Form;
