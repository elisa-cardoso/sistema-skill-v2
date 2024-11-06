import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { getSkillById, updateSkill } from "@/services/skillServices"; 
import { getCategories } from "@/services/categoryServices";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UpdateSkillType } from "@/@types/skills";

const schema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  image: z.string().url({ message: "URL da imagem deve ser válida" }),
  category: z.array(z.number()).min(1, { message: "Selecione pelo menos uma categoria" }),
});

type FormData = z.infer<typeof schema>;

export function EditSkill() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

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
        setSelectedCategory(categoryIds); 
        setValue("category", categoryIds);
      } catch (error) {
        console.error("Erro ao buscar habilidade:", error);
        alert("Erro ao buscar habilidade.");
      }
    };
  
    fetchSkill();
  }, [id, setValue]);

  const handleCheckboxChange = (categoryId: number) => {
    const updatedCategories = selectedCategory.includes(categoryId)
      ? selectedCategory.filter(id => id !== categoryId)
      : [...selectedCategory, categoryId];
  
    setSelectedCategory(updatedCategories);
    setValue("category", updatedCategories);
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (selectedCategory.length === 0) {
        alert("Selecione pelo menos uma categoria.");
        return;
      }
  
      const skillData: UpdateSkillType = {
        id: Number(id),
        title: data.title, 
        description: data.description,
        image: data.image,
        category: selectedCategory
      };
  
      await updateSkill(Number(id), skillData);
  
      alert("Habilidade atualizada com sucesso!");
      navigate("/gerenciar/conhecimento");
    } catch (error) {
      console.error("Erro ao atualizar a habilidade:", error);
      alert("Erro ao atualizar a habilidade.");
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
        <h1 className="text-2xl text-center my-8 font-bold">Atualizar Habilidade</h1>
        
        <div className="mt-4">
          <Label htmlFor="title" className="block text-sm">Título</Label>
          <Input id="title" {...register("title")} className={`mt-1 block w-full border rounded p-2 ${errors.title ? 'border-red-500' : ''}`} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        
        <div className="mt-4">
          <Label htmlFor="description" className="block text-sm">Descrição</Label>
          <Input id="description" {...register("description")} className={`mt-1 block w-full border rounded p-2 ${errors.description ? 'border-red-500' : ''}`} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mt-4">
          <Label htmlFor="image" className="block text-sm">URL da Imagem</Label>
          <Input id="image" {...register("image")} className={`mt-1 block w-full border rounded p-2 ${errors.image ? 'border-red-500' : ''}`} />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm">Categorias</label>
          <div className="flex flex-col">
            {categories.map(category => (
              <label key={category.id} className="flex items-center mt-2">
                <Checkbox
                  checked={selectedCategory.includes(category.id)} 
                  onCheckedChange={() => handleCheckboxChange(category.id)}
                  className="mr-2"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white rounded p-2">
          Salvar
        </button>
      </form>
    </div>
  );
}
