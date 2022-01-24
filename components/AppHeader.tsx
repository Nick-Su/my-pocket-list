import React, { ReactElement } from 'react';
import { Text, View, StyleSheet } from 'react-native'

const AppHeader: React.FC = (): ReactElement => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Pocket List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue'
    },
    header: {
        fontSize: 21
    }
})

export default AppHeader
