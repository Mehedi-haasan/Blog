
import changeColor from '@/Redux/slices/changeColor';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';




const Login = () => {

    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    console.log({ state });

    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8050/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        alert(data.message)
        localStorage.setItem('token', (data.accessToken));
        dispatch(changeColor())
    }

    return (
        <form className="max-w-sm mx-auto mb-5" >
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" onChange={(e) => { setValues({ ...values, username: e.target.value }) }} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email or mobile" required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" onChange={(e) => { setValues({ ...values, password: e.target.value }) }} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter your password' required />
            </div>
            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
};

export default Login