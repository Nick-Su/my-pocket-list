import { makeAutoObservable } from "mobx";
import { ITask } from "../models/ITask";
import { mockTasks } from "../mock-tasks";

class Task {
    tasks: ITask[] = mockTasks;
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
