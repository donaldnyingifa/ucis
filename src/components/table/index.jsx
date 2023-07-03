import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./table.scss";

function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();

    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}

function Table({ data, searchName }) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        searchName(value);
    };

    const handleUser = (index) => {
        navigate("/user", {
            state: data[index],
        });
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data]; // Create a new array to avoid mutating the original data

    if (sortConfig.key) {
        sortedData.sort((a, b) => {
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (valueA < valueB) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    }

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Change page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <h1>Registered Users</h1>

            <div className='center-div'>
                <TextField
                    id='text'
                    type='text'
                    label='Search Name or ID'
                    variant='standard'
                    value={searchValue}
                    onChange={handleChange}
                />
            </div>

            <table className='rwd-table'>
                <thead>
                    <tr>
                        <th
                            onClick={() => handleSort("id")}
                            className={
                                sortConfig.key === "id" ? `sorted ${sortConfig.direction}` : ""
                            }>
                            ID
                        </th>
                        <th
                            onClick={() => handleSort("name")}
                            className={
                                sortConfig.key === "name" ? `sorted ${sortConfig.direction}` : ""
                            }>
                            Name
                        </th>
                        <th
                            onClick={() => handleSort("gender")}
                            className={
                                sortConfig.key === "gender" ? `sorted ${sortConfig.direction}` : ""
                            }>
                            Gender
                        </th>
                        <th
                            onClick={() => handleSort("dob")}
                            className={
                                sortConfig.key === "dob" ? `sorted ${sortConfig.direction}` : ""
                            }>
                            Age
                        </th>
                        <th
                            onClick={() => handleSort("income")}
                            className={
                                sortConfig.key === "income" ? `sorted ${sortConfig.direction}` : ""
                            }>
                            Income
                        </th>
                    </tr>
                </thead>
                {currentItems.length > 0 && (
                    <tbody>
                        {currentItems.map((person, index) => {
                            return (
                                <tr key={index}>
                                    <td data-th='ID'>{person.id}</td>
                                    <td data-th='Name'>{person.name}</td>
                                    <td data-th='Gender'>{person.gender}</td>
                                    <td data-th='Age'>{calculateAge(person.dob)}</td>
                                    <td data-th='Income'>₦ {person.income || 0}</td>
                                    <td>
                                        <Button
                                            onClick={() => handleUser(indexOfFirstItem + index)}
                                            className='view-button'
                                            style={{
                                                backgroundColor: "grey",
                                                borderColor: "grey",
                                                color: "#fff",
                                            }}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>

            {/* Pagination */}
            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "active" : ""}>
                        {page}
                    </button>
                ))}
            </div>
        </>
    );
}

export default Table;
