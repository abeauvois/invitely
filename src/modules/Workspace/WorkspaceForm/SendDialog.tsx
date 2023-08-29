import { Button } from "@/shadcn-components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn-components/ui/dialog"
import { Input } from "@/shadcn-components/ui/input"
import { Label } from "@/shadcn-components/ui/label"
import { MessageBox } from "@/shared/components/MessageBox"

export function SendDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="gap-5">
          Envoyer
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        <div className="text-center ">
          <MessageBox title="En construction" message="Ici se trouvera un ecran permettant d'envoyer à une liste de destinataires, une demande de saisir le formulaire" />
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div> */}
        </div>
        <DialogFooter>
          <Button variant="primary">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
