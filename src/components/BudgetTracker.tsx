import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {

    const { state, totalExpenses, totalAvailable } = useBudget()
    
  return (
    <div className=" grid grid-cols-2 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="Grafica"/>
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button 
                type="button"
                className="bg-violet-500 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                Resetear app
            </button>
            <AmountDisplay
                label="Presupuesto"
                amount={state.budget}
            />
            <AmountDisplay
                label="Disponible"
                amount={totalAvailable}
            />
            <AmountDisplay
                label="Gastado"
                amount={totalExpenses}
            />
        </div>
    </div>
  )
}
