// ✅ useSearch.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthAction } from '../CustomStateManage/OrgUnits/AuthState';

const useSearch = (apiEndpoint) => {
  const { token } = AuthAction.getState('sunState');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // ✅ store selected item

  const selectingItem = async (item) => {
    try {
      const res = await axios.get(`${apiEndpoint}/${item.orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data);

      // ✅ store the selected item
      setSelectedItem(res.data);
      setQuery(''); // clear input
      setSuggestions([]); // clear suggestions
    } catch (err) {
      console.error('Select item failed:', err);
    }
  };

  useEffect(() => {
    if (query.length < 1) return;
    const handler = setTimeout(async () => {
      try {
        const res = await axios.get(apiEndpoint, {
          params: { q: query },
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data.data.flatMap(order => {
          if (order.products) {
            const prods = JSON.parse(order.products);
            return prods.map(p => ({
              orderId: order.id,
              itemName: order.item_name,
              unitPrice: p.unit_price
            }));
          }
          return [{ orderId: order.id, itemName: order.item_name, unitPrice: 'N/A' }];
        });

        setSuggestions(data);
      } catch (err) {
        console.error('Search failed:', err);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, token, apiEndpoint]);

  const SuggestionsList = () => {
    if (suggestions.length > 0) {
      return (
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: '5px',
          border: '1px solid #ccc',
          position: 'absolute',
          width: '100%',
          backgroundColor: '#fff',
          zIndex: 1000
        }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              style={{
                padding: '5px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onMouseDown={() => selectingItem(s)}
            >
              Order #{s.orderId} - {s.itemName} - ₹{s.unitPrice}
            </li>
          ))}
        </ul>
      );
    } else if (query.length >= 2) {
      return (
        <div style={{
          padding: '5px',
          border: '1px solid #ccc',
          position: 'absolute',
          width: '100%',
          backgroundColor: '#fff',
          zIndex: 1000
        }}>
          No suggestion found
        </div>
      );
    }
    return null;
  };

  return { query, setQuery, SuggestionsList, selectedItem }; // ✅ return selectedItem
};

export default useSearch;
