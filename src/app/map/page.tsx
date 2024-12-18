"use client";
import {Box} from "@mui/material";
import {MapWrapper} from "@/component/map/Map";
import {MapContextProvider} from "@/component/map/MapContextProvider";

export default function Page() {
    return (
            <Box
                sx={{
                    backgroundColor: "#0a0a0a"
                }}
            >
                <MapContextProvider>
                    <MapWrapper/>
                </MapContextProvider>
            </Box>
    );
}
