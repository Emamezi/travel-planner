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

export default Footer;
