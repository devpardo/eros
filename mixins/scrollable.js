export default (keys = []) => {
  const watch = keys.reduce((props, key) => {
    props[key] = function(val) {
      this.$scrollable(!val);
    };
    return props;
  }, {});

  return {
    watch
  };
};
