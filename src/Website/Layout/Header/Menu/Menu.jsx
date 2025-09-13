import './Menu.css';

const Menu = ({ categories }) => {
  return (
    <div className="menu-container">
      <p><strong>Menu</strong></p>
      <div className="menu-grid">
        {categories.map(cat => (
          <a key={cat.id} href={`/category/${cat.slug}`}>
            {cat.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
