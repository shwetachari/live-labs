import * as _ from 'lodash';
import React from 'react';

import rhino from './images/rooms/E/rhino.svg';
import violin from './images/rooms/E/violin.svg';
import fire from './images/rooms/E/fire.svg';
import candy from './images/rooms/E/candy.svg';
import raccoon from './images/rooms/E/raccoon.svg';
import banana from './images/rooms/E/banana.svg';
import knife from './images/rooms/E/knife.svg';
import gem from './images/rooms/E/gem.svg';

import pigpenAI from './images/rooms/B/pigpen_cipher_key_a_i.svg';
import pigpenJR from './images/rooms/B/pigpen_cipher_key_j_r.svg';
import pigpenSV from './images/rooms/B/pigpen_cipher_key_s_v.svg';
import pigpenWZ from './images/rooms/B/pigpen_cipher_key_w_z.svg';

/*
Footer to display only in modal that the element icons are displayed:
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
*/

const elements = {
  rhino: {
    elements: [
      { name: 'Rhodium', weight: 102.906 },
      { name: 'Indium', weight: 114.818 },
      { name: 'Oxygen' },
    ],
    icon: rhino,
  },
  violin: {
    elements: [
      { name: 'Vanadium', weight: 50.942 },
      { name: 'Iodine', weight: 126.904 },
      { name: 'Oxygen' },
      { name: 'Lithium', weight: 6.941 },
      { name: 'Nitrogen', weight: 14.007 },
    ],
    icon: violin,
  },
  fire: {
    elements: [
      { name: 'Fluorine', weight: 18.998 },
      { name: 'Iodine' },
      { name: 'Rhenium', weight: 186.207 },
    ],
    icon: fire,
  },
  candy: {
    elements: [
      { name: 'Calcium', weight: 40.078 },
      { name: 'Nitrogen' },
      { name: 'Dysprosium', weight: 162.5 },
    ],
    icon: candy,
  },
  raccoon: {
    elements: [
      { name: 'Radium', weight: 226.025 },
      { name: 'Carbon', weight: 12.011 },
      { name: 'Cobalt', weight: 58.933 },
      { name: 'Oxygen' },
      { name: 'Nitrogen' },
    ],
    icon: raccoon,
  },
  banana: {
    elements: [
      { name: 'Barium', weight: 137.328 },
      { name: 'Sodium' },
      { name: 'Sodium', weight: 22.99 },
    ],
    icon: banana,
  },
  knife: {
    elements: [
      { name: 'Potassium', weight: 39.098 },
      { name: 'Nitrogen' },
      { name: 'Iodine', weight: 126.904 },
      { name: 'Iron', weight: 55.845 },
    ],
    icon: knife,
  },
  ruby: {
    elements: [
      { name: 'Ruthenium', weight: 101.07 },
      { name: 'Boron', weight: 10.811 },
      { name: 'Yttrium', weight: 88.906 },
    ],
    icon: gem,
  },
};

const potions = {
  alpha: {
    symbol: 'α',
    color: 'red',
    viscosity: 29,
  },
  beta: {
    symbol: 'β',
    color: 'green',
    viscosity: 28,
  },
  gamma: {
    symbol: 'γ',
    color: 'blue',
    viscosity: 9,
  },
  delta: {
    symbol: 'δ',
    color: 'blue',
    viscosity: 11,
  },
  epsilon: {
    symbol: 'ε',
    color: 'green',
    viscosity: 15,
  },
  zeta: {
    symbol: 'ζ',
    color: 'red',
    viscosity: 28,
  },
  eta: {
    symbol: 'η',
    color: 'green',
    viscosity: 12,
  },
  theta: {
    symbol: 'θ',
    color: 'blue',
    viscosity: 10,
  },
  iota: {
    symbol: 'ι',
    color: 'green',
    viscosity: 25,
  },
  kappa: {
    symbol: 'κ',
    color: 'blue',
    viscosity: 11,
  },
  lambda: {
    symbol: 'λ',
    color: 'red',
    viscosity: 26,
  },
  mu: {
    symbol: 'μ',
    color: 'green',
    viscosity: 17,
  },
};

const morseCode = [
  '—— —— —— —— ——',
  '• —— —— —— ——',
  '• • —— —— ——',
  '• • • —— ——',
  '• • • • ——',
  '• • • • •',
  '—— • • • •',
  '—— —— • • •',
  '—— —— —— • •',
  '—— —— —— —— •',
];

