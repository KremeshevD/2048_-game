export const getValueForDisplay = (pow2) => {
    let value = Math.pow(2, pow2)
    let digitalsQty = Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1
    let res = value
    if (digitalsQty > 4) {
        let thousandQty = Math.floor(digitalsQty/3)
        let divider = Math.pow(1000, thousandQty)
        res = Math.ceil(res/divider)
        if (thousandQty === 1) res = res + "K"
        if (thousandQty === 2) res = res + "M"
        if (thousandQty === 3) res = res + "B"
        if (thousandQty > 3) {
            let charCode = 65 + thousandQty%26
            let char = String.fromCharCode(charCode).toLocaleLowerCase()
            res += char
        }
    }

    return res
}