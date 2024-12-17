import {Box, Stack} from "@mui/material";
import {Hero} from "@/component/display/Hero"
import {Intro} from "@/component/display/Intro"

export default function Page() {
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
