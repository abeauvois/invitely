import { Link } from "react-router-dom";

import { Button } from "@/shadcn-components/ui/button";
import { DeleteButton } from "@/shared/components/Buttons/DeleteButton";
import { CopyButton } from "@/shared/components/Buttons/CopyButton";

export default ({ to, label, onDuplicate, onDelete }) => (
    <li className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full rounded-md border-2 border-slate-300 text-sm leading-6 text-slate-900 font-medium
    p-3">
        <dl>
            <dt className="sr-only">Title</dt>
            <dd className="flex justify-between">
                <Button variant="link">
                    <Link to={to}>{label}</Link>
                </Button>
                <div>
                    <CopyButton title="Dupliquer" onCopy={onDuplicate} />
                    <DeleteButton onDelete={onDelete} />
                </div>
            </dd>
        </dl>
    </li>
);