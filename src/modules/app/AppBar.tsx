import { ReactComponent as Logo } from "../../assets/supervan_logo.svg";

export const AppBar = () => {
  return (
    <header className="border-b-2 border-gray-200 bg-white">
      <nav
        className="flex w-full items-center justify-center p-2 lg:px-4"
        aria-label="Global"
      >
        <Logo className="m-4 h-12 w-12" />

        <div className="hidden self-center lg:flex lg:gap-x-12">
          <span className="bg-white/95 font-airstrike text-3xl text-supervan md:-bottom-3 ">
            SUPERVAN OPTIMIZ
          </span>
        </div>
      </nav>
    </header>
  );
};
