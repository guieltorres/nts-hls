import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { StyleProp, TextStyle } from "react-native";

type ThumbsUpIconProps = {
  color?: string;
  style?: StyleProp<TextStyle>;
};

const ThumbsUpIcon: React.FC<ThumbsUpIconProps> = ({ color, style }) => {
  return (
    <Entypo
      style={style}
      name="thumbs-up"
      size={24}
      color={color ?? "#5160d2"}
    />
  );
};

export default ThumbsUpIcon;
