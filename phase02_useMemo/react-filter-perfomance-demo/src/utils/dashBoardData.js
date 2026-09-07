export const playgroundScreens = [
  {
    title: "Naive Effect Filter",
    route: "/naive-effect-filter",
    description:
      "Stores derived state in React state and updates it inside useEffect, causing an extra render cycle.",
  },
  {
    title: "Naive Filter",
    route: "/naive",
    description:
      "Calculates filtered results synchronously during every render.",
  },
  {
    title: "useMemo",
    route: "/usememo",
    description: "Cache expensive filtering computations.",
  },
  {
    title: "React.memo",
    route: "/reactmemo",
    description: "Prevent unnecessary child renders.",
  },
  {
    title: "useCallback",
    route: "/usecallback",
    description: "Memoize callback references.",
  },
  {
    title: "Debounce",
    route: "/debounce",
    description: "Reduce filtering frequency while typing.",
  },
  {
    title: "Virtualization",
    route: "/virtualized",
    description: "Render only visible list items.",
  },
  {
    title: "Optimized",
    route: "/optimized",
    description: "Combine all optimization techniques.",
  },
];
