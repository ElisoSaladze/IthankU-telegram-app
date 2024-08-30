import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BackButtonAppBar from 'src/components/appbar';
import AreaSelect from 'src/components/appreciate-components/select-area';
import HashtagSelect from 'src/components/appreciate-components/select-hashtag';
import { paths } from '~/app/routes';

type AppreciateDetails = {
  area?: string;
  hashtag?: string;
};

function AdvancedSelectionPage() {
  const navigate = useNavigate();
  const { control, setValue, watch } = useForm<AppreciateDetails>({});

  const handleCreateQRCode = () => {
    const area = watch('area');
    const hashtag = watch('hashtag');
    navigate(paths.getAppreciate, {
      state: { area, hashtag, isAdvanced: true },
    });
  };

  return (
    <Stack pb={2} justifyContent="space-between" height="100vh" mx={2}>
      <Stack gap={2}>
        <BackButtonAppBar pageName="" />
        <AreaSelect onSelect={(area) => setValue('area', area?.en)} />
        <HashtagSelect
          control={control}
          onSelect={(hashtag) => (hashtag ? setValue('hashtag', hashtag.hashtag) : setValue('hashtag', ''))}
        />
      </Stack>

      <Button size="large" variant="contained" color="primary" onClick={handleCreateQRCode}>
        Create QR Code
      </Button>
    </Stack>
  );
}

export default AdvancedSelectionPage;
