import axios, { AxiosError } from "axios";

type UserResponse = {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
};

type Response<T> = {
  success: true;
  title: "success";
  message: T;
  errored_fields: [];
};

const legacyApi = axios.create({
  baseURL: process.env.INVITELY_API_LEGACY,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function login(email: string, password: string) {
  if (!email) {
    throw new Error("L'email est requis");
  }

  if (!password) {
    throw new Error("Le mot de passe est requis");
  }

  if (process.env.NODE_ENV === "development") {
    return Promise.resolve({
      id: "1",
      lastname: "doe",
      firstname: "john",
      phone: "+33612131415",
      email: "john@doe.com",
    });
  }

  try {
    const data = await legacyApi.post<Response<{ user: UserResponse }>>(
      "/proboard/ajax_login",
      {
        email,
        mdp: password,
      },
    );

    return await Promise.resolve(data.data.message.user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e instanceof AxiosError && e.code === "400") {
      return Promise.reject(
        new Error(
          "L'email ou le mot de passe est incorrect, veuillez réessayer",
        ),
      );
    }

    return Promise.reject(e);
  }
}

export async function me() {
  try {
    if (process.env.NODE_ENV === "development") {
      return await Promise.resolve({
        id: "1",
        lastname: "doe",
        firstname: "john",
        phone: "+33612131415",
        email: "john@doe.com",
      });
    }
    const data = await legacyApi.get<Response<{ user: UserResponse }>>(
      "/proboard/ajax_account_info",
    );

    return await Promise.resolve(data?.data?.message?.user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e instanceof AxiosError && e.code === "401") {
      return Promise.reject(
        new Error("Vous n'etes plus connecter, veuillez vous reconnecter"),
      );
    }

    return Promise.reject(e);
  }
}

export async function logout() {
  if (process.env.NODE_ENV !== "development") {
    await legacyApi.post("/proboard/logout");
  }

  return Promise.resolve();
}
