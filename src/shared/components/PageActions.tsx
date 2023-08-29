import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/logo-no-background.svg";

export const PageActions = ({ backTo = null, pageTitle, children, className = "" }) => {
    return (
        <header className={`page-actions text-slate-900 justify-between items-end pb-6 ${className}`}>
            {backTo
                ? <div className="flex items-center">

                    <Link to={backTo.url} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        <div>{backTo.label}</div>
                    </Link>
                </div>
                : <Logo className="m-4 h-12 w-12 fill-primary" />}
            <h2 className="text-center text-2xl font-semibold text-slate-900 inline">
                {pageTitle}
            </h2>
            <div className="flex align-center">
                {children}
            </div>
        </header >

    );
}