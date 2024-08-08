import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },
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
  return (
    <div className="add-form">
      <h3>Form inputs</h3>
    </div>
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
