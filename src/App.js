import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { Nav } from "./components/Nav";
import { Front } from "./containers/Front";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Front />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/record",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Record />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/data/:page",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Data />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/event/add",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Event />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/indicator/add",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Indicator />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/event/add",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Event />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/record/add",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Record />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/record/:id",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Record />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/analysis",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Analysis />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/analysis/records",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <AnalysisMenu />
          <RecordsEmbed />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/analysis/events",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <AnalysisMenu />
          <EventsEmbed />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/analysis/sectors",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <AnalysisMenu />
          <SectorsEmbed />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/analysis/hazards",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <AnalysisMenu />
          <HazardsEmbed />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/dashboard/:id",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Analysis />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/about/:page",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <About />
          <GlobalFooter />
        </>
      ),
    },
    {
      path: "/settings/:page",
      element: (
        <>
          <GlobalHeader />
          <Nav />
          <Settings />
          <GlobalFooter />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
