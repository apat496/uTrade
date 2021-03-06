import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class Table extends Component {
  renderHeader() {
    return this.props.headerContent.map((cell, i) => {
      var width = window.width / this.props.headerContent.length;
      return (
        <View key={i} style={[styles.cell, {width: width}]}>
          <Text style={styles.cellText}>{cell}</Text>
        </View>
      );
    });
  }

  renderRow(row, rowNum) {
    var width = window.width / row.length;
    var color = this.props.rowColors ? this.props.rowColors[rowNum] : "black";
    return row.map((cell, i) => {
      return (
        <View key={i} style={[styles.cell, {width: width}]}>
          <Text style={[styles.cellText], {color}}>{cell}</Text>
        </View>
      );
    });
  }

  renderContents() {
    return this.props.tableContents.map((row, i) => {
      return (
        {
          ...this.props.rowPressHandler ?
          <TouchableOpacity key={i}
                            style={styles.row}
                            onPress={() => this.props.rowPressHandler(i)}
          >
            {this.renderRow(row, i)}
          </TouchableOpacity> :
          <View key={i} style={styles.row}>
            {this.renderRow(row, i)}
          </View>
        }
      );
    });
  }

  render() {
    return (
      <View style={styles.column}>
        <View style={styles.headerRow}>
          {this.renderHeader()}
        </View>
        {this.renderContents()}
      </View>
    );
  }
}

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "powderblue",
    flexDirection: "row"
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
  },
  table: {
  },
  row: {
    flexDirection: "row"
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "dimgray"
  },
  column: {
    flexDirection: "column"
  },
  cell: {
    height: 30,
    borderColor: "black",
    borderWidth: 2
  },
  cellText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  }
});
