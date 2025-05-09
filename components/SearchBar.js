import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!query.trim()) {
      alert('Search query cannot be empty');
      return;
    }

    if (!onSearch) {
      alert('Search function is not provided');
      return;
    }

    try {
      onSearch(query);
      setQuery('');
    } catch (error) {
      alert('An error occurred while searching');
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
