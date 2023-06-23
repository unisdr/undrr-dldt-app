import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { Nav } from "./components/Nav";
import { Front } from "./containers/Front-gi";
import { GlobalFront } from "./containers/GlobalFront/";
import { Data } from "./containers/Data";
import { Record } from "./containers/Data/components/Record";
import { Event } from "./containers/Data/components/Event";
import { Indicator } from "./containers/Data/components/Indicator";
import { Analysis } from "./containers/Analysis";
import { AnalysisMenu } from "./containers/Analysis/components/AnalysisMenu";
import { RecordsEmbed } from "./containers/Analysis/components/RecordsEmbed";
import { EventsEmbed } from "./containers/Analysis/components/EventsEmbed";
import { SectorsEmbed } from "./containers/Analysis/components/SectorsEmbed";
import { HazardsEmbed } from "./containers/Analysis/components/HazardsEmbed";
import { Settings } from "./containers/Settings";
import { About } from "./containers/About";
import { GlobalHeader } from "./components/Header";
import { GlobalFooter } from "./components/Footer";

function App() {
  if (!window._env_) {
    window._env_ = {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN,
    };
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <Front />
        </>
      ),
    },
    {
      path: "/record",
      element: (
        <>
          <Nav />
          <Record />
        </>
      ),
    },
    {
      path: "/data/:page",
      element: (
        <>
          <Nav />
          <Data />
        </>
      ),
    },
    {
      path: "/event/add",
      element: (
        <>
          <Nav />
          <Event />
        </>
      ),
    },
    {
      path: "/indicator/add",
      element: (
        <>
          <Nav />
          <Indicator />
        </>
      ),
    },
    {
      path: "/event/add",
      element: (
        <>
          <Nav />
          <Event />
        </>
      ),
    },
    {
      path: "/record/add",
      element: (
        <>
          <Nav />
          <Record />
        </>
      ),
    },
    {
      path: "/record/:id",
      element: (
        <>
          <Nav />
          <Record />
        </>
      ),
    },
    {
      path: "/analysis",
      element: (
        <>
          <Nav />
          <Analysis />
        </>
      ),
    },
    {
      path: "/analysis/records",
      element: (
        <>
          <Nav />
          <AnalysisMenu />
          <RecordsEmbed />
        </>
      ),
    },
    {
      path: "/analysis/events",
      element: (
        <>
          <Nav />
          <AnalysisMenu />
          <EventsEmbed />
        </>
      ),
    },
    {
      path: "/analysis/sectors",
      element: (
        <>
          <Nav />
          <AnalysisMenu />
          <SectorsEmbed />
        </>
      ),
    },
    {
      path: "/analysis/hazards",
      element: (
        <>
          <Nav />
          <AnalysisMenu />
          <HazardsEmbed />
        </>
      ),
    },
    {
      path: "/dashboard/:id",
      element: (
        <>
          <Nav />
          <Analysis />
        </>
      ),
    },
    {
      path: "/about/:page",
      element: (
        <>
          <Nav />
          <About />
        </>
      ),
    },
    {
      path: "/settings/:page",
      element: (
        <>
          <Nav />
          <Settings />
        </>
      ),
    },
    {
      path: "/global-front",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <GlobalFront />
          <GlobalFooter />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
