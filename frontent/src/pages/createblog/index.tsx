import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
    const [values, setValues] = useState<{ title?: string; message?: string; image_url?: string }>({});
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const response = await fetch('http://localhost:8050/api/create/blogs', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'authorization': token || '',
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data = await response.json();
            alert(data.message);
            // Redirect to another page upon successful form submission
            router.push('/success-page'); // Change '/success-page' to your desired route
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    return (
        <form className="max-w-sm mx-auto mb-5 py-5" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Name</label>
                <input type="text" onChange={(e) => { setValues({ ...values, title: e.target.value }) }} id="title" name="title" value={values.title || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your blog name" required />
            </div>

            <div className="mb-5">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Details</label>
                <input type="text" onChange={handleChange} id="message" name="message" value={values.message || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your blog details" required />
            </div>

            <div className="mb-5">
                <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
                <input type="text" onChange={handleChange} id="image_url" name="image_url" value={values.image_url || ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your blog image url" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
};

export default IndexPage;
