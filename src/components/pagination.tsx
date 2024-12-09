import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
  pageIndex: number;  // A página atual (baseada em 1)
  totalCount: number;  // Total de itens
  totalPages: number;  // Total de páginas
  perPage: number;     // Itens por página
  onPageChange: (newPageIndex: number) => void;  // Função para alterar a página
}

export function Pagination({
  pageIndex,
  totalCount,
  totalPages,
  perPage,
  onPageChange,
}: PaginationProps) {

  const handleFirstPage = () => onPageChange(1);  
  const handlePreviousPage = () => {
    if (pageIndex > 1) { 
      onPageChange(pageIndex - 1);
    }
  };
  const handleNextPage = () => {
    if (pageIndex < totalPages) { 
      onPageChange(pageIndex + 1);
    }
  };
  const handleLastPage = () => onPageChange(totalPages); 

  return (
    <div className="flex items-center justify-center px-40 py-10 w-full">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm text-muted-foreground">
          Total de {totalCount} item(s)
        </span>

        <div className="flex items-center gap-6 lg:gap-8">
          <div className="text-sm font-medium">
            Página {pageIndex} de {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleFirstPage}
              disabled={pageIndex === 1}  
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">Primeira página</span>
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePreviousPage}
              disabled={pageIndex === 1}  
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={pageIndex === totalPages} 
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima página</span>
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleLastPage}
              disabled={pageIndex === totalPages}  
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Última página</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
