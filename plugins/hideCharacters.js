import Vue from "vue";

Vue.filter("hideChar", (value, _str, _length, _typeOf) => {
  let _val = value.split("");
  switch (_str) {
    case "start":
      for (let i = 0; i < _length; i++) _val.shift();
      let _newVal = _val.join("");
      for (let i = 0; i < _length; i++) _newVal = `*${_newVal}`;

      if (_typeOf === "bank-account") {
        let _nVal = _newVal.split("");
        let _newRet = [];

        for (let i = 0; i < _nVal.length; i++) {
          _newRet.push(_nVal[i]);
          if ((i + 1) % 4 === 0) _newRet.push(" ");
        }

        return _newRet.join("");
      }
      return _newVal;
    case "end":
      for (let i = 0; i < _length; i++) _val.pop();
      let __newVal = _val.join("");
      for (let i = 0; i < _length; i++) __newVal += "*";

      if (_typeOf === "bank-account") {
        let _nVal = _newVal.split("");
        let _newRet = [];

        for (let i = 0; i < _nVal.length; i++) {
          _newRet.push(_nVal[i]);
          if ((i + 1) % 4 === 0) _newRet.push(" ");
        }

        return _newRet.join("");
      }
      return __newVal;
    default:
      break;
  }
});
