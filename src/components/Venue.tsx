import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Heading, Spinner, Box, AspectRatio } from "@chakra-ui/react";
import Breadcrumbs from "./Breadcrumbs";
import Error from "./Error";
import { useSeatGeek } from "../utils/useSeatGeek";
import FavoriteButton from "./FavoriteButton";
import { useFavoritesContext } from "../context/FavoritesContext";

interface VenueProps {
  name: string;
  location: {
    city: string;
    country: string;
    capacity: number;
    lat: number;
    lon: number;
  };
}

const Venue: React.FC = () => {
  const { venueId } = useParams();
  const { data: venue, error } = useSeatGeek(`venues/${venueId}`);
  const { venueFavorites, updateVenueFavorites } = useFavoritesContext();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!venue) return;
    setIsFavorite(venueFavorites.some((fav) => fav.id === venue.id));
  }, [venue, venueId, venueFavorites]);

  const toggleFavorite = () => {
    if (!venue) return;

    const newFavorites = isFavorite
      ? venueFavorites.filter((fav) => fav.id !== venue.id)
      : [...venueFavorites, venue];
    updateVenueFavorites(newFavorites);
    setIsFavorite(!isFavorite);
  };

  if (error) return <Error />;

  if (!venue) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Venues", to: "/venues" },
          { label: venue.name },
        ]}
      />
      <Flex bgColor="gray.200" p={[4, 6]}>
        <Heading>{venue.name}</Heading>
      </Flex>
      <Stats venue={venue} />
      <Map location={venue.location} />
      <Flex justifyContent="flex-end" p="6">
        <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
      </Flex>
    </>
  );
};

const Stats: React.FC<{ venue: VenueProps }> = ({ venue }) => (
  <Box m="6" p="4">
    <Flex flexDirection="column">
      <Heading size="md">Location</Heading>
      <Box>
        {venue.location.city}, {venue.location.country}
      </Box>
    </Flex>
    {venue.location.capacity > 0 && (
      <Flex flexDirection="column">
        <Heading size="md">Capacity</Heading>
        <Box>{venue.location.capacity}</Box>
      </Flex>
    )}
  </Box>
);

const Map: React.FC<{ location: { lat: number; lon: number } }> = ({
  location,
}) => (
  <AspectRatio ratio={16 / 5} m="6">
    <Box
      as="iframe"
      src={`https://maps.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed`}
    />
  </AspectRatio>
);

export default Venue;
