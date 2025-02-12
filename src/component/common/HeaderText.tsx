import { Children } from "react";
import { Text, TextProps } from "react-native";

export default function HeaderText({ children, style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          fontSize: 24,
          fontWeight: "bold",
          color: "black",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
