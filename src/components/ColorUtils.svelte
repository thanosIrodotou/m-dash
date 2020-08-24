<script context="module">
  export let randomHexColorCode = () => {
    let number = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + number.slice(0, 6);
  };
  export let hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
</script>
