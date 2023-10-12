import { setCredentials } from "lib/client/store/authSlice";
import { getData } from "lib/public/fetchData";

export const refreshAuth = async (dispatch: any) => {
  const response = await getData("v2/auth/refresh");
  const { user, accessToken } = response.data;
  dispatch(setCredentials({ user, accessToken }));
};
