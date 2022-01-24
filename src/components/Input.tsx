import React, { ReactElement, useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import taskStore from '../services/stores/taskStore';
import uuid from 'react-native-uuid';
import { ITask } from '../services/models/ITask';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

const ObservedInput: React.FC = (): ReactElement => {
    const [inputValue, setInputValue] = useState<string>('');
    const inputField = useRef(null);

    useEffect(() => {
        if (taskStore.editableTaskId !== '') {
            inputField?.current.focus();
        }

        setInputValue(taskStore.editableTitle);
    }, [taskStore.editableTitle])

    const onSubmit = (): void => {
        if (!inputValue) {
            return;
        }

        if (taskStore.editableTaskId !== '') {
            taskStore.saveChanges(inputValue);
            Keyboard.dismiss();
            return
        }

        const newTask: ITask = {
            id: uuid.v4().toString(),
            title: inputValue,
        }
        taskStore.addTask(newTask)
       
        setInputValue("");
        Keyboard.dismiss();
    }

    const handleBlur = (): void => {
        taskStore.cancelEditing();
    }

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setInputValue}
                onBlur={handleBlur}
                placeholder="Buy milk"
                ref={inputField}
                value={inputValue}
                style={styles.input}
            />

            <Button icon="check" mode="contained" onPress={onSubmit} style={styles.button}>
                Save
            </Button>
        </View >
    )
}

const ObservableInput = observer(ObservedInput);

const Input: React.FC = (): ReactElement => {
    return <ObservableInput />
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a6bdd7',
        width: '100%',
        height: 75,
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    input: {
        height: 60,
        flex: 2,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        xflex: 1,
        zheight: 60,
        marginLeft: 10
    },
})

export default Input;
