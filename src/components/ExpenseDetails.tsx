import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailsProps = {
    expense: Expense
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
    const leadingActions = ()=>(
        <LeadingActions>
            <SwipeAction
                onClick={()=>{}}
            >
                Acualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = ()=>(
        <TrailingActions>
            <SwipeAction
                onClick={()=>{}}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-500 flex gap-5 items-center">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-3">
                        <p className="text-sm font-bold uppercase text-slate-600"></p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm ">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
