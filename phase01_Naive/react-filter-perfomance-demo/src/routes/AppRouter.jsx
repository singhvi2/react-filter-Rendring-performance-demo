import { createBrowserRouter } from "react-router-dom";

import Body from "../components/layout/Body.jsx";

import Home from "../pages/Home.jsx";
import NaiveFilter from "../pages/NaiveFilter";
import UseMemoFilter from "../pages/UseMemoFilter";
import ReactMemoFilter from "../pages/ReactMemoFilter";
import UseCallbackFilter from "../pages/UseCallbackFilter";
import DebounceFilter from "../pages/DebounceFilter";
import VirtualizedFilter from "../pages/VirtualizedFilter";
import OptimizedFilter from "../pages/OptimizedFilter";
import NaiveEffectDerivedFilter from "../pages/NaiveEffectDerivedFilter.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/naive-effect-filter",
        element: <NaiveEffectDerivedFilter />,
      },
      {
        path: "/naive",
        element: <NaiveFilter />,
      },
      {
        path: "/usememo",
        element: <UseMemoFilter />,
      },
      {
        path: "/reactmemo",
        element: <ReactMemoFilter />,
      },
      {
        path: "/usecallback",
        element: <UseCallbackFilter />,
      },
      {
        path: "/debounce",
        element: <DebounceFilter />,
      },
      {
        path: "/virtualized",
        element: <VirtualizedFilter />,
      },
      {
        path: "/optimized",
        element: <OptimizedFilter />,
      },
      {
        path: "/test",
        element: <NaiveFilter />,
      },
    ],
  },
]);

/**Filtering Experiments
│
├── NaiveFilter
│      └── filter during render
│
├── NaiveEffectFilter
│      └── filter inside useEffect + setState
│
├── UseMemoFilter
│      └── memoize filtering calculation
│
├── ReactMemoFilter
│      └── memoize child component
│
├── UseCallbackFilter
│      └── stabilize function references
│
├── DebounceFilter
│      └── delay filtering
│
├── VirtualizedFilter
│      └── reduce DOM nodes
│
└── OptimizedFilter
       └── combine techniques */