export const nonograms = {
  c: {
    code: 0,
    columns: [[3], [1, 1], [1, 1], [1, 1], [1, 1]],
    rows: [[3], [1, 1], [1, 1], [1, 1], [3]],
    solution: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
  },
  a: {
    code: 8,
    columns: [[3], [1, 1], [1, 1], [3], [1]],
    rows: [[2], [1, 1], [1, 1], [1, 1], [2, 1]],
    solution: [
      [0, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 1],
    ],
  },
  s: {
    code: 6,
    columns: [[1], [1, 1], [1, 1, 1], [1, 1], [1]],
    rows: [[2], [1, 1], [1], [1, 1], [2]],
    solution: [
      [0, 0, 1, 1, 0],
      [0, 1, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 0],
    ],
  },
  t: {
    code: 2,
    columns: [[1], [1], [5], [1], [1]],
    rows: [[5], [1], [1], [1], [1]],
    solution: [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  },
  o: {
    code: 5,
    columns: [[3], [1, 1], [1, 1], [1, 1], [3]],
    rows: [[3], [1, 1], [1, 1], [1, 1], [3]],
    solution: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
  },
  r: {
    code: 1,
    columns: [[5], [1], [1], [1], [1]],
    rows: [[1, 2], [2, 1], [1], [1], [1]],
    solution: [
      [1, 0, 1, 1, 0],
      [1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
  },
  p: {
    code: 3,
    columns: [[4], [1, 1], [1, 1], [1, 1], [2]],
    rows: [[3], [1, 1], [1, 1], [4], [1]],
    solution: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
    ],
  },
  l: {
    code: 7,
    columns: [[5], [1], [1], [1], [1]],
    rows: [[1], [1], [1], [1], [5]],
    solution: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ],
  },
  u: {
    code: 9,
    columns: [[4], [1], [1], [1], [4]],
    rows: [[1, 1], [1, 1], [1, 1], [1, 1], [3]],
    solution: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
  },
  x: {
    code: 4,
    columns: [[1, 1], [1, 1], [1], [1, 1], [1, 1]],
    rows: [[1, 1], [1, 1], [1], [1, 1], [1, 1]],
    solution: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ],
  },
};

export const yellowDoorKey = {
  A: 4,
  E: 9,
  I: 7,
  O: 5,
  U: 2,
  H: 1,
  N: 3,
  R: 6,
  S: 0,
  T: 8,
};

export const leftConfigs = {
  ABDoorCode: '9056',
  roomAPhonePasscode: '7481',
  roomASymbol: '☾',
  roomAComputerPassword: 'NOT EXPERIMENT',
  roomAStickyNote: (
    <div>
      <div style={{ display: 'inline-block', padding: 10 }}>___</div>
      <div style={{ display: 'inline-block', padding: 10 }}>_____</div>
      <div style={{ display: 'inline-block', padding: 10 }}>_</div>
      <div style={{ display: 'inline-block', padding: 10 }}>_______</div>
    </div>
  ),
  roomAStep1: (
    <div>
      <p>rat brain slice slide preparation</p>
      <p>
        ☀ step 1: submerge the slide an<strong>D</strong> brush into th
        <strong>E F</strong>lask and gently l<strong>I</strong>ft the brai
        <strong>N</strong> sl<strong>I</strong>ce on
        <strong>T</strong>o the slid<strong>E</strong> with the brush. Be carefu
        <strong>L</strong> not to destro<strong>Y</strong> any structures with
        the bristles.
      </p>
    </div>
  ),
  roomAStep2: (
    <div>
      <p>
        ☀ step 2: <strong>LE</strong>t the brain slice dry, then pipette the 2%
        a<strong>GA</strong>rose so<strong>L</strong>
        ution onto the slide to stain it.
      </p>
    </div>
  ),
  roomBLeftScreen: pigpenAI,
  roomBRightScreen: pigpenWZ,
  yellowDoorKey: _.pick(yellowDoorKey, ['H', 'N', 'R', 'S', 'T']),
  morseKey: _.filter(
    morseCode.map((code, i) => ({ num: i, code })),
    (_code, i) => i % 2 == 0
  ),
  roomEBooks: [
    {
      title: 'Thought Reading',
      subtitle: 'Supernatural Communication',
      year: '1984',
      titleStyle: 'fancy',
      symbol: 't',
    },
    {
      title: 'Dream Telepathy',
      year: '2017',
      titleStyle: 'bold',
      symbol: 'l',
    },
    {
      title: 'Parapsychology',
      year: '2008',
      titleStyle: 'fancy',
      symbol: 'z',
    },
    {
      title: 'Stochastic Volatility',
      year: '1995',
      titleStyle: 'bold',
      symbol: 'a',
    },
    {
      title: 'Gene expression in Twins',
      year: '1994',
      titleStyle: 'fancy',
      symbol: 'g',
    },
    {
      title: 'Superconscious Telepathy',
      year: '2011',
      titleStyle: 'bold',
      symbol: 'f',
    },
  ],
  roomEBookPositions: [],
  elementConfigs: _.map(
    ['rhino', 'violin', 'fire', 'candy'],
    (elementName) => elements[elementName].elements
  ),
  elementLockConfigs: _.map(
    ['raccoon', 'banana', 'knife', 'ruby'],
    (elementName) => ({
      icon: elements[elementName].icon,
      code: _.round(_.sumBy(elements[elementName].elements, 'weight'), 3)
        .toString()
        .split('.')
        .join(''),
      isLocked: true,
      lastGuess: [],
    })
  ),
  displayedPotions: [
    potions.beta,
    potions.theta,
    potions.alpha,
    potions.delta,
    potions.mu,
    potions.lambda,
  ],
  displayedPotionData: [
    potions.zeta,
    potions.iota,
    potions.kappa,
    potions.theta,
    potions.delta,
    potions.lambda,
  ],
  thermometerUnlockColor: 'red',
  thermometerUnlockTemp: _.sumBy(
    _.filter(potions, { color: 'red' }),
    'viscosity'
  ),
  nonograms: [nonograms.t, nonograms.x, nonograms.c, nonograms.r, nonograms.a],
};

