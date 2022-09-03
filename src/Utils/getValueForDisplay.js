export const valueToStringNumber = (value, numberLength = 3) => {
  let digitalsQty = Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;
  let res = value;
  if (digitalsQty > 4) {
    let thousandQty =
      digitalsQty % 3 === 0 ? Math.floor(digitalsQty / 3)-1 : Math.floor(digitalsQty / 3);
    thousandQty = thousandQty - Math.round(numberLength/3)+1
    let divider = Math.pow(1000, thousandQty);
    res = Math.round(res / divider);
    if (thousandQty === 1) res = res + 'K';
    if (thousandQty === 2) res = res + 'M';
    if (thousandQty === 3) res = res + 'B';
    if (thousandQty > 3) {
      let charCode = 61 + (thousandQty % 26);
      let char = String.fromCharCode(charCode).toLocaleLowerCase();
      res += char;
    }
  }
  return res;
};

export const pow2StringNumber = (pow2)=> {
    let value =  Math.pow(2, pow2);
    return valueToStringNumber(value)
  };

