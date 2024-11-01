import { Input } from "./ui/input";

export function Search (){
    return(
        <>
        <form className="flex items-center gap-2 justify-center">
        <Input placeholder="Busque um conhecimento..." className="h-8 w-2/4" />
      </form>
      </>
    )
}