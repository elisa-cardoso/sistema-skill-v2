import { Input } from "./ui/input";
interface SearchProps {
  onSearch: (title: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4 flex items-center justify-center">
      <Input 
        placeholder="Busque um conhecimento..." 
        className="h-8 w-2/4" 
        onChange={handleInputChange} 
      />
    </div>
  );
}