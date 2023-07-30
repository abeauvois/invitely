import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ReactComponent as Logo } from "../../assets/logo-no-background.svg";

export const AppBar = () => {
  return (
    <header className="border-b-2 border-gray-200 bg-white">
      <nav
        className="flex w-full items-center justify-between p-2 lg:px-4 fill-primary"
        aria-label="Global"
      >
        <Link to="/" className="fill-primary">
          <Logo className="m-4 h-24 w-24" />
        </Link>
        <div className="flex border-4 border-invitely rounded-full mx-6">
          <UserButton />
        </div>
      </nav>
    </header>
  );
};
