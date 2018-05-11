let replecableArray = ['View', 'Text', 'Image', 'ScrollView', 'Value',
  'ValueXY', 'Interpolation', 'Node', 'decay', 'timing', 'spring', 'add',
  'divide', 'multiply', 'modulo', 'diffClamp', 'delay', 'sequence', 'parallel',
  'stagger', 'loop', 'event', 'createAnimatedComponent', 'attachNativeEvent', 'forkEvent', 'unforkEvent'];


export default function myImportInjector({ types: t }) {
  const replacableValues = new Set(replecableArray);

  const initRanges = [];
  const rangesToReplacement = [];
  return {
    visitor: {
      Program(path) {
        for (let i = 0; i < path.parent.comments.length; i++) {
          path.parent.comments[i].value.trim() === 'Animated' &&
          initRanges.push(path.parent.comments[i].start - 2);
        }
      },
      BlockStatement({ node: { start, end } }) {
        if (initRanges.indexOf(start) === -1)
          return;
        rangesToReplacement.push({ start, end });
      },
      CallExpression(path) {
        const { node } = path;
        let foundRange = false;
        for (let i = 0; i < rangesToReplacement.length; i++) {
          if (node.start >= rangesToReplacement[i].start && node.start <= rangesToReplacement[i].end) {
            foundRange = true;
            break;
          }
        }
        if (!(foundRange && node.callee.type === 'Identifier' && replacableValues.has(node.callee.name)))
          return;

        const { callee: { name } } = node;
        const wrapper = t.memberExpression(t.identifier('Animated'), t.identifier(name));
        path.replaceWith(t.callExpression(wrapper, node.arguments));
      }
    },
  };
}