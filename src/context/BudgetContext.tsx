import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetAction, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>
    totalExpenses : number
    totalAvailable : number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce(
        (total, expense) => expense.amount + total, 0), [state.expenses])
    const totalAvailable = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                totalAvailable
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}