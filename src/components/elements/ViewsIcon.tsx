import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleProp, TextStyle } from "react-native";

type ViewsIconProps = {
  color?: string;
  style?: StyleProp<TextStyle>;
};

const ViewsIcon: React.FC<ViewsIconProps> = ({ color, style }) => {
  return <Entypo style={style} name="eye" size={24} color={color ?? "gray"} />;
};

export default ViewsIcon;
