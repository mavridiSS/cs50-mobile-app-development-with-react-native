import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import { vibrate } from "./utils";

const DEFAULT_WORK_TIMER = 25; // in minutes
const DEFAULT_REST_TIMER = 5; // in minutes

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workTimer: DEFAULT_WORK_TIMER, // in minutes
      restTimer: DEFAULT_REST_TIMER, // in minutes
      timer: DEFAULT_WORK_TIMER * 60, // in seconds
      isWorkingTimer: true,
      isRunning: false
    };
  }

  checkTimer = () => {
    const {
      isRunning,
      timer,
      isWorkingTimer,
      restTimer,
      workTimer
    } = this.state;
    if (isRunning && !timer) {
      vibrate();
      this.setState({
        timer: isWorkingTimer ? Number(restTimer) * 60 : Number(workTimer) * 60,
        isWorkingTimer: !this.state.isWorkingTimer
      });
    }
  };

  dec = () => {
    this.setState(
      prevState => ({
        timer: prevState.timer - 1
      }),
      this.checkTimer
    );
  };

  startTimer = () => {
    this.interval = setInterval(this.dec, 1000);

    this.setState({
      isRunning: !this.state.isRunning
    });
  };

  stopTimer = () => {
    clearInterval(this.interval);

    this.setState({
      isRunning: !this.state.isRunning
    });
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onStartStopPress = () => {
    this.state.isRunning ? this.stopTimer() : this.startTimer();
  };

  onResetPress = () => {
    const { isWorkingTimer } = this.state;
    clearInterval(this.interval);
    this.setState({
      timer: isWorkingTimer
        ? this.state.workTimer * 60
        : this.state.restTimer * 60,
      isRunning: false
    });
  };

  onChangeWorkTimer = time => {
    clearInterval(this.interval);
    const isWorkingTimerData = this.state.isWorkingTimer
      ? {
          timer: Number(time) * 60,
          isRunning: false
        }
      : {};
    this.setState({
      workTimer: time,
      ...isWorkingTimerData
    });
  };

  onChangeRestTimer = time => {
    const breakTimerData = !this.state.isWorkingTimer
      ? {
          timer: Number(time) * 60,
          isRunning: false
        }
      : {};
    clearInterval(this.interval);
    this.setState({
      restTimer: time,
      ...breakTimerData
    });
  };

  timeFormatter = () => {
    const { timer } = this.state;
    const mins = ~~(timer / 60);
    const secs = ~~timer % 60;
    return `${mins}: ${secs < 10 ? "0" : ""}${secs}`;
  };

  render() {
    const {
      timer,
      isRunning,
      isWorkingTimer,
      restTimer,
      workTimer
    } = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.centeredView}>
            <Text style={styles.timer}>
              {isWorkingTimer ? "Work Timer" : "Break Timer"}
            </Text>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.timer}>{this.timeFormatter()}</Text>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onStartStopPress}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {isRunning ? "Pause" : "Start"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.onResetPress}>
              <Text style={{ fontWeight: "bold", color: "white" }}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ fontWeight: "bold" }}>Work timer(min)</Text>
            <TextInput
              style={styles.input}
              onChangeText={timer => this.onChangeWorkTimer(timer)}
              value={workTimer.toString()}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ fontWeight: "bold" }}>Break timer(min)</Text>
            <TextInput
              style={styles.input}
              onChangeText={timer => this.onChangeRestTimer(timer)}
              value={restTimer.toString()}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 35,
    marginBottom: 10
  },
  button: {
    width: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10
  },
  timer: {
    fontSize: 40
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  input: {
    height: 35,
    width: 120,
    marginLeft: 5,
    borderColor: "black",
    borderWidth: 2
  },
  centeredView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
