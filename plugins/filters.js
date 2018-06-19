import Vue from "vue";
import dayjs from "dayjs";
Vue.filter(
  "date",
  (value, format = "") => (value ? dayjs(value).format(format) : "No Date")
);

Vue.filter(
  "maskChars",
  (value, length) => {
    let n = value.indexOf("@");
    let domain = value.split("@").pop();
    let email_name = value.substring(0, n);
    let rep_email = value.substring(0, n - length);
    let res = rep_email.replace(/./g, "*");
    let last_four = email_name.substring(email_name.length - length);

    return res + last_four + "@" + domain;
  }

  // var last_char = 4;
  // var str = "bryanaafsdf@fadsfadsf.com";
  // var n = str.indexOf("@"); // index of @
  // var domain = str.split("@").pop(); //fadsfadsf.com
  // var email_name = str.substring(0, n);
  // var rep_email = str.substring(0, n - last_char);

  // var res = rep_email.replace(/./g, "*");
  // var last_four = email_name.substring(email_name.length - last_char);

  // document.getElementById("demo2")
  // .innerHTML = res + last_four + '@' + domain;
);

// TODO: Find a much better way ? : Ralph Eclipse
Vue.filter("replaceChar", (value, length, end, char = "*") => {
  const targetLength =
    value.length === length
      ? length - 1
      : length < value.length
        ? length
        : value.length;
  const subString = end
    ? value.substr(value.length - length)
    : value.substr(0, targetLength);
  return value.replace(subString, char.repeat(subString.length));
});
