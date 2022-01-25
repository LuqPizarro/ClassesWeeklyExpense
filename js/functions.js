import {ui} from '../Classes/UI.js'
import {Budget} from '../Classes/Budget.js'
import {form} from './variables.js'


export let budget = []

// Eventos
eventListeners()
function eventListeners(){

    
    
    document.addEventListener('DOMContentLoaded', askBudget);

    form.addEventListener('submit', addExpense)

    

}


function askBudget(){
   
    const presupuestoUsuario = prompt("Which is your budget?")
    
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
            window.location.reload();
    };

    budget = new Budget(presupuestoUsuario);

    ui.insertBudget(budget);  

};

function addExpense(e){
    e.preventDefault();

    const name = document.querySelector('#expense').value;
    const quantity = Number(document.querySelector('#quantity').value);

    if (name === '' || quantity === ''){
        ui.printAlert('All fields are obligatory', 'error');

        return;
    } else if (quantity <= 0 || isNaN(quantity)){
        ui.printAlert('Invalid quantity', 'error')

        return;
    }


    const expense = {name, quantity, id: Date.now()};

    budget.newExpense(expense);

    ui.printAlert('Added correctly');

    const {expenses, rest} = budget
    ui.showExpenses(expenses)
    ui.updateRest(rest)
    ui.checkBudget(budget)

    form.reset()

};

export function deleteExpense(id){
    budget.deleteExpense(id)

    const {expenses, rest} = budget
    ui.showExpenses(expenses);
    ui.updateRest(rest)
    ui.checkBudget(budget)

}

export function addStorage() {
    localStorage.setItem('Budget', JSON.stringify(budget))   
}