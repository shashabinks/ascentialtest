import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  List,
  ListItem,
  Flex,
  Box,
  Link,
  Text,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useFavoritesContext } from "../context/FavoritesContext";

const FavoriteDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    eventFavorites,
    venueFavorites,
    updateEventFavorites,
    updateVenueFavorites,
  } = useFavoritesContext();

  const removeFavoriteEvent = (id: string) => {
    const updatedFavorites = eventFavorites.filter((event) => event.id !== id);
    updateEventFavorites(updatedFavorites);
  };

  const removeFavoriteVenue = (id: number) => {
    const updatedFavorites = venueFavorites.filter((venue) => venue.id !== id);
    updateVenueFavorites(updatedFavorites);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favorites</DrawerHeader>
          <DrawerBody>
            <Box mb="4">
              <Text fontSize="lg" fontWeight="bold">
                Events
              </Text>
              <Divider mb="2" />
              <List spacing={3}>
                {eventFavorites.length === 0 ? (
                  <Text color="gray.500">No favorite events.</Text>
                ) : (
                  eventFavorites.map((event) => (
                    <ListItem key={event.id}>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Box>
                          <Link
                            as={RouterLink}
                            to={`/events/${event.id}`}
                            fontWeight="bold"
                          >
                            {event.short_title}
                          </Link>
                          <Text fontSize="sm" color="gray.600">
                            {event.venue.name_v2}
                          </Text>
                        </Box>
                        <Flex alignItems="center">
                          <IconButton
                            aria-label="Delete event"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={() => removeFavoriteEvent(event.id)}
                          />
                        </Flex>
                      </Flex>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
            <Box mb="4">
              <Text fontSize="lg" fontWeight="bold">
                Venues
              </Text>
              <Divider mb="2" />
              <List spacing={3}>
                {venueFavorites.length === 0 ? (
                  <Text color="gray.500">No favorite venues.</Text>
                ) : (
                  venueFavorites.map((venue) => (
                    <ListItem key={venue.id}>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Box>
                          <Link
                            as={RouterLink}
                            to={`/venues/${venue.id}`}
                            fontWeight="bold"
                          >
                            {venue.name_v2}
                          </Link>
                          <Text fontSize="sm" color="gray.600">
                            {venue.display_location}
                          </Text>
                        </Box>
                        <Flex alignItems="center">
                          <IconButton
                            aria-label="Delete venue"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={() => removeFavoriteVenue(venue.id)}
                          />
                        </Flex>
                      </Flex>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default FavoriteDrawer;
