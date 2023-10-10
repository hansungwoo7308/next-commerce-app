import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/public/fetchData";

export const refreshAuth = async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const response = await getData("v2/auth/refresh");
    // const response = await getData("auth/refresh");
    // logResponse(response);
    const { user, accessToken } = response.data;
    dispatch(setCredentials({ user, accessToken }));
    dispatch(setLoading(false));
  } catch (error) {
    // logError(error);
    // router.push("/auth/signin");
    dispatch(setLoading(false));
  }
};
