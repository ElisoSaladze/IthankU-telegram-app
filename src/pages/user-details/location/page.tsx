/* eslint-disable no-constant-binary-expression */
import { Box, Stack } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useSearchParams } from "react-router-dom";
import BackButtonAppBar from "src/components/appbar";
import MapSvg from "src/assets/icons/map.svg";

export const UserLocationPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDsf_MC31bfKI8JwasA5WebPrCl2TDqoHc",
  });

  const [searchparams] = useSearchParams();

  const lat = Number(searchparams.get("lat")) ?? 0;
  const lng = Number(searchparams.get("lng")) ?? 0;

  const userLocation = { lat, lng };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Stack pt={3} width={1} height="100vh" overflow="hidden" border={2}>
      <Box px={3}>
        <BackButtonAppBar pageName="iThankU!" />
      </Box>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        center={userLocation}
        zoom={17}
      >
        <img
          src={MapSvg}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </GoogleMap>
    </Stack>
  );
};
