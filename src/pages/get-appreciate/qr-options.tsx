import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetAppreciateUser } from '~/api/appreciate';
import { paths } from '~/app/routes';
import { AreaSelect, HashtagSelect, QRCodeViewer } from '~/components/appreciate-components';
import { AppHeader } from '~/components/header';
import { useBoolean } from '~/lib/hooks';

const AdvancedSelectionPage = () => {
  const [shade, setShade] = useState<string | undefined>();

  const { control, setValue, watch } = useForm<GetAppreciateUser>({});

  const shadeId = watch('shadeId');
  const hashtag = watch('hashtag');

  const viewQr = useBoolean();

  return (
    <>
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

          <Button size="large" variant="contained" color="primary" onClick={viewQr.setTrue}>
            Create QR Code
          </Button>
        </Stack>
      </Stack>

      {viewQr.isTrue && (
        <QRCodeViewer hashtag={hashtag} shadeId={shadeId} shade={shade} onClose={viewQr.setFalse} backButton />
      )}
    </>
  );
};

export default AdvancedSelectionPage;
