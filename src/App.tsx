import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Venues from "./components/Venues";
import Venue from "./components/Venue";
import Events from "./components/Events";
import Event from "./components/Event";
import FavoriteDrawer from "./components/FavoritesDrawer";
import { Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { FavoritesProvider } from "./context/FavoritesContext";

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Router>
      <FavoritesProvider>
        <Nav toggleDrawer={toggleDrawer} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:venueId" element={<Venue />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<Event />} />
        </Routes>
        <FavoriteDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />{" "}
      </FavoritesProvider>
    </Router>
  );
};

const Nav: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => (
  <Flex as="nav" bg="gray.700" color="white" padding="24px">
    <Heading size="md">Ascential Front End Challenge</Heading>
    <Spacer />
    <IconButton
      aria-label="Open Favorites Drawer"
      icon={<FaBars />}
      onClick={toggleDrawer}
    />
  </Flex>
);

export default App;
