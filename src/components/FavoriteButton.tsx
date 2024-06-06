import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  return (
    <IconButton
      aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      icon={isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
      onClick={onClick}
    />
  );
};

export default FavoriteButton;
