import logError from "lib/client/log/logError";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/public/fetchData";

export const refreshAuth = async (dispatch: any) => {
  // const response = await getData("v2/auth/refresh");
  // const { user, accessToken } = response.data;
  // dispatch(setCredentials({ user, accessToken }));

  try {
    dispatch(setLoading(true));
    const response = await getData("v2/auth/refresh");
    const { user, accessToken } = response.data;
    dispatch(setCredentials({ user, accessToken }));
    dispatch(setLoading(false));
  } catch (error) {
    logError(error);
    dispatch(setLoading(false));
  }
};
