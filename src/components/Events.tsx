import React from "react";
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Image,
  LinkBox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import Breadcrumbs from "./Breadcrumbs";
import Error from "./Error";
import { useSeatGeek } from "../utils/useSeatGeek";

import { EventProps } from "../types/interfaces";
import { useFavoritesContext } from "../context/FavoritesContext";

export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
  timezone: string;
}

interface EventItemProps {
  event: EventProps;
}

const Events: React.FC = () => {
  const { data, error } = useSeatGeek("/events", {
    type: "concert",
    sort: "score.desc",
    per_page: "24",
  });

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Events" }]} />
      <SimpleGrid spacing="6" m="6" minChildWidth="350px">
        {data.events?.map((event: EventProps) => (
          <EventItem key={event.id.toString()} event={event} />
        ))}
      </SimpleGrid>
    </>
  );
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { eventFavorites, updateEventFavorites } = useFavoritesContext();

  const isFavorite = eventFavorites.some((fav) => fav.id === event.id);

  // update favorites
  const toggleFavorite = () => {
    const newFavorites = isFavorite
      ? eventFavorites.filter((fav) => fav.id !== event.id)
      : [...eventFavorites, event];
    updateEventFavorites(newFavorites);
  };

  return (
    <LinkBox
      as={Card}
      variant="outline"
      overflow="hidden"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ bg: "gray.100" }}
    >
      <Image src={event.performers[0].image} />
      <CardBody>
        <Stack spacing="2">
          <Box p="4" mb="4" display="flex" alignItems="center">
            <Box flex="1">
              <Heading as="h2" size="md">
                <Link to={`/events/${event.id}`}>{event.short_title}</Link>
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {event.venue.name_v2}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {event.venue.display_location}
              </Text>
            </Box>
            <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
          </Box>
        </Stack>
      </CardBody>
    </LinkBox>
  );
};

export default Events;
