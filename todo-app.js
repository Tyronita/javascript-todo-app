let todos = fetchTodos()

filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

// Updates the search filter after input and rerender
document.querySelector('#search-filter').addEventListener('input', function (event) {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

// Updates the 'hide completed' todos filter and rerenders
document.querySelector('#hide-completed').addEventListener('change', function (event) {
    filters.hideCompleted = event.target.checked
    renderTodos(todos, filters)
})

// Adds a todo
document.querySelector('#create-todo-form').addEventListener('submit', function (event) {
    event.preventDefault() // Prevents default page refresh after submit click

    todos.push({
        id: uuidv4(),
        text: event.target.elements.todoText.value, // Add a todo with the input text
        completed: false,
    })

    saveTodos(todos)
    event.target.elements.todoText.value = '' // wipes input
    renderTodos(todos, filters)
})