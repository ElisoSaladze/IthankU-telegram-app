import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BackButtonAppBar from 'src/components/appbar';
import AreaSelect from 'src/components/appreciate-components/select-area';
import HashtagSelect from 'src/components/appreciate-components/select-hashtag';
import { GetAppreciateUser } from '~/api/appreciate';
import { paths } from '~/app/routes';

function AdvancedSelectionPage() {
  const [shade, setShade] = useState<string | undefined>();
  const navigate = useNavigate();
  const { control, setValue, watch } = useForm<GetAppreciateUser>({});

  const handleCreateQRCode = () => {
    const shadeId = watch('shadeId');
    const hashtag = watch('hashtag');

    navigate(paths.getAppreciate, {
      state: { shadeId, shade, hashtag, isAdvanced: true },
    });
  };

  return (
    <Stack pb={10} justifyContent="space-between" height="100vh" mx={2}>
      <Stack gap={2}>
        <BackButtonAppBar pageName="" />
        <AreaSelect
          onSelect={(area) => {
            setShade(area?.en);
            setValue('shadeId', area?.id);
          }}
        />
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
