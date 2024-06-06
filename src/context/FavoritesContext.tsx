import React, { createContext, useContext, useState, ReactNode } from "react";
import { EventProps, VenueProps } from "../types/interfaces";

interface FavoritesContextType {
  eventFavorites: EventProps[];
  venueFavorites: VenueProps[];
  updateEventFavorites: (newEventFavorites: EventProps[]) => void;
  updateVenueFavorites: (newVenueFavorites: VenueProps[]) => void;
}
interface Props {
  children: ReactNode;
}

// create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// create custom context hook
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [eventFavorites, setEventFavorites] = useState<EventProps[]>(
    JSON.parse(localStorage.getItem("favoriteEvents") || "[]")
  );
  const [venueFavorites, setVenueFavorites] = useState<VenueProps[]>(
    JSON.parse(localStorage.getItem("favoriteVenues") || "[]")
  );

  const updateEventFavorites = (newEventFavorites: EventProps[]) => {
    setEventFavorites(newEventFavorites);
    localStorage.setItem("favoriteEvents", JSON.stringify(newEventFavorites));
  };

  const updateVenueFavorites = (newVenueFavorites: VenueProps[]) => {
    setVenueFavorites(newVenueFavorites);
    localStorage.setItem("favoriteVenues", JSON.stringify(newVenueFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{
        eventFavorites,
        venueFavorites,
        updateEventFavorites,
        updateVenueFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
