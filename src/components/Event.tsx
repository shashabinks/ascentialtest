import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Spinner,
  Button,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import Breadcrumbs from "./Breadcrumbs";
import Error from "./Error";
import { useSeatGeek } from "../utils/useSeatGeek";
import { formatDateTime } from "../utils/formatDateTime";
import { type Venue } from "./Events";
import FavoriteButton from "./FavoriteButton";
import { useFavoritesContext } from "../context/FavoritesContext";

interface EventInfoProps {
  event: {
    short_title: string;
    datetime_utc: Date;
    venue: Venue;
    url: string;
    id: string;
    isFavorite: boolean;
    toggleFavorite: () => void;
  };
}

const Event: React.FC = () => {
  const { eventId } = useParams();
  const { data: event, error } = useSeatGeek(`events/${eventId}`);

  // add in context hook
  const { eventFavorites, updateEventFavorites } = useFavoritesContext();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!event) return;
    const isFav = eventFavorites.some(
      (favEvent: any) => favEvent.id === event.id
    );
    setIsFavorite(isFav);
  }, [event, eventFavorites]);

  // update the status of an event
  const toggleFavorite = () => {
    const eventIndex = eventFavorites.findIndex(
      (favEvent: any) => favEvent.id === event.id
    );

    if (eventIndex !== -1) {
      const updatedFavorites = [...eventFavorites];
      updatedFavorites.splice(eventIndex, 1);
      updateEventFavorites(updatedFavorites);
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...eventFavorites, event];
      updateEventFavorites(updatedFavorites);
      setIsFavorite(true);
    }
  };

  if (error) return <Error />;

  if (!event) {
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
          { label: "Events", to: "/events" },
          { label: event.short_title },
        ]}
      />
      <Flex bgColor="gray.200" p={[4, 6]}>
        <Heading>{event.short_title}</Heading>
      </Flex>
      <EventInfo
        event={{
          ...event,
          isFavorite,
          toggleFavorite,
        }}
      />
    </>
  );
};

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <Stack spacing="6" m="6">
      <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" borderRadius="md" p="4">
        <Stat>
          <StatLabel display="flex">
            <Box as="span">Venue</Box>
          </StatLabel>
          <StatNumber fontSize="xl">{event.venue.name_v2}</StatNumber>
          <StatHelpText>{event.venue.display_location}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex">
            <Box as="span">Date</Box>
          </StatLabel>
          <Tooltip label={formatDateTime(event.datetime_utc, userTimezone)}>
            <StatNumber fontSize="xl">
              {formatDateTime(event.datetime_utc, event.venue.timezone)}
            </StatNumber>
          </Tooltip>
        </Stat>
      </SimpleGrid>
      <Flex justifyContent="space-between" alignItems="center">
        <Button as={"a"} href={event.url} minWidth="0">
          Buy Tickets
        </Button>
        <FavoriteButton
          isFavorite={event.isFavorite}
          onClick={event.toggleFavorite}
        />
      </Flex>
    </Stack>
  );
};

export default Event;
