import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    try {
      onSearch(query);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for videos"
        style={{ flex: 1 }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
