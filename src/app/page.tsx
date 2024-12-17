import {Box, Stack} from "@mui/material";
import {Hero} from "@/component/display/hero"
import {Intro} from "@/component/display/intro"

export default function Home() {
  return (
    <Box
        sx={{
            border: "black 10px solid"
        }}
    >
        This is the home page
        <Stack
            gap="24px"
        >
            <Hero/>
            <Intro/>
        </Stack>
    </Box>
  );
}
