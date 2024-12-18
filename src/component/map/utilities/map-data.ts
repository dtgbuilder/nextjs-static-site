
export interface MapData {
  id: string;
  name: string;
  creator: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  width: number;
  height: number;
  entities: {
    template: {
      type: string;
    };
    [key: string]: {
      type: string;
    };
  };
  x: number;
  y: number;
  scale: number;
  selected: { x: number, y: number };
  tool: string;
}

export const defaultMapData: MapData = {
  id: "",
  name: "map_name",
  creator: "",
  player1: "",
  player2: "",
  player3: "",
  player4: "",
  width: 500,
  height: 500,
  entities: {template: {
    type: "wall", // // "wall" or "zombie"
}},
  x: 0,
  y: 0,
  scale: 30,
  selected: { x: 0, y: 0 },
  tool: "select",
};


