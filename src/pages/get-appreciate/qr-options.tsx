import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AreaSelect from 'src/components/appreciate-components/select-area';
import HashtagSelect from 'src/components/appreciate-components/select-hashtag';
import { GetAppreciateUser } from '~/api/appreciate';
import { paths } from '~/app/routes';
import { AppHeader } from '~/components/header';

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
    <Stack justifyContent="stretch" height={1}>
      <AppHeader backPath={paths.home} />
      <Stack justifyContent="space-between" gap={2} flex={1} p={3} pt={0}>
        <Stack gap={2}>
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
    </Stack>
  );
}

export default AdvancedSelectionPage;
