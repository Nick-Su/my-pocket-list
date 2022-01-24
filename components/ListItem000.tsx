import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder} from 'react-native';
import taskStore from '../services/stores/taskStore';

const {width} = Dimensions.get('window');

interface ListItemProps {
    id: string,
    title: string,
    success: (id: string) => void,
    setScrollEnabled: (enable: boolean) => void,
}

interface ListItemState {
    position: any
}

export default class ListItem extends React.PureComponent<ListItemProps, ListItemState> {
  gestureDelay: number;
  scrollViewEnabled: boolean;
  panResponder: any;
  position: any;

  constructor(props: any) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({x: newX, y: 0});
        }
        if (gestureState.dx < 35) {
            this.setScrollViewEnabled(false);
            let newX = gestureState.dx + this.gestureDelay;
            position.setValue({x: newX, y: 0});
          }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150,
            useNativeDriver: false
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: width, y: 0},
            duration: 300,
            useNativeDriver: false
          }).start(() => {
            this.props.success(this.props.id);
            this.setScrollViewEnabled(true);
          });
        }

        if (gestureState.dx > -50) {
            Animated.timing(this.state.position, {
              toValue: {x: 0, y: 0},
              duration: 150,
              useNativeDriver: false
            }).start(() => {
              this.setScrollViewEnabled(true);
            });
          } else {
            Animated.timing(this.state.position, {
              toValue: {x: 0, y: 0},
              duration: 300,
              useNativeDriver: false
            }).start(() => {
                taskStore.setEditTaskId(this.props.id)
                this.setScrollViewEnabled(true);
            });
          }
      },
    });

    this.panResponder = panResponder;
    this.state = {position};
  }

  setScrollViewEnabled(enabled: boolean) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  render() {
    return (
      <View style={styles.listItem}>
        <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText}>DELETE</Text>
          </View>

          

          <View style={styles.innerCell}>
            <Text>
              {this.props.title}
            </Text>
          </View>
        
          <View style={styles.absoluteCell2}>
              <Text style={styles.absoluteCellText}>Edit</Text>
          </View>


        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    marginLeft: -100,
    marginRight: -100,
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  absoluteCell2: {
    position: "absolute",
    backgroundColor: 'cyan',
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 0,
    bottom: 0,
    right: 0
  },
  absoluteCellText: {
    margin: 16,
    color: '#FFF',
  },
  innerCell: {
    width: width,
    height: 80,
    marginLeft: 100,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});