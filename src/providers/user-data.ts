import { useQuery } from "@tanstack/react-query";
import constate from "constate";
import { getUser } from "src/api/listing";
import { useAuthContext } from "./auth";
import { useForm } from "react-hook-form";
import { CurrentUser } from "src/api/listing/types";

const useGetUserDetails = () => {
  const { control, getValues, setValue, watch, reset, handleSubmit } =
    useForm<CurrentUser>({
      defaultValues: {
        isPrivate: false,
        _id: "",
        bio: "",
        email: "",
        generalRating: 0,
        isLocationPublic: false,
        linkedAccounts: [],
        name: "",
        physicalPoints: 0,
        picture: "",
        placemark: "",
        topHashtags: [],
        topShades: [],
      },
    });
  const { userData } = useAuthContext();
  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    enabled: userData.isFetched,
    queryKey: ["user-info"],
    queryFn: () => getUser(userData.data!.user._id),
    onSuccess: (data) => {
      console.log(data);
      reset(data.user);
    },
  });

  return {
    user,
    control,
    watch,
    setValue,
    getValues,
    isLoading,
    isFetching,
    handleSubmit,
    refetch
  } as const;
};
export const [GetUserDetailsProvider, useGetUserDetailsContext] =
  constate(useGetUserDetails);
