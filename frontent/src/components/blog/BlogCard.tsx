import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// import PostComment from '';
import PostComment from './PostComment'
import { json } from 'stream/consumers';




interface Comment {
    // Define the shape of comment
}

interface VoteCardProps {
    id: string;
    name: string;
    image_url: string;
    title: string;
    message: string;
    user: {
        first_name: string;
        last_name: string;
        image_url: string;
    };
    images: string;
    like: any[];
    comments: Comment[];
    updated: string;
}

const VoteCard: React.FC<VoteCardProps> = ({ id, name, image_url, title, message, user, images, like, comments }) => {


    interface onValueChange {
        onValueChange: (value: boolean) => void;
    }

    const [likePrint, setLikePrint] = useState(true);
    const [commentPrint, setCommentPrint] = useState(true);
    const [comentBox, setCommentBox] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [count, setCount] = useState(like.length);
    const [comment, setComment] = useState(0);
    const [Vote, setVote] = useState('Likes');
    const [coment, setComet] = useState('');
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();


    const handleVote = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8050/api//blogs/like`, {
                method: 'POST',
                headers: {
                    'authorization': token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5Nzk0MTEwLCJleHAiOjE3MDk4ODA1MTB9.H0L9I6XcXVaMX5a5mOzzoAgRdlBdeoJhfIrS3Xn04Xw',
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    id: 1
                })
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleComment = () => {
        let totalComment = comment + 1;
        setComment(totalComment);
        if (comments.length === 1) {
            setComet('Comment');
        } else {
            setComet('Comments');
        }

        if (comments.length > 0) {
            setCommentPrint(true);
        }
    };

    useEffect(() => {
        handleComment();
    }, []);

    const addToFavorite = async () => {
        try {
            // Your API call to add to favorites
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8050/api/favorite/blogs/${id}`, {
                method: 'POST',
                headers: {
                    'authorization': token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5Nzk0MTEwLCJleHAiOjE3MDk4ODA1MTB9.H0L9I6XcXVaMX5a5mOzzoAgRdlBdeoJhfIrS3Xn04Xw',
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            alert(data.message);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
            // Handle error if needed
        }
    };

    return (
        <div className="bg-opacity-50 ">
            <div className="p-1">
                <section className="relative mx-auto py-1 md:py-4 my-1 shadow-lg rounded-md border bg-white" >
                    <div className="grid grid-cols-12 mx-4 ">
                        <div className="grid col-span-11 py-1">
                            <div className="flex">
                                <div>
                                    {user.image_url ? (
                                        <img src={user.image_url} alt="flag" className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] rounded-full" />
                                    ) : (
                                        <span />
                                    )}
                                </div>
                                <div>
                                    <Link href="/profile" className="md:text-2xl ml-3 font-semibold">
                                        {user.first_name} {user.last_name}
                                    </Link>
                                    <h1 className="ml-3 text-xs">Jan 6 2024</h1>
                                </div>
                            </div>
                        </div>
                        <div className="grid col-span-1 float-right">
                            <div className="">
                                <Icon onClick={addToFavorite} className="float-right mt-2 lg:mt-3 cursor-pointer" width="18px" icon="fluent-mdl2:add-favorite" />
                            </div>
                        </div>
                    </div>

                    <div className="mx-4 md:my-1 lg:my-2 relative">
                        <div className="mb-5 md:mb-8">
                            <div>
                                <h1 className="font-semibold py-1">
                                    <span className="text-lg">{title}</span>
                                </h1>
                                {showMore ? (
                                    <p className="text-xs md:text-sm lg:text-md">{message}</p>
                                ) : (
                                    <p className="text-xs md:text-sm lg:text-md">{message.slice(0, 100)}...</p>
                                )}
                                <button className="font-bold" onClick={() => { setShowMore(!showMore) }}>
                                    {showMore ? <p className="text-xs md:text-sm lg:text-md">hide..</p> : <p className="text-xs md:text-sm lg:text-md">See more..</p>}
                                </button>
                            </div>
                            <div>
                                <Link href={`/blogdetails/${7}`}>
                                    <img src={image_url} className="w-full h-full min-h-[200px] max-h-[500px] rounded" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {toggle ? (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%]">
                            <PostComment id={id} onValueChange={(value) => setToggle(value)} />
                        </div>
                    ) : (
                        <span />
                    )}

                    {comentBox ? (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%]">
                            <form className="w-full">
                                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    {/* <Icon onClick={() => setCommentBox(false)} className="m-2 cursor-pointer float-right" icon="fluent-emoji-flat:cross-mark" /> */}
                                    <h1 className="p-4 font-semibold text-lg">Comments</h1>
                                    {/* <div className="min-h-40 max-h-[250px] overflow-y-scroll">
                                        {comments.map((com) => {
                                            return <VievComment com={com} />;
                                        })}
                                    </div> */}
                                </div>
                            </form>
                        </div>
                    ) : (
                        <span />
                    )}

                    <div className="mx-4 grid grid-cols-2">
                        <div>{likePrint && <h2 className='font-semibold'>{count} {Vote}</h2>}</div>
                        <div>{commentPrint && <button onClick={() => { setCommentBox(!comentBox) }} className='font-semibold float-right'>{comments.length} {coment}</button>}</div>
                    </div>



                    <div className='grid grid-cols-2 mx-4 mb-1 md:mb-2  py-1 relative'>
                        <div className=''>
                            <div className='flex'>
                                <button className='flex bg-gray-300 px-10 md:px-12 lg:px-16 py-1 rounded text-lg' onClick={handleVote} >Like
                                    {/* <BiLike className='text-2xl md:text-3xl text-slate-600 hover:text-white m-auto' /> */}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button onClick={() => { setToggle(!toggle) }} className='float-right border rounded py-1 font-semibold px-4 block bg-[#D1D5DB]'>Comment</button>
                        </div>
                    </div>



                </section>


            </div>
        </div>
    )
}

export default VoteCard;
