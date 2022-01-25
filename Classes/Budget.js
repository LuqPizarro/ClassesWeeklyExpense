export class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.rest = Number(budget);
        this.expenses = []
    };

    newExpense(expense){
        this.expenses = [...this.expenses, expense];
        this.residuary()
    };

    residuary(){
        const spent = this.expenses.reduce((total, expense) => total + expense.quantity, 0)
        this.rest = this.budget - spent
    };

    deleteExpense(id){
        this.expenses = this.expenses.filter(expense => expense.id !== id)
        this.residuary()
    }
    
};

