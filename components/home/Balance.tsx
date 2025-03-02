import React from 'react';
import { View, Text } from 'react-native';
import balanceStyles from "./balance_components/styles";
import { BackArrow } from '../common/icons/BackArrowIcon';

const Balance = ({ route, navigation }: any) => {

  const handleWithdraw = async () => {

  }

  const handleTranfer = async () => {

  }

  return (
    <View style={balanceStyles.background}>
      <View style={balanceStyles.header}>
        <BackArrow onPress={() => navigation.goBack()}/>
      </View>


      <View style={balanceStyles.contentContainer}>
        <Text style={{color: "white", position: 'absolute', 'top': 180}}>Coming Soon👅👅</Text>
        {/* Graph of PNL/Port value will go here */}
        {/* <View style={balanceStyles.graphPlaceholder}> */}
          {/* Placeholder for graph */}
        {/* </View> */}

        {/* Open Orders dropdown will go here */}
        {/* <View style={balanceStyles.ordersContainer}> */}
          {/* Orders content */}
        {/* </View> */}
      </View>

    </View>
  );
};

export default Balance;