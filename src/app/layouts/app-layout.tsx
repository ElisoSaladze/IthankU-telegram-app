import { BottomNavigation, BottomNavigationAction, Box, IconButton, Paper, styled, useTheme } from '@mui/material';
import nav from 'src/assets/images/nav.png';
import groupsIcon from 'src/assets/icons/groups.svg';
import homeIcon from 'src/assets/icons/home.svg';
import mapIcon from 'src/assets/icons/map.svg';
import moreIcon from 'src/assets/icons/more.svg';
import qrCodeIcon from 'src/assets/icons/qr.svg';
import groupsIconSelected from 'src/assets/icons/selectedGroups.svg';
import homeIconSelected from 'src/assets/icons/selectedHome.svg';
import mapIconSelected from 'src/assets/icons/selectedMap.svg';
import moreIconSelected from 'src/assets/icons/selectedMore.svg';
import { ReactNode, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'src/components/loader';
import { paths } from '~/app/routes';
import { GlobalLoadingIndicator } from '~/components/global-loading-indicator';
import { AppreciateComponent } from '~/components/appreciate-components';
import { useBoolean } from '~/lib/hooks';

const useActiveIndex = () => {
  const location = useLocation();

  const activePath = location.pathname.split('/')[1]!; // TODO

  const paths = ['home', 'groups', '', 'map', 'more'];

  const activeIndex = paths.indexOf(activePath);

  return activeIndex !== -1 ? activeIndex : false;
};

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  '& .Mui-selected': {
    color: theme.palette.primary.main,
  },
  '& .MuiBottomNavigationAction-root': {
    color: theme.palette.secondary.dark,
  },
}));

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const activeIndex = useActiveIndex();

  const showAppreciate = useBoolean();

  const isAppreciateDisabled = location.pathname.includes('appreciate');

  return (
    <Box overflow="auto" height={1} display="flex" flexDirection="column">
      <GlobalLoadingIndicator />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Box height={1}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Box>
        <AppreciateComponent show={showAppreciate.isTrue} onHide={showAppreciate.setFalse} />
      </Box>

      {!location.pathname.includes('create-group') && (
        <Paper
          sx={{
            backgroundImage: showAppreciate.isTrue ? `url(${nav})` : '',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            py: 1.5,
            height: 80,
            backgroundColor: showAppreciate.isTrue ? 'transparent' : 'white',
            boxShadow: showAppreciate.isTrue ? 'none' : '0px 1px 10.4px -2px rgba(0, 0, 0, 0.25)',
            zIndex: theme.zIndex.drawer,
          }}
          className="nav-background"
          elevation={3}
        >
          <StyledBottomNavigation
            value={activeIndex}
            sx={{
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            showLabels
          >
            <BottomNavigationAction
              onClick={() => navigate(paths.home)}
              icon={activeIndex === 0 ? <img src={homeIconSelected} /> : <img src={homeIcon} />}
              label="Home"
            />
            <BottomNavigationAction
              onClick={() => navigate(paths.groups)}
              icon={activeIndex === 1 ? <img src={groupsIconSelected} /> : <img src={groupsIcon} />}
              label="Groups"
            />
            <IconButton
              onClick={showAppreciate.setTrue}
              sx={{
                visibility: showAppreciate.isTrue ? 'hidden' : 'visible',
              }}
              disabled={isAppreciateDisabled}
            >
              <Box component="img" src={qrCodeIcon} sx={{ opacity: isAppreciateDisabled ? 0.5 : 1 }} />
            </IconButton>
            <BottomNavigationAction
              onClick={() => navigate(paths.map)}
              icon={activeIndex === 3 ? <img src={mapIconSelected} /> : <img src={mapIcon} />}
              label="Map"
            />
            <BottomNavigationAction
              onClick={() => navigate(paths.more)}
              icon={activeIndex === 4 ? <img src={moreIconSelected} /> : <img src={moreIcon} />}
              label="More"
            />
          </StyledBottomNavigation>
        </Paper>
      )}
    </Box>
  );
};
