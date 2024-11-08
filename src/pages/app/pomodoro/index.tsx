import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useContext } from "react";
import { CyclesContext } from "@/contexts/CyclesContext";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { Countdown } from "@/components/countdown";
import { Hand, Play } from "lucide-react";
import { NewCycleForm } from "@/components/newCycleForm";
import { Button } from "@/components/ui/button";


const newCiclyFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'o ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

// interface NewCycleFormData {
//     task: string
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCiclyFormValidationSchema>

export function Pomodoro() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCiclyFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data:NewCycleFormData) {
        createNewCycle(data)
        
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <Button className="w-3/6" variant='destructive' onClick={interruptCurrentCycle} type="button">
                        <Hand size={24} />
                        Interromper
                    </Button >
                ) : (
                    <Button className="w-3/6" disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </Button>
                )}
            </form>
        </HomeContainer>
    )
}