import * as _ from 'lodash';
import React from 'react';

const buttonCoordinates = [
  [
    [77.7, 28.9],
    [82, 38.5],
  ],
  [
    [77.8, 41.5],
    [82.1, 51.1],
  ],
  [
    [77.9, 54.4],
    [82.2, 64.1],
  ],
  [
    [78.2, 67.4],
    [82.1, 76.8],
  ],
  [
    [78.25, 80.3],
    [82.15, 89.8],
  ],
];

export function getInteractiveButtonConfigs(elementConfigs, onClick) {
  const activeIndices = _.reject(
    elementConfigs.map((element, i) => (element.weight ? i : null)),
    _.isNil
  );
  const inactiveIndices = _.reject(
    elementConfigs.map((element, i) => (element.weight ? null : i)),
    _.isNil
  );
  const disabledIndices = _.reject(
    _.times(5, (i) => (i >= elementConfigs.length ? i : null)),
    _.isNil
  );

  return [
    ...activeIndices.map((i) => ({
      onClick,
      boundingBox: buttonCoordinates[i],
      element: <div className="monitorButton"></div>,
    })),
    ...inactiveIndices.map((i) => ({
      onClick,
      boundingBox: buttonCoordinates[i],
    })),
    ...disabledIndices.map((i) => ({
      onClick,
      boundingBox: buttonCoordinates[i],
      element: <div className="monitorButtonDisabled"></div>,
    })),
  ];
}

export function getElementNamesConfig(elementConfigs, onClick) {
  const boundingBox = [
    [20.5, 11],
    [70, 79.5],
  ];
  const listElement = (
    <ul className="elementsList">
      {elementConfigs.map((config) => (
        <li key={`element_${config.name}`} className="elementName">
          {config.name}
        </li>
      ))}
    </ul>
  );
  return {
    boundingBox,
    onClick,
    element: listElement,
  };
}
