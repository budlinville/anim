import { Platform } from "react-native";

export const onMobile = (): boolean => Platform.OS === "android" || Platform.OS === "ios";
