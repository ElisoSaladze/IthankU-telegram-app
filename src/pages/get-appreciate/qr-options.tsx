import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "src/app/routes";
import BackButtonAppBar from "src/components/appbar";
import AreaSelect from "src/components/appreciate-components/select-area";
import HashtagSelect from "src/components/appreciate-components/select-hashtag";

function AdvancedSelectionPage() {
  const [area, setArea] = useState<string | undefined>("");
  const [hashtag, setHashtag] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleCreateQRCode = () => {
    navigate(paths.getAppreciate, {
      state: { area, hashtag, isAdvanced: true },
    });
  };

  return (
    <Stack
      paddingTop={10}
      paddingBottom={2}
      justifyContent={"space-between"}
      height={"100vh"}
      marginX={2}
    >
      <BackButtonAppBar pageName="" />
      <Stack gap={2}>
        <AreaSelect onSelect={(area) => setArea(area?.en)} />
        <HashtagSelect onSelect={(hashtag) => setHashtag(hashtag?.hashtag)} />
      </Stack>

      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleCreateQRCode}
      >
        Create QR Code
      </Button>
    </Stack>
  );
}

export default AdvancedSelectionPage;
