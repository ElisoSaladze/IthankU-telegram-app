import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import { ControlledTextField } from 'src/components/form/controlled/controlled-text-field';
import PfpComponent from 'src/components/pfp-component';
import VisibilityStatus from 'src/components/visibility-status';
import { useCreateGroupContext } from 'src/providers/create-group-provider';
import { paths } from '~/app/routes';

export const NewGroupDetails = () => {
  const navigate = useNavigate();
  const { control, setValue, watch, handleSubmit } = useCreateGroupContext();

  const coverFile = watch('cover');
  const coverUrl = coverFile ? URL.createObjectURL(coverFile) : '';

  return (
    <Stack width={1} textAlign="start" alignItems="center" justifyContent="center">
      <Box
        position="absolute"
        top={0}
        left={0}
        width={1}
        zIndex={1}
        bgcolor="#222222"
        height={165}
        sx={{
          backgroundImage: `url(${coverUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <IconButton
          color="primary"
          component="label"
          sx={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            backgroundColor: 'white',
            boxShadow: '0px 5px 7.8px 0px #00000040',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => {
              const file = event.target.files![0];
              if (file) {
                setValue('cover', file);
              }
            }}
          />
          <CameraAltIcon fontSize="small" sx={{ color: 'black' }} />
        </IconButton>
      </Box>
      <Box zIndex={2} mt={12}>
        <PfpComponent onChange={(file) => setValue('image', file)} isEditable />
      </Box>

      <Stack mt={1} gap={1} width={1}>
        <Typography fontSize={16} color="text.secondary" fontWeight={500}>
          Group Name
        </Typography>
        <ControlledTextField required fullWidth control={control} name="name" sx={{ fontWeight: 600 }} />

        <Typography fontSize={16} color="text.secondary" fontWeight={500} mt={2}>
          Description
        </Typography>
        <ControlledTextArea required fullWidth rows={4} multiline control={control} name="description" />

        <Typography fontSize={16} color="text.secondary" fontWeight={500} mt={2}>
          Group Status
        </Typography>
        <VisibilityStatus
          name="privacy"
          control={control}
          labels={['Anyone can join this group', 'Only visible to those you share with']}
          isGroupVisibility
        />
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          mt: 3,
          position: 'sticky',
          bottom: 10,
        }}
        onClick={handleSubmit(() => {
          navigate(paths.createGroupInterests);
        })}
      >
        Next
      </Button>
    </Stack>
  );
};
