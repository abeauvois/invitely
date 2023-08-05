import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageActions } from "@/shared/components/PageActions";
import { SendDialog } from "./SendDialog";

export const Header = ({ onSelectDate }) => (
    <PageActions backTo={{ url: "/workspace", label: "Workspace" }} pageTitle="Formulaire" >
        <SendDialog />
    </PageActions >
)