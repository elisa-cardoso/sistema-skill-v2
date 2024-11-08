import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { CyclesContext } from "@/contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <div>
      <div className="text-center mb-20">
        <h1 className="text-3xl font-bold tracking-tight">
          Organize seu tempo
        </h1>
        <p>Intervalos planejados para um trabalho mais eficiente!</p>
      </div>
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          id="task"
          list="task-suggestions"
          placeholder="Nome do seu projeto"
          disabled={!!activeCycle}
          {...register("task")}
        ></TaskInput>

        <datalist id="task-suggestions"></datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          min={5}
          max={60}
          disabled={!!activeCycle}
          {...register("minutesAmount", { valueAsNumber: true })}
        ></MinutesAmountInput>

        <span>minutos.</span>
      </FormContainer>
    </div>
  );
}
