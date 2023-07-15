import { useNavigate } from "react-router";

export const Success = () => {
  const navigate = useNavigate();

  const onValidate = () => {
    navigate("/", { state: { from: "success" } });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-1xl font-bold tracking-tight text-invitely sm:text-4xl">
        Félicitations !
      </h1>
      <br />
      <h2>
        Votre commande va être validée par notre équipe, nous vous revenons sous
        24h.
      </h2>
      <br />
      <button
        type="button"
        className="my-8 rounded-md bg-invitely px-8 py-4 font-extrabold text-white hover:bg-invitely-dark"
        onClick={onValidate}
      >
        Passer une nouvelle commande
      </button>
      <button
        type="button"
        className="my-8 rounded-md bg-invitely px-8 py-4 font-extrabold text-white hover:bg-invitely-dark"
        onClick={onValidate}
      >
        Quitter
      </button>
    </div>
  );
};
