import React from 'react';

interface CommentProps {

    com: {
        id: number;
        comment: string;
        user: {
            email:string;
            first_name: string;
            last_name: string;
            image_url: string;
        };
    };

}


const VievComment: React.FC<CommentProps>= ({ com }) => {
    return (
        <div>
            <div className='flex px-1 py-1.5'>
                <div><img className='h-[35px] w-[35px] rounded-full mr-2' src={com.user.image_url} alt='' /></div>
                <div>
                    <h1 className='font-semibold'>{com.user.first_name} {com.user.last_name}</h1>
                    <h1 className=''>{com.comment}</h1>
                </div>
            </div>
        </div>
    );
};

export default VievComment;