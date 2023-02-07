const StyleDictionary =
  require('style-dictionary').extend('tokens.config.json');

const pixelsToRem = (px) => {
  const rem = 16;
  return `${px / rem}rem`;
};

const appendPX = (value) => {
  return `${value}px`;
};

StyleDictionary.registerFilter({
  name: 'excludeTokens',
  matcher: function(token) {
    return token.attributes.category !== 'border' && token.attributes.category !== 'boxShadow';
  }
})

StyleDictionary.registerTransform({
  name: 'toRem/pxToRem',
  type: 'value',
  matcher(token) {
    return (
      (token.type === 'dimension' ||
      token.type === 'fontSizes' ||
      token.type === 'paragraphSpacing' ||
      token.type === 'sizing' ||
      token.type === 'spacing' ||
      token.type === 'borderRadius' ||
      token.path[0] === 'breakpoint' ||
      token.path[0] === 'fontSize') && token.attributes.type !== 'multi-value'
    );
  },
  transformer(token) {
    return pixelsToRem(token.value);
  },
});

StyleDictionary.registerTransform({
  name: 'toRem/appendRem',
  type: 'value',
  matcher(token) {
    return (
        token.attributes.type === 'multi-value'
    );
  },
  transformer(token) {
    let a = token.value.split(' ');

    let b = a.map(a => (
        pixelsToRem(a)
    ));

    return b.join(' ');
  },
});

StyleDictionary.registerTransform({
  name: 'toPX/appendPX',
  type: 'value',
  matcher(token) {
    return token.type === 'borderWidth';
  },
  transformer(token) {
    return appendPX(token.value);
  },
});

StyleDictionary.buildAllPlatforms();
