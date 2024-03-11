import React, { useState, useEffect } from 'react';
import VievComment from '@/components/blog/ViewComment';

interface BlogData {
    id: number;
    name: string;
    image_url: string;
    user: {
        email: string;
        first_name: string;
        last_name: string;
        image_url: string;
    };
    title: string;
    message: string;
    images: string;
    like: number;
    comments: any[]
    updated: string;
}


const BlogDetails: React.FC = () => {





    const [loading, setLoading] = useState(false)

    const [data, setData] = useState<BlogData[]>()
    const fetchData = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/get/blogs/1`, {
            method: 'GET',
            headers: {
                'authorization': token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5Nzk0MTEwLCJleHAiOjE3MDk4ODA1MTB9.H0L9I6XcXVaMX5a5mOzzoAgRdlBdeoJhfIrS3Xn04Xw',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json()
        setData(data.items)

        if (data || data.items.length > 0) {
            setLoading(true)
        }

    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className='w-full md:w-[90%] lg:w-[85%] mx-auto py-5'>
            {
                loading ? <div className='grid grid-cols-12 gap-4'>
                    <div className='grid col-span-12 lg:col-span-8 bg-black rounded'>
                        <img src={data.image_url} className='w-full h-full min-h-[200px] max-h-[500px] rounded p-4' alt='' />
                    </div>
                    <div className='grid col-span-12 lg:col-span-4'>
                        <div className='min-h-40 max-h-[450px] overflow-y-scroll'>
                            {
                                data.comments.map((com) => {
                                    return <VievComment key={com.user.email} com={com} />
                                })
                            }
                        </div>
                    </div>
                </div> : <h1>Loading...</h1>
            }
        </div>
    );
};

export default BlogDetails;