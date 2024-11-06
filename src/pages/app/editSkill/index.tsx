import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { getSkillById, updateSkill } from "@/services/skillServices"; 
import { getCategories } from "@/services/categoryServices";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select, { MultiValue, ActionMeta } from "react-select";
import { UpdateSkillType } from "@/@types/skills";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { customStyles } from "./styles";


const EditForm = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  image: z.string().url({ message: "URL da imagem deve ser válida" }),
  category: z.array(z.number()).min(1, { message: "Selecione pelo menos uma categoria" }),
});

type EditForm = z.infer<typeof EditForm>;


export function EditSkill() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<EditForm>({
    resolver: zodResolver(EditForm),
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await getCategories(); 
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const skill = await getSkillById(Number(id));
        setValue("title", skill.title);
        setValue("description", skill.description);
        setValue("image", skill.image);

        const categoryIds = skill.categories?.map((category: { id: number }) => category.id) || [];

        const selectedCategories = categories
          .filter(category => categoryIds.includes(category.id))
          .map(category => ({
            value: category.id,
            label: category.name,
          }));

        setSelectedCategory(selectedCategories); 
        setValue("category", categoryIds);
      } catch (error) {
        console.error("Erro ao buscar habilidade:", error);
        toast.error("Erro ao buscar habilidade.");  // Usando o toast em vez do alert
      }
    };

    fetchSkill();
  }, [id, categories, setValue]);

  const handleSelectChange = (selectedOptions: MultiValue<{ value: number; label: string }>, actionMeta: ActionMeta<{ value: number; label: string }>) => {
    const updatedCategoryIds = selectedOptions.map(option => option.value);

    setSelectedCategory([...selectedOptions]); 
    setValue("category", updatedCategoryIds); 
  };

  const onSubmit = async (data: EditForm) => {
    try {
      if (selectedCategory.length === 0) {
        toast.error("Selecione pelo menos uma categoria.");  // Usando o toast para erro
        return;
      }

      const skillData: UpdateSkillType = {
        id: Number(id),
        title: data.title, 
        description: data.description,
        image: data.image,
        category: selectedCategory.map(option => option.value),
      };

      await updateSkill(Number(id), skillData);

      toast.success("Habilidade atualizada com sucesso!");  // Usando o toast para sucesso
      navigate("/gerenciar/conhecimento");
    } catch (error) {
      console.error("Erro ao atualizar a habilidade:", error);
      toast.error("Erro ao atualizar a habilidade.");  // Usando o toast para erro
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
        <h1 className="text-2xl text-center my-8 font-bold">Atualizar Habilidade</h1>
        
        <div className="mt-4">
          <Label htmlFor="title" className="block mb-2 text-sm">Título</Label>
          <Input id="title" {...register("title")} className={`mt-1 block w-full border rounded p-2 ${errors.title ? 'border-destructive' : ''}`} />
          {errors.title && <p className="text-destructive mt-2 text-sm">{errors.title.message}</p>}
        </div>

        <div className="mt-8">
          <label className="block text-sm mb-2">Categorias</label>
          <div className="flex flex-col">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field} 
                  isMulti
                  options={categories.map(category => ({
                    value: category.id, 
                    label: category.name,
                  }))} 
                  value={selectedCategory}
                  onChange={handleSelectChange}
                  styles={customStyles} 
                  placeholder="Selecione as categorias"
                />
              )}
            />
          </div>
        </div>

        <div className="mt-8">
          <Label htmlFor="image" className="block mb-2 text-sm">URL da Imagem</Label>
          <Input id="image" {...register("image")} className={`mt-1 block w-full border rounded p-2 ${errors.image ? 'border-destructive' : ''}`} />
          {errors.image && <p className="text-destructive mt-2 text-sm">{errors.image.message}</p>}
        </div>
        
        <div className="mt-8">
          <Label htmlFor="description" className="block mb-2 text-sm">Descrição</Label>
          <Textarea id="description" {...register("description")} className={`mt-1 block w-full border rounded p-2 h-56 ${errors.description ? 'border-destructive' : ''}`} />
          {errors.description && <p className="text-destructive mt-2 text-sm">{errors.description.message}</p>}
        </div>

        <Button type="submit" className="mt-8">
          Salvar Alteração
        </Button>
      </form>
    </div>
  );
}
