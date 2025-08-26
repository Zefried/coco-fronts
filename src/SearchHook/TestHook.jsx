// ✅ TestHook.js
import React from 'react';
import useSearch from './useSearch';

const TestHook = () => {
  const { query, setQuery, SuggestionsList } = useSearch('/api/admin/orders/search');

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <p>Testing Hook</p>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type at least 2 letters..."
        style={{ width: '100%', padding: '8px' }}
      />
      <SuggestionsList />
    </div>
  );
};

export default TestHook;
