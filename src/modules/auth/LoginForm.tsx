import { useForm } from "react-hook-form";

import { useAuthStore } from "./auth.store";

type LoginInput = {
  email: string;
  password: string;
};

export function LoginForm(): React.ReactElement {
  const { login, errors } = useAuthStore();

  const { handleSubmit, register, formState } = useForm<LoginInput>(
    process.env.NODE_ENV === "development"
      ? {
          defaultValues: {
            email: "john@doe.com",
            password: "123456",
          },
        }
      : {},
  );

  function onSubmit({ email, password }: LoginInput) {
    login(email, password);
  }

  return (
    <div className="grid grid-rows-[auto_1fr] bg-white sm:bg-gray-100">
      {errors?.length > 0 ? (
        <div className="bg-red-500 px-8 py-4 text-white">
          <h3 className="mb-2 border-b border-gray-100 font-semibold leading-loose">
            Erreur lors de la connexion
          </h3>
          <div className=" text-sm">
            {errors?.map((error, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={`error-box-${idx}`}>{error}</p>
            ))}
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="relative flex flex-col bg-white sm:justify-center sm:bg-gray-100">
        <div className="w-full px-6 py-8 sm:mx-auto sm:max-w-md sm:rounded-lg sm:bg-white sm:px-10 sm:shadow-xl sm:ring-1 sm:ring-gray-900/5">
          <h1 className="h-6 text-xl font-bold leading-tight tracking-tight sm:text-2xl">
            Connexion au compte
          </h1>
          <form
            className="divide-y divide-gray-300/50"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid space-y-4 py-8 sm:space-y-6">
              <label htmlFor="email" className="grid space-y-2">
                <span className=" block text-sm font-medium">Email</span>
                <input
                  id="email"
                  type="email"
                  placeholder="nom@societe.com"
                  {...register("email", { required: true })}
                />

                <span role="alert" className="text-sm text-red-500">
                  {formState.errors.email ? "L'email est requis" : <>&#8203;</>}
                </span>
              </label>
              <label htmlFor="password">
                <span className=" block text-sm font-medium">Mot de passe</span>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password", { required: true })}
                />
                <span role="alert" className="text-sm text-red-500">
                  {formState.errors.password ? (
                    "Le mot de passe est requis"
                  ) : (
                    <>&#8203;</>
                  )}
                </span>
              </label>
            </div>

            <div className="space-y-4 pt-6 sm:space-y-6">
              <button
                type="submit"
                className="btn-accent w-full"
                disabled={!formState.isValid}
              >
                Se connecter
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Pas encore de compte ?{" "}
                <a
                  href="/"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:text-invitely hover:underline"
                >
                  Creer un compte
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed bottom-0 px-6 py-2 text-gray-400">
        <span className="text-sm lowercase">
          {process.env.INVITELY_ENVIRONMENT_NAME || ""}
        </span>
      </div>
    </div>
  );
}
