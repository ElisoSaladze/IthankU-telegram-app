import { Marker } from '@react-google-maps/api';
import { MapUser } from '~/api/users';

type Props = {
  user: MapUser;
};

export const UserMarker = ({ user }: Props) => {
  return (
    <Marker
      position={{
        lat: user.location?.coordinates?.[1] || 0,
        lng: user.location?.coordinates?.[0] || 0,
      }}
      icon={{
        url: user.picture ?? '',
        scaledSize: new google.maps.Size(40, 40),
      }}
    />
  );
};
