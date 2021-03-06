import React, { ReactElement, useState } from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder} from 'react-native';
import taskStore from '../services/stores/taskStore';

const {width} = Dimensions.get('window');

interface ListItemProps {
	id: string;
	title: string;
}

const ListItem: React.FC<ListItemProps> = ({id, title}): ReactElement => {
    let scrollViewEnabled = true;
    const gestureDelay = -35;
    const [position] = useState<any>(new Animated.ValueXY());
    const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: (evt, gestureState) => false,
		onMoveShouldSetPanResponder: (evt, gestureState) => true,
		onPanResponderTerminationRequest: (evt, gestureState) => false,
		onPanResponderMove: (evt, gestureState) => {
			if (gestureState.dx > 35) {
				scrollViewEnabled = false;
				let newX = gestureState.dx + gestureDelay;
				position.setValue({x: newX, y: 0});
			}
			if (gestureState.dx < 35) {
				scrollViewEnabled = false;
				let newX = gestureState.dx + gestureDelay;
				position.setValue({x: newX, y: 0});
			}
      	},
    	onPanResponderRelease: (evt, gestureState) => {
			// Right swipe
			if (gestureState.dx < 150) {
			Animated.timing(position, {
				toValue: {x: 0, y: 0},
				duration: 150,
				useNativeDriver: false
			}).start(() => {
				scrollViewEnabled = true;
			});
			} else {
				Animated.timing(position, {
					toValue: {x: width, y: 0},
					duration: 300,
					useNativeDriver: false
				}).start(() => {
					taskStore.deleteTask(id);
					scrollViewEnabled = true;
				});
			}
			// Left swipe
			if (gestureState.dx > -50) {
				Animated.timing(position, {
					toValue: {x: 0, y: 0},
					duration: 150,
					useNativeDriver: false
				}).start(() => {
					scrollViewEnabled = true;
				});
			} else {
				Animated.timing(position, {
					toValue: {x: 0, y: 0},
					duration: 300,
					useNativeDriver: false
				}).start(() => {
					taskStore.setEditTaskId(id);
					scrollViewEnabled = true;
				});
			}
		},
    });

    return (
        <View style={styles.listItem}>
          <Animated.View style={[position.getLayout()]} {...panResponder.panHandlers}>
            <View style={styles.absoluteCell}>
              <Text style={styles.absoluteCellText}>DELETE</Text>
            </View>
            <View style={styles.innerCell}>
              <Text style={styles.taskTitle}>
                {title}
              </Text>
            </View>
            <View style={styles.absoluteCell2}>
                <Text style={styles.absoluteCellText}>EDIT</Text>
            </View>
          </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
		height: 65,
		marginLeft: -100,
		marginRight: -100,
		marginTop: 30,
		cjustifyContent: 'center',
		backgroundColor: '#4269b3',
    },
	taskTitle: {
		color: 'white',
		fontSize: 20
	},
    absoluteCell: {
    	position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		width: 1000,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#e26363',
		marginLeft: -900
    },
    absoluteCell2: {
		position: "absolute",
		width: 100,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		top: 0,
		bottom: 0,
		right: 0
    },
    absoluteCellText: {
		margin: 16,
		color: 'white'
    },
    innerCell: {
		width: width,
		height: 65,
		marginLeft: 100,
		backgroundColor: '#6fa8dc',
		justifyContent: 'center',
		alignItems: 'center',
    },
});

export default ListItem
