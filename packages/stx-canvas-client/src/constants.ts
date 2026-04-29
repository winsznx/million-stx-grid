/** Maximum number of events to fetch per API page. */
export const HIRO_EVENTS_PAGE_SIZE = 50 as const;

/** Grid dimensions defined by the smart contract. */
export const CLIENT_GRID_SIZE = 100 as const;

/** Total addressable pixels on the grid. */
export const TOTAL_GRID_CELLS = CLIENT_GRID_SIZE * CLIENT_GRID_SIZE;
