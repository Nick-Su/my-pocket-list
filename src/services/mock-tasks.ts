import uuid from 'react-native-uuid';
import { ITask } from './models/ITask';

export const mockTasks: ITask[] = [
    {
        id: uuid.v4().toString(),
        title: 'TypeScript',
    },
    {
        id: uuid.v4().toString(),
        title: 'React Native',
    },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'JavaScript',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'Vue',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'Java',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'C#',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'Python',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'Kotlin',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'PHP',
    // },
    // {
    //     id: uuid.v4().toString(),
    //     title: 'C++',
    // },
];