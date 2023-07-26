import { ReactComponent as Logo } from "../../assets/logo-no-background.svg";

export const AppBar = () => {
  return (
    <header className="border-b-2 border-gray-200 bg-white">
      <nav
        className="flex w-full items-center justify-center p-2 lg:px-4 fill-primary"
        aria-label="Global"

      >
        <Logo className="m-4 h-56 w-56" />

      </nav>
    </header>
  );
};
