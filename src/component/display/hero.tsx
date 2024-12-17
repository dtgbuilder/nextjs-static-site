import {Stack, Box, Typography} from "@mui/material";

export const Hero = () => {
    return (
      <Box
          sx={{
              minHeight: "200px",
              border: "red 2px solid",
              padding: "24px",
              margin: "8px"
          }}
      >
          <Stack
              alignItems="center"
          >
              <Typography
                sx={{
                    backgroundColor: "pink"
                }}
              >
                  This is the hero
              </Typography>
          </Stack>
      </Box>
    );
}