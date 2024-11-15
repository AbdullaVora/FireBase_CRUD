import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, editData, fetchData } from '../app/slices/formSlice'
import { useNavigate } from 'react-router-dom'

const Table = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    const data = useSelector((state) => state.form.data)
    // console.log(data);

    const editDataId = (id) => {
        dispatch(editData(id))
        navigate(`/${id}`);
    }

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
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
                                <td colSpan="4" className="text-center">
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
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => dispatch(deleteData(item.id))}>Delete</button>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => editDataId(item.id)}>Edit Data</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
