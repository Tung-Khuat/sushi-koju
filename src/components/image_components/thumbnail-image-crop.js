import React from 'react';

const defaultSize = 270;

export default function ThumbnailImageCrop(props) {
  const {
    size, src, unit, customClass, alt, maxWidth, minWidth,
  } = props;
  const [eleWidth, setEleWidth] = React.useState(null);
  const eleRef = React.useRef(null);

  React.useEffect(() => {
    setEleWidth(eleRef.current.offsetWidth);
  });

  function calcSize() {
    if (size > 50 || unit != 'px') {
      return `${size}${unit || 'px'}`;
    }
    return `${defaultSize}px`;
  }


  function imgBackground() {
    const isUnitInPx = Boolean(unit == 'px' || !unit);
    if (src) {
      return (
        {
          backgroundImage: `url(${src})`,
          width: calcSize(),
          height: isUnitInPx ? calcSize() : '',
          paddingTop: isUnitInPx ? '' : '100%',
          maxWidth: maxWidth || null,
          minWidth: minWidth || null,
        }
      );
    }
    return (
      {
        backgroundColor: 'rgb(160, 160, 160)',
        width: calcSize(),
        height: eleWidth,
        paddingTop: '100%',
        maxWidth: maxWidth || null,
        minWidth: minWidth || null,
      }
    );
  }
  return (
    <span ref={eleRef} className={`cropped ${customClass || 'contain-cropped'}`} alt={alt} style={imgBackground()} />
  );
}
