import React, { useState, useEffect } from 'react';
import BlogCard from '../components/blog/BlogCard';


interface BlogData {
  id: string;
  name: string;
  image_url: string;
  user: {
    first_name: string;
    last_name: string;
    image_url: string;
  };
  title: string;
  message: string;
  images: string;
  likes:any[];
  comments: Comment[];
  updated: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<BlogData[]>([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8050/api/get/blogs`, {
        method: 'GET',
        headers: {
          'authorization': token || '',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data.items);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <main className={``}>
      <div className='bg-[#F0F2F5]'>
        <div className='p-1 w-full sm:w-[80%] md:w-[55%] lg:w-[50%] xl:w-[40%] mx-auto'>
          {data.map(({ id, name, image_url, user, title, message, images, likes, comments, updated }) => {
            return <BlogCard key={id} id={id} name={name} user={user} title={title} image_url={image_url} message={message} images={images} like={likes} comments={comments} updated={updated} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
