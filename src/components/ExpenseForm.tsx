import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const { dispatch, state } = useBudget()
    useEffect(()=>{
        if(state.editingID){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingID)[0]
            setExpense(editingExpense)
        }
    }, [state.editingID])
    const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleOnChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        if (state.editingID){
            dispatch({ type: 'update-expense', payload : {Expense : {id : state.editingID, ...expense} }})
        }else{
            dispatch({ type: 'add-expense', payload: { expense } })
        }
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }
    return (
        <form className="space-y-5" onSubmit={handleOnSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-400 py-2">
               {state.editingID ? 'Actualizar gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Nombre del gasto
                </label>
                <input
                    id="expenseName"
                    type="text"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleOnChange}
                />

            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Cantidad
                </label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Añade la cantidad gastada"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="amount"
                    value={expense.amount}
                    onChange={handleOnChange}
                />

            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >
                    Categoria
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="category"
                    value={expense.category}
                    onChange={handleOnChange}
                >
                    <option value=''>
                        -- Seleccione --
                    </option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Fecha:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2"
                    value={expense.date}
                    onChange={handleOnChangeDate}
                />

            </div>
            <input
                type="submit"
                className="bg-blue-500 w-full p-2 text-white font-bold cursor-pointer uppercase rounded-lg"
                value={state.editingID ? 'Guardar cambios' : 'Registrar gasto'}
            />
        </form>
    )
}
