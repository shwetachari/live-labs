import React from 'react';
import { AppContext } from '../../../AppContext';
import Nonogram from '../../common/Nonogram';

class Book extends React.Component {
  static contextType = AppContext;

  getContent = () => {
    const {
      setFields,
      nonograms,
      nonogramsSolutionStatus,
      isBlackLightOn,
    } = this.context;
    const nonogram = nonograms[4];
    const lastPage = (
      <div style={{ width: '100%', height: '100%' }} className="lastBookPage">
        {isBlackLightOn ? (
          <Nonogram
            code={nonogram.code}
            rows={nonogram.rows}
            cols={nonogram.columns}
            solution={nonogram.solution}
            isSolved={nonogramsSolutionStatus[4]}
            onMatch={() => {
              const nonogramSolutionsStatusCopy = [...nonogramsSolutionStatus];
              nonogramSolutionsStatusCopy[4] = true;
              setFields({
                nonogramsSolutionStatus: nonogramSolutionsStatusCopy,
                activeDialogue: 'I think this is it!',
              });
            }}
          />
        ) : (
          <div
            className="emptyPage"
            onClick={() =>
              setFields({
                activeDialogue: `It looks like there are indentations on the page, but I don't see any writing.`,
              })
            }
          ></div>
        )}
      </div>
    );

    return [
      [
        <div>
          <h1>Parapsychology</h1>
          <p>
            <strong>T Y P E S:</strong>
          </p>
          <p>
            - <strong>Latent telepathy</strong>, formerly known as "deferred
            telepathy", describes a transfer of information with an observable
            time-lag between transmission and reception.
          </p>
          <p>
            -{' '}
            <strong>
              Retrocognitive, precognitive, and intuitive telepathy
            </strong>{' '}
            describes the transfer of information about the past, future or
            present state of an individual's mind to another individual.
          </p>
        </div>,
        <div>
          <p>
            - <strong>Emotive telepathy</strong>, also known as remote influence
            or emotional transfer, describes the transfer of kinesthetic
            sensations through altered states.
          </p>
          <p>
            - <strong>Superconscious telepathy</strong> describes use of the
            supposed superconscious to access the collective wisdom of the human
            species for knowledge.
          </p>
        </div>,
      ],
      [
        <div>
          <p>
            Within parapsychology, telepathy, often along with precognition and
            clairvoyance, is described as an aspect of extrasensory perception
            (ESP) or "anomalous cognition" that parapsychologists believe is
            transferred through a hypothetical psychic mechanism they call
            "psi".
          </p>
          <p>
            Parapsychologists have reported experiments they use to test for
            telepathic abilities. Among the most well known are the use of Zener
            cards and the Ganzfeld experiment.
          </p>
        </div>,
        <div>
          <h1>Twin telepathy</h1>
          <p>
            Twin Flame or Twin Soul Telepathy enables Twins to hear each other’s
            thoughts and converse mentally, and aside from the actual verbal
            communication many experience that they can sense their Twin’s
            feelings and moods, including suddenly knowing things they have
            never known before – this is called claircognisance; the
            transferring of “chunks” of knowledge energetically.
          </p>
        </div>,
      ],
      [
        <div>
          <p>
            <strong>Claircognizance</strong>
          </p>
          <p>
            the ability for a person to acquire psychic knowledge without
            knowing how or why they knew it.
          </p>
        </div>,
        lastPage,
      ],
    ];
  };

  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  updateContent = (operator) => {
    const { currentPage } = this.state;
    const { triggerSound } = this.context;
    let nextPage = Math.max(0, currentPage + operator);
    nextPage = Math.min(this.getContent().length - 1, nextPage);
    this.setState({ currentPage: nextPage });
    if (nextPage !== currentPage) triggerSound('paper', 5);
  };

  render() {
    const { isBlackLightOn } = this.context;
    const { currentPage, flipped } = this.state;

    return (
      <div className={isBlackLightOn ? 'book blacklight' : 'book'}>
        <div className="content">
          <div className="left page" onClick={() => this.updateContent(-1)}>
            {this.getContent()[currentPage][0]}
          </div>
          <div className="right page" onClick={() => this.updateContent(1)}>
            {this.getContent()[currentPage][1]}
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
