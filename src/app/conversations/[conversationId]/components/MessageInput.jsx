"use client";

const MessageInput = ({id,register,errors,placeholder,type,required}) => {
    return (
        <div className="relative w-full">
            <input id={id} type={type} 
            autoComplete={true}
            {...register(id,{required})}
            placeholder={placeholder}
            className='text-black
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full
            rounded-full
            focus:outline-none
            '
            />

            
        </div>
    )
};

export default MessageInput;