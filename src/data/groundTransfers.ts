export interface GroundTransferPoint {
  name: string;
  subtitle: string;
  detail?: string;
  time?: string;
  coordinates: { lat: number; lon: number };
}

export interface GroundTransfer {
  id: string;
  date: string;
  label: string;
  from: GroundTransferPoint;
  to: GroundTransferPoint;
  /** Fallback when routing API is unavailable */
  driveTimeEstimate: string;
  notes?: string;
}

const NBO = { lat: -1.3192, lon: 36.9278 };
const HEMINGWAYS = { lat: -1.3324, lon: 36.7117 };
const WILSON = { lat: -1.3217, lon: 36.8148 };

export const NBO_TO_HEMINGWAYS: GroundTransfer = {
  id: "nbo-hemingways",
  date: "2026-06-05",
  label: "NBO → Hemingways Hotel",
  from: {
    name: "NBO",
    subtitle: "Nairobi",
    detail: "Jomo Kenyatta International · Terminal 1E",
    time: "2:30 PM",
    coordinates: NBO,
  },
  to: {
    name: "Hemingways Hotel",
    subtitle: "Karen, Nairobi",
    detail: "Check-in Fri Jun 5",
    coordinates: HEMINGWAYS,
  },
  driveTimeEstimate: "45–75 min",
  notes: "Private transfer or hotel pickup — allow extra time for customs and Nairobi traffic.",
};

export const HEMINGWAYS_TO_WILSON: GroundTransfer = {
  id: "hemingways-wilson",
  date: "2026-06-06",
  label: "Hemingways Hotel → Wilson Airport",
  from: {
    name: "Hemingways Hotel",
    subtitle: "Karen, Nairobi",
    detail: "Depart for domestic connection",
    time: "Morning transfer",
    coordinates: HEMINGWAYS,
  },
  to: {
    name: "WIL",
    subtitle: "Wilson Airport, Nairobi",
    detail: "Safari charter departure point",
    coordinates: WILSON,
  },
  driveTimeEstimate: "20–35 min",
  notes: "Short private road transfer to Wilson Airport for the onward safari charter.",
};
