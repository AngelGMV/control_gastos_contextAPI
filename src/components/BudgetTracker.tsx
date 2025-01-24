import {CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {

    const { state, dispatch, totalExpenses, totalAvailable } = useBudget()
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
    
  return (
    <div className=" grid grid-cols-2 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor : percentage === 100 ? '#8b5cf6' : '#3b82f6',
                    trailColor : '#F5F5F5',
                    textSize : 15,
                    textColor : percentage === 100 ? '#8b5cf6' : '#3b82f6'
                })}
                text={ `${percentage}%`}
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button 
                type="button"
                onClick={()=>dispatch({type : 'restart-app'})}
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
