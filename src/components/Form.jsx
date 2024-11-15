import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addData, editData, fetchData } from "../app/slices/formSlice"
import { Link, useNavigate, useParams } from 'react-router-dom';

const Form = () => {
    useEffect(() => {
        dispatch(fetchData());
    }, [])


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();

    const data = useSelector((state) => state.form.data);

    const fetchEditData = data.find((data) => data.id === id);
    // console.log(fetchEditData);

    useEffect(() => {
        if (fetchEditData) {
            setFormData({
                name: fetchEditData.name,
                email: fetchEditData.email,
                password: fetchEditData.password,
            })
        }
    }, [fetchEditData])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (fetchEditData) {
            dispatch(editData({ id, updateData: formData }))
            navigate('/show');
        } else {
            dispatch(addData(formData));
        }
    };



    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"

                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type={fetchEditData ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-evenly">

                    <button type="submit" className="btn btn-primary">
                        {fetchEditData ? "Edit Data" : "Submit"}
                    </button>
                    <Link to='/show' ><button type="button" className="btn btn-primary">
                        Show
                    </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};



export default Form
