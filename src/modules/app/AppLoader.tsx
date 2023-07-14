import React from "react";
import { ClipLoader } from "react-spinners";

export function AppLoader(): React.ReactElement {
  return (
    <div className="absolute inset-0 z-50 flex justify-center bg-gray-100 font-airstrike">
      <div className="relative flex h-1/3 items-end justify-center">
        <h1 className="text-6xl text-supervan">OPTIMIZ</h1>
        <span className="absolute -bottom-3.5 right-3 animate-pulse text-3xl">
          Loading
        </span>
        <ClipLoader
          color="#000"
          loading
          cssOverride={{
            position: "absolute",
            bottom: "-12rem",
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
