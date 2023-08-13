import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PageActions } from "@/shared/components/PageActions";
import { CrossCircledIcon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { cn, preventSubmit } from "@/lib/utils";

const ClearFormButton = ({ displayCondition, onClear }) => (
  <Button
    type="reset"
    onClick={onClear}
    variant="secondary"
    className={cn(displayCondition ? "visible" : "invisible", "relative -left-12 top-0.5")}
  >
    <CrossCircledIcon />
  </Button >
)

export const Header = ({ onNewForm, onSearch }) => {

  const { handleSubmit, setValue, register, watch } = useForm({
    defaultValues: {
      searchTerm: ""
    }
  });
  const { name, ref, onBlur, onChange } = register("searchTerm");
  const handleChange = (e) => {
    onChange(e);
    onSearch(e?.target.value || "");
  };
  const handleClear = (e) => {
    setValue("searchTerm", "");
    handleChange(e);
  }
  const searchTerm = watch("searchTerm");

  return (
    <>
      <PageActions backTo={{ url: "/", label: "Home" }} pageTitle={"Workspace"}>
        <Button onClick={onNewForm} variant="primary">
          <PlusIcon className="w-3 h-3 mr-2" />
          Formulaire
        </Button>
      </PageActions>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(preventSubmit)}
          className="group relative">
          <div className="flex items-center">
            <MagnifyingGlassIcon width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" />
            <input
              {...{ name, ref, onBlur }}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 pr-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter forms" placeholder="Chercher un formulaire..." />
            <ClearFormButton
              displayCondition={searchTerm.length ? true : false}
              onClear={handleClear} />
          </div>
        </form>
      </div >
    </>
  )
};