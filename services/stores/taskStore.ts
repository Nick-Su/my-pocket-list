import { makeAutoObservable } from "mobx";
import { ITask } from "../models/ITask";
import uuid from 'react-native-uuid';

const dummyTasks: ITask[] = [
    {
        id: uuid.v4().toString(),
        title: 'TypeScript',
    },
    {
        id: uuid.v4().toString(),
        title: 'React Native',
    },
    {
        id: uuid.v4().toString(),
        title: 'JavaScript',
    },
    {
        id: uuid.v4().toString(),
        title: 'Vue',
    },
    {
        id: uuid.v4().toString(),
        title: 'Java',
    },
    {
        id: uuid.v4().toString(),
        title: 'C#',
    },
    {
        id: uuid.v4().toString(),
        title: 'Python',
    },
    {
        id: uuid.v4().toString(),
        title: 'Kotlin',
    },
    {
        id: uuid.v4().toString(),
        title: 'PHP',
    },
    {
        id: uuid.v4().toString(),
        title: 'C++',
    },
];

class Task {
    tasks: ITask[] = dummyTasks;
    editableTaskId: string = '';
    editableTitle: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task: ITask): void {
        this.tasks = [...this.tasks, task]
    }

    deleteTask(targetId: string): void {
       this.tasks = this.tasks.filter((task: ITask) => task.id !== targetId)
    }

    getTasks(): ITask[] {
        return this.tasks;
    }
    
    setEditTaskId(id: string): void {
        this.editableTaskId = id;
        this.tasks.forEach((task: ITask) => {
            if (task.id === this.editableTaskId) {
                this.editableTitle = task.title;
                return;
            }
        })
    }

    saveChanges(title: string): void {
        this.tasks = this.tasks.map((task: ITask) => {
            if (task.id === this.editableTaskId) {
                task.title = title;
            }
            return task;
        })

        this.editableTaskId = '';
        this.editableTitle = '';
    }

    cancelEditing(): void {
        this.editableTaskId = '';
        this.editableTitle = '';
    }
}

const taskStore = new Task();

export default taskStore;
