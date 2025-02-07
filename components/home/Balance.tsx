import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import balanceStyles from "../../styles/balance_page";
import Colors from "../../styles/colors";
import { Ionicons } from '@expo/vector-icons';

const Balance = ({ route, navigation }: any) => {

  const handleWithdraw = async () => {

  }

  const handleTranfer = async () => {

  }

  return (
    <View style={balanceStyles.background}>
      <View style={balanceStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons style={balanceStyles.backArrow} name="chevron-back" size={32} />
        </TouchableOpacity>
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