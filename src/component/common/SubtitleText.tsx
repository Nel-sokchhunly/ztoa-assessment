import { Text, StyleSheet, TextProps } from 'react-native';

export default function SubtitleText({ children, style, ...props }: TextProps) {

  return (
    <Text style={[
      styles.text,
      style
    ]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold'
  }
})

