"use client";
import React from "react";

interface RatingProps {
  rating: number | null;
  setRating: (rating: number | null) => void;
  index?: number;
}

const StarScale = ({ rating, setRating, index }: RatingProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  return (
    <div className="rating rating-half rating-lg">
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="rating-hidden"
        value={0}
        defaultChecked={!rating || rating === 0}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-1 mask-star-2 bg-success"
        value={1}
        defaultChecked={rating === 1}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-2 mask-star-2 bg-success"
        value={2}
        defaultChecked={rating === 2}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-1 mask-star-2 bg-success"
        value={3}
        defaultChecked={rating === 3}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-2 mask-star-2 bg-success"
        value={4}
        defaultChecked={rating === 4}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-1 mask-star-2 bg-success"
        value={5}
        defaultChecked={rating === 5}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-2 mask-star-2 bg-success"
        value={6}
        defaultChecked={rating === 6}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-1 mask-star-2 bg-success"
        value={7}
        defaultChecked={rating === 7}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-2 mask-star-2 bg-success"
        value={8}
        defaultChecked={rating === 8}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-1 mask-star-2 bg-success"
        value={9}
        defaultChecked={rating === 9}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={`rating-${index || 10}`}
        className="mask mask-half-2 mask-star-2 bg-success"
        value={10}
        defaultChecked={rating === 10}
        onChange={handleChange}
      />
    </div>
  );
};

export default StarScale;
