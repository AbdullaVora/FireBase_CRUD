import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData, editData, fetchData } from '../app/slices/formSlice';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.form.data);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    // Edit data by ID
    const editDataId = (id) => {
        navigate(`/${id}`);  // Navigate to edit page
    }

    // Handle delete action
    const handleDelete = (id) => {
        dispatch(deleteData(id));  // Dispatch delete action
    }

    return (
        <div className="container mt-5 bg-dark text-light p-5 rounded">
            <div className="table-responsive">
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm mx-1"
                                            onClick={() => editDataId(item.id)}
                                        >
                                            Edit Data
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
