import React, { useState } from 'react';

export default function Tag({className, text,status,onClick,clickable = true,textColor,backgroundColor}: {
    text: string;
    status?: boolean;
    onClick?: Function;
    clickable?: boolean;
    textColor?: string;
    backgroundColor?: string;
    className?: string;
}) {
    const [active, setActive] = useState(status ?? false);

    function handleClick() {
        if (clickable === false && active === false) {
            return;
        }
        setActive(!active);
        if (onClick) {
            return onClick(!active);
        }
    }

    return (
        <a
            onClick={() => handleClick()}
            style={{
                color: active ? 'white' : (textColor ?? 'black'),
                backgroundColor: active ? backgroundColor || '#6777ef' : 'white',
            }}
            className={`${className} rounded-full text-sm px-4 py-1 border ${
                clickable === false && active === false
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'
            }`}
        >
            {text}
        </a>
    );
}
