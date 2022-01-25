import {deleteExpense, addStorage} from '../js/functions.js'
import {expenseList, form} from '../js/variables.js'




export class UI{

    insertBudget(quantity){
        const {budget, rest} = quantity;

        document.querySelector('#total').textContent = budget;
        document.querySelector('#rest').textContent = rest;
    };

    printAlert(msj, type){
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert');
        div.textContent = msj;

        if(type === 'error'){
            div.classList.add('alert-danger')
        } else {
            div.classList.add('alert-success')
        };

        document.querySelector('.primario').insertBefore(div, form);

        setTimeout(() =>{
            div.remove()
        }, 2000)
    };

    showExpenses(expenses){

        this.cleanHTML();

        expenses.forEach( expenses => {
            
            const {name, quantity, id} = expenses
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.dataset.id = id;
            li.innerHTML = `${name} <span class="badge badge-primary badge-pill"> €${quantity} </span>`

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'borrar-gasto');
            deleteBtn.innerHTML = '&times';
            deleteBtn.onclick = () => {
                deleteExpense(id)
            }
            li.appendChild(deleteBtn);

            expenseList.appendChild(li)

        });

        addStorage()
    }

    cleanHTML(){
        while(expenseList.firstChild){
            expenseList.removeChild(expenseList.firstChild)
        }
    };

    updateRest(rest){
        document.querySelector('#rest').textContent = rest;
    };

    checkBudget(budgetObj){
        const {budget, rest} = budgetObj;
        const div = document.querySelector('.rest')

        if((budget / 4) > rest){
            div.classList.remove('alert-success', 'alert-warning');
            div.classList.add('alert-danger');
        } else if((budget / 2) > rest) {
            div.classList.remove('alert-success');
            div.classList.add('alert-warning')
        } else {
            div.classList.remove('alert-danger', 'alert-warning');
            div.classList.add('alert-success')
        }

        if(rest <= 0){
            ui.printAlert('Balance ran out', 'error');
            document.querySelector('button[type="submit"]').disabled = true;
        } else {
            document.querySelector('button[type="submit"]').disabled = false
        }
    }

    
}



export const ui = new UI();