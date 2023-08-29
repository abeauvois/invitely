import { Link } from "react-router-dom";

import { Button } from "@/shadcn-components/ui/button";
import { DeleteButton } from "@/shared/components/Buttons/DeleteButton";

export default ({ to, label, onDelete }) => (
    <li className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full rounded-md border-2 border-slate-300 text-sm leading-6 text-slate-900 font-medium
    p-3">
        <dl>
            <dt className="sr-only">Title</dt>
            <dd className="flex justify-between">
                <Button variant="link">
                    <Link to={to}>{label}</Link>
                </Button>
                <DeleteButton onDelete={onDelete} />
            </dd>
        </dl>
    </li>
);