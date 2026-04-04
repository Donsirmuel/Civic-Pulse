// Nigerian states, LGAs, and wards structure
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Ward {
  id: string;
  name: string;
  coordinates?: Coordinates;
}

export interface LGA {
  id: string;
  name: string;
  coordinates: Coordinates; // Center point of LGA
  wards: Ward[];
}

export interface State {
  id: string;
  name: string;
  coordinates: Coordinates; // Center point of state
  lgas: LGA[];
}

// Sample data structure - you'll expand this with complete Nigerian data
export const nigeriaLocationData: State[] = [
  {
    id: 'lagos',
    name: 'Lagos State',
    coordinates: { lat: 6.5244, lng: 3.3792 },
    lgas: [
      {
        id: 'ikeja',
        name: 'Ikeja',
        coordinates: { lat: 6.5933, lng: 3.3426 },
        wards: [
          { id: 'ikeja-ward-1', name: 'Ward 1 - GRA', coordinates: { lat: 6.5952, lng: 3.3523 } },
          { id: 'ikeja-ward-2', name: 'Ward 2 - Allen', coordinates: { lat: 6.5911, lng: 3.3456 } },
          { id: 'ikeja-ward-3', name: 'Ward 3 - Alausa', coordinates: { lat: 6.5895, lng: 3.3389 } },
          { id: 'ikeja-ward-4', name: 'Ward 4 - Opebi', coordinates: { lat: 6.5872, lng: 3.3321 } },
          { id: 'ikeja-ward-5', name: 'Ward 5 - Agidingbi', coordinates: { lat: 6.5933, lng: 3.3321 } },
        ],
      },
      {
        id: 'surulere',
        name: 'Surulere',
        coordinates: { lat: 6.4833, lng: 3.3672 },
        wards: [
          { id: 'surulere-ward-1', name: 'Ward 1 - Ijeshatedo', coordinates: { lat: 6.4856, lng: 3.3745 } },
          { id: 'surulere-ward-2', name: 'Ward 2 - Adeniran Ogunsanya', coordinates: { lat: 6.4833, lng: 3.3698 } },
          { id: 'surulere-ward-3', name: 'Ward 3 - Ojuelegba', coordinates: { lat: 6.4811, lng: 3.3646 } },
          { id: 'surulere-ward-4', name: 'Ward 4 - Itire', coordinates: { lat: 6.4810, lng: 3.3599 } },
        ],
      },
      {
        id: 'eti-osa',
        name: 'Eti-Osa',
        coordinates: { lat: 6.4368, lng: 3.4476 },
        wards: [
          { id: 'eti-osa-ward-1', name: 'Ward 1 - Victoria Island', coordinates: { lat: 6.4298, lng: 3.4241 } },
          { id: 'eti-osa-ward-2', name: 'Ward 2 - Lekki Phase 1', coordinates: { lat: 6.4347, lng: 3.4571 } },
          { id: 'eti-osa-ward-3', name: 'Ward 3 - Ajah', coordinates: { lat: 6.4391, lng: 3.4668 } },
          { id: 'eti-osa-ward-4', name: 'Ward 4 - Ikoyi', coordinates: { lat: 6.4308, lng: 3.4226 } },
        ],
      },
      {
        id: 'alimosho',
        name: 'Alimosho',
        coordinates: { lat: 6.6203, lng: 3.2247 },
        wards: [
          { id: 'alimosho-ward-1', name: 'Ward 1 - Egbeda', coordinates: { lat: 6.6241, lng: 3.2312 } },
          { id: 'alimosho-ward-2', name: 'Ward 2 - Idimu', coordinates: { lat: 6.6185, lng: 3.2391 } },
          { id: 'alimosho-ward-3', name: 'Ward 3 - Ikotun', coordinates: { lat: 6.6257, lng: 3.2145 } },
          { id: 'alimosho-ward-4', name: 'Ward 4 - Akowonjo', coordinates: { lat: 6.6164, lng: 3.2103 } },
        ],
      },
    ],
  },
  {
    id: 'abuja',
    name: 'FCT Abuja',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    lgas: [
      {
        id: 'abuja-municipal',
        name: 'Abuja Municipal Area Council',
        coordinates: { lat: 9.0789, lng: 7.3934 },
        wards: [
          { id: 'amac-ward-1', name: 'Ward 1 - Garki', coordinates: { lat: 9.0752, lng: 7.4147 } },
          { id: 'amac-ward-2', name: 'Ward 2 - Wuse', coordinates: { lat: 9.0873, lng: 7.3923 } },
          { id: 'amac-ward-3', name: 'Ward 3 - Maitama', coordinates: { lat: 9.0921, lng: 7.3851 } },
          { id: 'amac-ward-4', name: 'Ward 4 - Asokoro', coordinates: { lat: 9.0698, lng: 7.3721 } },
        ],
      },
      {
        id: 'gwagwalada',
        name: 'Gwagwalada',
        coordinates: { lat: 8.9473, lng: 7.0896 },
        wards: [
          { id: 'gwagwalada-ward-1', name: 'Ward 1 - Central', coordinates: { lat: 8.9512, lng: 7.0956 } },
          { id: 'gwagwalada-ward-2', name: 'Ward 2 - Kutunku', coordinates: { lat: 8.9434, lng: 7.0847 } },
          { id: 'gwagwalada-ward-3', name: 'Ward 3 - Zuba', coordinates: { lat: 8.9373, lng: 7.0836 } },
        ],
      },
    ],
  },
  {
    id: 'kano',
    name: 'Kano State',
    coordinates: { lat: 12.0022, lng: 8.6753 },
    lgas: [
      {
        id: 'kano-municipal',
        name: 'Kano Municipal',
        coordinates: { lat: 12.0022, lng: 8.6753 },
        wards: [
          { id: 'kano-mun-ward-1', name: 'Ward 1 - Kofar Mata', coordinates: { lat: 12.0089, lng: 8.6821 } },
          { id: 'kano-mun-ward-2', name: 'Ward 2 - Sabon Gari', coordinates: { lat: 11.9979, lng: 8.6897 } },
          { id: 'kano-mun-ward-3', name: 'Ward 3 - Fagge', coordinates: { lat: 11.9956, lng: 8.6609 } },
        ],
      },
      {
        id: 'nassarawa',
        name: 'Nassarawa',
        coordinates: { lat: 12.1203, lng: 8.5342 },
        wards: [
          { id: 'nassarawa-ward-1', name: 'Ward 1 - Bompai', coordinates: { lat: 12.1256, lng: 8.5423 } },
          { id: 'nassarawa-ward-2', name: 'Ward 2 - Zoo Road', coordinates: { lat: 12.1149, lng: 8.5261 } },
        ],
      },
    ],
  },
  {
    id: 'rivers',
    name: 'Rivers State',
    coordinates: { lat: 4.7957, lng: 7.0099 },
    lgas: [
      {
        id: 'port-harcourt',
        name: 'Port Harcourt',
        coordinates: { lat: 4.7957, lng: 7.0099 },
        wards: [
          { id: 'ph-ward-1', name: 'Ward 1 - GRA Phase 1', coordinates: { lat: 4.8021, lng: 7.0156 } },
          { id: 'ph-ward-2', name: 'Ward 2 - Trans Amadi', coordinates: { lat: 4.7942, lng: 7.0234 } },
          { id: 'ph-ward-3', name: 'Ward 3 - Diobu', coordinates: { lat: 4.7893, lng: 6.9964 } },
        ],
      },
      {
        id: 'obio-akpor',
        name: 'Obio/Akpor',
        coordinates: { lat: 4.8512, lng: 6.9234 },
        wards: [
          { id: 'obio-ward-1', name: 'Ward 1 - Rumuodomaya', coordinates: { lat: 4.8567, lng: 6.9312 } },
          { id: 'obio-ward-2', name: 'Ward 2 - Ozuoba', coordinates: { lat: 4.8457, lng: 6.9156 } },
        ],
      },
    ],
  },
];

