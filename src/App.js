import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask";
import Footer from './components/Footer'
import About from './components/About'

function App() {
    // initial task state
    const [tasks, setTasks] = useState([])
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }
        getTasks();
    },[])

    // Fetch All Tasks
    const fetchTasks = async() => {
        const res = await fetch("http://localhost:6100/tasks");
        const data = await res.json();
        return data;
    }

    // Fetch Task
    const fetchTask = async(id) => {
        const res = await fetch(`http://localhost:6100/tasks/${id}`);
        const data = await res.json();
        return data;
    }

    // Delete: Tasks
    const deleteTasks = async (id) => {
        await fetch(`http://localhost:6100/tasks/${id}`,
            {method: 'DELETE'});
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        taskToToggle.reminder = !taskToToggle.reminder;
        const res = await fetch(`http://localhost:6100/tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(taskToToggle),
            });

        const updTask = await res.json();
        setTasks(tasks.map(task => {
            return task.id === id ? updTask : task
        }))
    }

    // Add Task
    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 1000 + 1);
        // task.id = id;
        // setTasks([ ...tasks, task])
        const res = await fetch("http://localhost:6100/tasks",
            {method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(task),
            })
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
    }

    return (
        <Router>
            <div className="container">
                <Header title={'Task Tracker'} onToggle={() => setShowAddTask(!showAddTask)} onShowAdd={showAddTask}/>
                <Route path='/' exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask}/>}
                        {tasks.length > 0 ?
                            (<Tasks tasks={tasks} onDelete={deleteTasks} onToggle={toggleReminder}/>)
                            : ('No Tasks Shown')
                        }
                    </>
                    )} />
                <Route path='/About' component={About}/>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
