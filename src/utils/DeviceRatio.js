import Device from 'react-native-device-detection'

const deviceSizePercent = Device.width / 100
const ratio = 8 // The ratio to compute across all devices

export function computeSize(size) {
  return deviceSizePercent * (size / ratio)
}

export const deviceWidth = Device.width
export const deviceHeight = Device.height
