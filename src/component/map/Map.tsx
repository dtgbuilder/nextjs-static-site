"use client";

import Canvas from "./canvas/Canvas";
import { use } from "react";
import {MapContext} from "@/component/map/MapContextProvider";

export function Map() {

    const {
        mapData,
        setMapData
    } = use(MapContext);

    if (mapData === undefined) {
        console.error("mapData is undefined");
        return null;
    }

  return (
    <div className="dashboard">
      <nav
        style={{
          position: "fixed",
          zIndex: "999",
          top: "10%",
          right: "0",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {["create", "select", "delete"].map((tool: string) => {
            return (
              <li key={tool}>
                <button
                  type="button"
                  style={
                    mapData.tool === tool
                      ? { backgroundColor: "#ccc", color: "#121212" }
                      : {}
                  }
                  onClick={(e: any) => {
                    e.preventDefault();
                    mapData.tool = tool;
                    setMapData({ ...mapData, mapData });
                  }}
                >
                  {tool}
                </button>
              </li>
            );
          })}
        </ul>
        {mapData.tool === "create" ? (
          <ul style={{ display: "flex", gap: "10px" }}>
            {["wall", "zombie"].map((type: string) => {
              return (
                <li key={type}>
                  <button
                    type="button"
                    style={
                      mapData.entities.template.type === type
                        ? { backgroundColor: "#ccc", color: "#121212" }
                        : {}
                    }
                    onClick={(e: any) => {
                      e.preventDefault();
                      mapData.entities.template.type = type;
                      setMapData({ ...mapData, mapData });
                    }}
                  >
                    {type}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </nav>
      <Canvas
        selectedMap={props.selectedMap}
        mapData={mapData}
        setMapData={setMapData}
      />
    </div>
  );
}
