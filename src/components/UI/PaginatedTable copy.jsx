import React, { useState } from 'react';

const PaginatedTable = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    { id: 3, name: 'Mike Johnson', age: 42 },
    { id: 4, name: 'Sarah Connor', age: 29 },
    { id: 5, name: 'Tom Hanks', age: 65 },
    { id: 6, name: 'Emma Watson', age: 33 },
    { id: 7, name: 'Chris Hemsworth', age: 40 },
    { id: 8, name: 'Robert Downey Jr.', age: 58 },
    { id: 9, name: 'Mark Ruffalo', age: 53 },
    { id: 10, name: 'Scarlett Johansson', age: 36 },
    { id: 11, name: 'Tom Cruise', age: 62 },
    { id: 12, name: 'Brad Pitt', age: 59 },
    { id: 13, name: 'Angelina Jolie', age: 49 },
    { id: 14, name: 'Matt Damon', age: 53 },
    { id: 15, name: 'Julia Roberts', age: 58 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate the pagination range (5 buttons, with possible ellipses)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    
    // If there are fewer than or equal to 5 pages, show all
    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Start with the current page and then add up to 2 pages before and after
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // If we don't have 5 buttons, fill in with ellipses
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px' }}>
        {/* Pagination Controls */}
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => {
              if (pageNumber !== '...') handlePageChange(pageNumber);
            }}
            disabled={pageNumber === '...'}
            style={{
              padding: '5px 10px',
              margin: '0 5px',
              cursor: pageNumber === '...' ? 'default' : 'pointer',
              backgroundColor: currentPage === pageNumber ? '#007bff' : '#ccc',
              color: currentPage === pageNumber ? 'white' : 'black',
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedTable;
