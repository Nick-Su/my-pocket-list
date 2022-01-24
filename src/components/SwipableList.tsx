import React, { ReactElement, useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
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
        return <ListItem title={item.title} id={item.id} />
    }
     
    const Listrenderer = () => {
        if (tasks.length > 0) {
            return  <FlatList data={data} renderItem={({item}) => renderItem(item)} />
        } else {
            return <Text style={styles.warningMessage}>Yay! Nothing to do :)</Text>
        }
    }
    return (
        <Listrenderer />
    )
}

const styles = StyleSheet.create({
    warningMessage: {
        textAlign: 'center',
        fontSize: 20,
        padding: 30
    }
})

export default SwipeableList
