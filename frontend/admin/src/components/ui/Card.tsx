import React, { ReactNode } from 'react';

interface CardProps {
    imageUrl?: string;
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({ imageUrl, children }) => {
    return (
        <div className="border rounded-lg shadow-lg overflow-hidden">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt=""
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">{children}</div>
        </div>
    );
};

export default Card;
