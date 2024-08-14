import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaSelect from 'src/components/appreciate-components/select-area';
import HashtagSelect from 'src/components/appreciate-components/select-hashtag';

function AdvancedSelectionPage() {
  const [area, setArea] = useState<string | undefined>('');
  const [hashtag, setHashtag] = useState<string | undefined>();
  const navigate = useNavigate();



  const handleCreateQRCode = () => {
    navigate('/get-appreciate', { state: { area, hashtag, isAdvanced: true } });
  };

  return (
    <Box sx={{ padding: 3, textAlign: 'center', marginTop: 5 }}>
      <AreaSelect onSelect={(area) => setArea(area?.en)} />
      <HashtagSelect onSelect={(hashtag)=> setHashtag(hashtag?.hashtag )}></HashtagSelect>
      <Button variant="contained" color="success" onClick={handleCreateQRCode}>
        Create QR Code
      </Button>
    </Box>
  );
}

export default AdvancedSelectionPage;