export const rightConfigs = {
  ABDoorCode: '8374',
  roomASymbol: '☀',
  roomAPhonePasscode: '7481',
  roomAComputerPassword: 'DEFINITELY LEGAL',
  roomAStickyNote: (
    <div>
      <div>
        <div
          style={{
            fontSize: '20px',
            lineHeight: '40px',
            padding: 15,
            display: 'inline-block',
          }}
        >
          ▲
        </div>
        <div
          style={{
            fontSize: '70px',
            lineHeight: '40px',
            padding: 10,
            display: 'inline-block',
          }}
        >
          ♥
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '200px',
            lineHeight: '40px',
            padding: 10,
            display: 'inline-block',
          }}
        >
          ■
        </div>
        <div
          style={{
            fontSize: '80px',
            lineHeight: '40px',
            padding: 10,
            display: 'inline-block',
          }}
        >
          ●
        </div>
      </div>
    </div>
  ),
  roomAStep1: (
    <div>
      <p>
        ☾ step 2: <strong>EX</strong>amine the s<strong>PE</strong>
        cimen sta<strong>R</strong>t<strong>I</strong>ng at 4x under the
        <strong>M</strong>icroscop<strong>E</strong>. adjust the setti
        <strong>N</strong>gs and increase magnifica<strong>T</strong>
        ion to 10, 40, then 100x, adjusting again at each step.
      </p>
    </div>
  ),
  roomAStep2: (
    <div>
      <p>
        exami<strong>N</strong>ing the slide
      </p>
      <p>
        ☾ step 1: take y<strong>O</strong>ur prepared slide and place it onto
        the mechanical s<strong>T</strong>age of the microscope.
      </p>
    </div>
  ),
  roomBLeftScreen: pigpenJR,
  roomBRightScreen: pigpenSV,
  yellowDoorKey: _.pick(yellowDoorKey, ['A', 'E', 'I', 'O', 'U']),
  morseKey: _.reject(
    morseCode.map((code, i) => ({ num: i, code })),
    (_code, i) => i % 2 == 0
  ),
  roomEBooks: [
    {
      title: 'Gemini',
      year: '1965',
      titleStyle: 'fancy',
      symbol: 'u',
    },
    {
      title: 'Socioeconomic Twin Studies',
      year: '2020',
      titleStyle: 'fancy',
      symbol: 'd',
    },
    {
      title: 'Biological Psychology',
      year: '2013',
      titleStyle: 'bold',
      symbol: 'e',
    },
    {
      title: 'The Corsican Brothers',
      year: '1844',
      titleStyle: 'fancy',
      symbol: 'a',
    },
    {
      title: 'Fraternal Twins',
      year: '2003',
      titleStyle: 'bold',
      symbol: 'n',
    },
    {
      title: 'Debunking Psychics',
      year: '1991',
      titleStyle: 'bold',
      symbol: 'o',
    },
  ],
  roomEBookPositions: [],
  elementConfigs: _.map(
    ['raccoon', 'banana', 'knife', 'ruby'],
    (elementName) => elements[elementName].elements
  ),
  elementLockConfigs: _.map(
    ['rhino', 'violin', 'fire', 'candy'],
    (elementName) => ({
      icon: elements[elementName].icon,
      code: _.round(_.sumBy(elements[elementName].elements, 'weight'), 3)
        .toString()
        .split('.')
        .join(''),
      isLocked: true,
      lastGuess: [],
    })
  ),
  displayedPotions: [
    potions.zeta,
    potions.beta,
    potions.iota,
    potions.gamma,
    potions.kappa,
    potions.eta,
  ],
  displayedPotionData: [
    potions.alpha,
    potions.gamma,
    potions.eta,
    potions.beta,
    potions.mu,
  ],
  thermometerUnlockColor: 'blue',
  thermometerUnlockTemp: _.sumBy(
    _.filter(potions, { color: 'blue' }),
    'viscosity'
  ),
  nonograms: [nonograms.u, nonograms.l, nonograms.p, nonograms.s, nonograms.o],
};
