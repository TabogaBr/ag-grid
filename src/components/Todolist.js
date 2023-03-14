import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Todolist() {
    const [todo, setTodo] = React.useState({ description: '', priority: '', date: '' });
    const [todos, setTodos] = React.useState([]);

    const [columnDefs] = React.useState([
        { field: 'description', sortable: true, filter: true, floatingFilter: true },
        {
            field: 'priority', sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === 'High' ? { color: 'red' } : { color: 'black' }
        },
        { field: 'date', sortable: true, filter: true, floatingFilter: true },
    ]);

    const gridRef = useRef();

    const handleAddTodo = () => {
        setTodos([todo, ...todos]);
        setTodo({ description: '', priority: '', date: '' });
    };

    const handleDoneTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id));
        } else {
            alert('Please, select a row first');
        }
    };

    return (
        <div>
            <h1>My TodoList</h1>
            <p>Description:
                <input
                    placeholder='Description'
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                />
                Priority:
                <input
                    placeholder='Priority'
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}
                />
                Date:
                <input
                    type='date'
                    placeholder='Date'
                    value={todo.date}
                    onChange={e => setTodo({ ...todo, date: e.target.value })}
                />
                <button onClick={handleAddTodo}>Add Todo</button>
                <button onClick={handleDoneTodo}>Delete</button>
                <div className="ag-theme-material" style={{ height: 600, width: 600, margin: 'auto' }}>
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        rowSelection='single'
                        rowData={todos}
                        columnDefs={columnDefs}
                        animateRows={true}
                    />
                </div>
            </p>
        </div>
    )
}