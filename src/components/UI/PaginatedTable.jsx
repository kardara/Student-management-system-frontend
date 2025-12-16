import React, { useState } from 'react';

const PaginatedTable = ({rows, headers, data, objectKeys}) => {
   
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the data to display on the current page
    const indexOfLastItem = currentPage * rows;
    const indexOfFirstItem = indexOfLastItem - rows;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(data?.length / rows);


    // const objectKeys = Object.getOwnPropertyNames(data[0])

    return (
        <div>
            <table >
                <thead>
                    <tr>
                        {headers.map((h, id)=><th key={id}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, id) => (
                        <tr key={id}>
                            {objectKeys.map((k) => <td key={k}>{item[k]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className=' flex justify-center p-3'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            padding: '5px 10px',
                            margin: '0 5px',
                            cursor: 'pointer',
                            backgroundColor: currentPage === index + 1 ? '#007bff' : '#ccc',
                            color: currentPage === index + 1 ? 'white' : 'black',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaginatedTable;
