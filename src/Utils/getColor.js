import { COLORS } from "../Game/config"

export const getColor = (value) => {
    return COLORS[value%COLORS.length]
}