// Utility functions
export const getStateById = (stateId: string): State | undefined => {
  return nigeriaLocationData.find((state) => state.id === stateId);
};

export const getLGAById = (stateId: string, lgaId: string): LGA | undefined => {
  const state = getStateById(stateId);
  return state?.lgas.find((lga) => lga.id === lgaId);
};

export const getWardById = (stateId: string, lgaId: string, wardId: string): Ward | undefined => {
  const lga = getLGAById(stateId, lgaId);
  return lga?.wards.find((ward) => ward.id === wardId);
};

export const getLocationString = (location: { ward: string; lga: string; state: string }): string => {
  const state = getStateById(location.state);
  const lga = getLGAById(location.state, location.lga);
  const ward = getWardById(location.state, location.lga, location.ward);

  if (ward && lga && state) {
    return `${ward.name}, ${lga.name}, ${state.name}`;
  }
  if (lga && state) {
    return `${lga.name}, ${state.name}`;
  }
  if (state) {
    return state.name;
  }

  const rawParts = [location.ward, location.lga, location.state].filter(
    (value) => value && value.trim().length > 0,
  );

  return rawParts.length > 0 ? rawParts.join(', ') : 'Location pending';
};

export const getLocationCoordinates = (location?: { ward?: string; lga?: string; state?: string }): Coordinates | null => {
  if (!location?.state) return null;

  if (location.ward && location.lga) {
    const ward = getWardById(location.state, location.lga, location.ward);
    if (ward?.coordinates) return ward.coordinates;
  }

  if (location.lga) {
    const lga = getLGAById(location.state, location.lga);
    if (lga?.coordinates) return lga.coordinates;
  }

  const state = getStateById(location.state);
  return state?.coordinates ?? null;
};
