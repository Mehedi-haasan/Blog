import React, { useEffect, useState } from "react";
import MyBlog from '../../components/profile/MyBlog'

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
    like: number;
    comments: any[]
    updated: string;
}


const Profile: React.FC = () => {

    const [data, setData] = useState<BlogData[]>([])
    const Alldata = [
        {
            data: "Studied at Atish Dipankar University of Science & Technology-ADUST",
        },
        {
            data: "Studied at Nabakumar Institution and Dr. Shahidullah College",
        },
        {
            data: "Went to Ghonar chala high school",
        },
    ]

    const fetchData = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/get/user/blogs`, {
            method: 'GET',
            headers: {
                'authorization': token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5Nzk0MTEwLCJleHAiOjE3MDk4ODA1MTB9.H0L9I6XcXVaMX5a5mOzzoAgRdlBdeoJhfIrS3Xn04Xw',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json()
        console.log(data.items);
        setData(data.items)
    }

    useEffect(() => {
        fetchData();
    }, [])


    // console.log(data);

    return (
        <div className="w-full">
            <div className="w-full md:w-[80%] lg:w-[70%] shadow-xl mx-auto">
                <div className="pb-[6%]">
                    <div className="">
                        <div className="relative">
                            <div className="absolute ml-[3%] bottom-[-15%]">
                                <img className="h-8 w-8 rounded-full absolute right-1 lg:right-2 border-2 shadow-lg bottom-1 lg:bottom-2" src="https://img.freepik.com/premium-photo/man-wearing-pair-glasses-with-brand-na_670382-25510.jpg?size=626&ext=jpg&uid=R129270920&ga=GA1.1.739182794.1705853040&semt=ais_ai_generated" alt="" />
                                <img className="h-[110px] lg:h-[150px] w-[110px] lg:w-[150px]  border-4 shadow-lg rounded-full " src="https://img.freepik.com/free-photo/fashion-man-photography_1409-5585.jpg?size=626&ext=jpg&uid=R129270920&ga=GA1.1.739182794.1705853040&semt=ais_ai_generated" alt="" />
                            </div>
                            <div className="">
                                <img className="w-full rounded h-[200px] md:h-[300px] lg:h-[500px]" src="https://img.freepik.com/free-photo/fashion-man-photography_1409-5585.jpg?size=626&ext=jpg&uid=R129270920&ga=GA1.1.739182794.1705853040&semt=ais_ai_generated" alt="" />
                            </div>

                        </div>
                    </div>

                </div>
                <h1 className="ml-[3%] p-3 text-2xl lg:text-3xl font-semibold">Mehedi hasan</h1>
            </div>

            <div className="w-full bg-[#F0F2F5] pt-5">
                <div className="w-full md:w-[80%] lg:w-[70%] mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="grid col-span-12 md:col-span-5  rounded-md ">
                            <div>

                                <div className="pb-2  rounded">
                                    <div className="pb-2 rounded bg-white shadow-lg">
                                        <h1 className="p-3 font-semibold text-xl">Intro</h1>
                                        {
                                            Alldata.map((data) => (
                                                <h1 className="pt-1 px-3">{data.data}</h1>
                                            ))
                                        }

                                        <button className="p-1 my-2 bg-[#F0F2F5] w-[96%] block mx-auto rounded-md border">Edit Details</button>
                                        <button className="p-1 my-2 bg-[#F0F2F5] w-[96%] block mx-auto rounded-md border">Add Feature</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid col-span-12 md:col-span-7 rounded-md">
                            <div className=" rounded-md">
                                <div className="bg-white p-1 rounded mx-2">
                                    <h1 className="p-3 font-semibold text-xl">My Blogs</h1>
                                </div>
                                <div className='p-1'>
                                    {
                                        data.map(({ id, name, image_url, user, title, message, images, like, comments, updated }) => {
                                            return <MyBlog key={id} id={id} name={name} user={user} title={title} image_url={image_url} message={message} images={images} like={like} comments={comments} updated={updated} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Profile;
