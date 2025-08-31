import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthAction } from '../CustomStateManage/OrgUnits/AuthState';

const useSearch = (apiEndpoint) => {
  const { token } = AuthAction.getState('sunState');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const selectingItem = async (item) => {
    try {
      const res = await axios.get(`${apiEndpoint}/${item.id || item.orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedItem(res.data); // store full API response
      setQuery('');
      setSuggestions([]);
    } catch (err) {
      console.error('Select item failed:', err);
    }
  };

  useEffect(() => {
    if (!query) return;
    const handler = setTimeout(async () => {
      try {
        const res = await axios.get(apiEndpoint, {
          params: { q: query },
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuggestions(res.data.data || []); // store raw API data
      } catch (err) {
        console.error('Search failed:', err);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, token, apiEndpoint]);

  return { query, setQuery, suggestions, selectingItem, selectedItem };
};

export default useSearch;
