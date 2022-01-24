import React, { ReactElement, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ITask } from '../services/models/ITask';
import ListItem from './ListItem';

interface SwipeableListProps {
    tasks: ITask[]
}

const SwipeableList: React.FC<SwipeableListProps> = ({tasks}): ReactElement => {
    const [data, setData] = useState<ITask[]>([]);

    useEffect(() => {
        setData(tasks)
    }, [tasks])

    const renderItem = (item: ITask): ReactElement => {
        return (
            <ListItem
              title={item.title}
              id={item.id}
            />
        );
    }

    return (
        <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
        />
    )
}

export default SwipeableList
