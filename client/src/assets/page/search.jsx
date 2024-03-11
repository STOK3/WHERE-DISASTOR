import React, { useState, useEffect } from 'react'; // Import necessary hooks
import './searchstyle.css'; // Import CSS for styling

export default function Search() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date state
  const [searchResults, setSearchResults] = useState([]); // State to hold fetched data
  const [isLoading, setIsLoading] = useState(false); // Loading state indicator (optional)
  const [error, setError] = useState(null); // Error state (optional)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state (optional)
      setError(null); // Clear previous errors

      try {
        const response = await fetch(`http://your-api-endpoint/${selectedDate.toISOString().split('T')[0]}`, {
          // Adjust request method and headers if needed (e.g., POST, Content-Type)
          method: 'GET', // Assuming GET request here
        });

        if (!response.ok) {
          // Handle non-2xx status codes (e.g., 404)
          if (response.status === 404) {
            setError('No data found for this date.'); // Specific error message
          } else {
            throw new Error('Failed to fetch data');
          }
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setIsLoading(false); // Clear loading state (optional)
      }
    };

    if (selectedDate) { // Fetch data only if a date is selected
      fetchData();
    }
  }, [selectedDate]); // Dependency array: refetch on selectedDate change

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div id="search"> {/* Add an ID for styling */}
      <h1>Search by Date</h1>
      <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
      {isLoading && <p>Loading data...</p>} {/* Optional loading indicator */}
      {error && <p>Error: {error}</p>} {/* Display specific error messages */}
      {searchResults.length === 0 && !error && <p>No disasters reported for this date.</p>} {/* Informative message when no data found (without error) */}
      {searchResults.length > 0 && (
        <table>
          <thead>
            <tr>
              {/* Replace with actual column names from your SQL database */}
              <th>Column 1</th>
              <th>Column 2</th>
              {/* ... */}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((item) => (
              <tr key={item.id}> {/* Add unique key for each row */}
                {/* Access data from each item in searchResults based on your API response structure */}
                <td>{item.column1}</td>
                <td>{item.column2}</td>
                {/* ... */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
