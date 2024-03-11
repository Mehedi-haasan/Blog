import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/blog/BlogCard';

const FavoriteBlog: React.FC = () => {
    interface BlogData {
        id: string;
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
        likes: any[];
        comments: any[]
        updated: string;
    }
    const [loading, setLoading] = useState<Boolean>(false)
    const [data, setData] = useState<BlogData[]>()
    const fetchData = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/get/user/favorite/blogs`, {
            method: 'GET',
            headers: {
                'authorization': token || '',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json()
        setData(data.items)
        setLoading(true)
    }

    useEffect(() => {
        fetchData();
    }, [])
    console.log(data);

    return (
        <div className='bg-[#F0F2F5]'>
            {/* {
                data.length > 0 ? <div className='p-1 w-full sm:w-[80%] md:w-[55%] lg:w-[50%] xl:w-[40%] mx-auto'>
                    {
                        data.map(({ id, name, image_url, user, title, message, images, like, comments, updated }) => {
                            return <VoteCard key={id} id={id} name={name} user={user} title={title} image_url={image_url} message={message} images={images} like={like} comments={comments} updated={updated} />
                        })
                    }
                </div> : <h1 className='text-lg py-5 text-center italic font-semibold'>Yoy don,t add any favorite blog yet</h1>
            } */}

            {
                loading ? <div className='p-1 w-full sm:w-[80%] md:w-[55%] lg:w-[50%] xl:w-[40%] mx-auto'>
                    {
                        data?.map(({ id, name, image_url, user, title, message, images, likes, comments, updated }) => {
                            return <BlogCard key={id} id={id} name={name} user={user} title={title} image_url={image_url} message={message} images={images} like={likes} comments={comments} updated={updated} />
                        })
                    }
                </div> : <span />
            }
        </div>
    );
};

export default FavoriteBlog;