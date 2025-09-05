import './Menu.css';

const items = [
  "Men", "Women", "Kids", "Accessories", "Shoes",
  "Bags", "Hats", "Jewelry", "Sports", "Electronics",
  "Home", "Garden", "Toys", "Books", "Music",
];

const Menu = () => {
  return (
    <div className="menu-container">
      <p><strong>Menu</strong></p>
      <div className="menu-grid">
        {items.map((item, idx) => (
          <a key={idx} href={`/shop/${item.toLowerCase()}`}>{item}</a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
