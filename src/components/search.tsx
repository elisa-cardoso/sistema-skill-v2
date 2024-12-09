import { Input } from "./ui/input";
interface SearchProps {
  onSearch: (title: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <Input 
        placeholder="Busque um conhecimento..." 
         
        onChange={handleInputChange} 
      />
    </div>
  );
}