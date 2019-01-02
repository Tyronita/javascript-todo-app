// Fetch existing todos from localStorage or create the array
const fetchTodos = function () {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
} 

// Stringify the todos obaject array and save it in local storage
const saveTodos = function (todos) {
    const todosJSON = JSON.stringify(todos)
    localStorage.setItem('todos',todosJSON)
}

const removeTodo = function (id) {
    // Find the index of the specific todo
    const todoIndex = todos.findIndex( function (todo) {
        return id === todo.id
    })
    // Delete the todo if found
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const renderTodos = function (todos, filters) {
    // Filter the todos
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })

    // Count the uncompleted filtered todos
    const incompleteCount = filteredTodos.filter(function (todo) {
        return !todo.completed
    }).length

    // Clear the area before generating the summary
    document.querySelector('#filtered-todos').innerHTML = ''  
    document.querySelector('#filtered-todos').appendChild(generateSummaryDOM(incompleteCount))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#filtered-todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    // Generate the todo elements
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    // On initial load check the box if already completed
    checkbox.checked = todo.completed  
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function (event) {
        // if checked make the todo completed and vice versa
        todo.completed = event.target.checked
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup the todo text
    if (todo.text.length > 0) {
        todoText.textContent = todo.text
    } else {
        todoText.textContent = 'Unnamed Todo'
    }
    todoEl.appendChild(todoText)

    // Setup the remove button
    removeButton.textContent = 'Remove'
    todoEl.appendChild(removeButton)
    // Remove todo on button click
    removeButton.addEventListener('click', function (event) {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// Get the DOM elelements for a list summary
const generateSummaryDOM = function (incompleteCount) {
    const summary = document.createElement('h3') // Incompleted todos summary
    summary.textContent = `You have ${incompleteCount} uncompleted filtered todos left`
    return summary
}