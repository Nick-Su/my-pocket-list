import React, { ReactElement } from 'react';
import taskStore from '../services/stores/taskStore';
import { observer } from 'mobx-react-lite';
import SwipeableList from '../components/SwipableList';
import { StyleSheet, SafeAreaView } from 'react-native';

const ObservedTasks: React.FC = (): ReactElement => {
    return <SwipeableList tasks={taskStore.getTasks()} />
}

const ObservableTasks = observer(ObservedTasks);

const TaskContainer: React.FC = (): ReactElement => {
    return (
        <SafeAreaView style={styles.container}>
            <ObservableTasks />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default TaskContainer
