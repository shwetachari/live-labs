import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomECabinet from '../../../images/rooms/E/cabinet.png';
import '../../../fonts/pigpenCipher/stylesheet.css';
import '../../../styles/Cabinet.scss';
import { faCookie } from '@fortawesome/free-solid-svg-icons';

class RoomECabinet extends React.Component {
  static contextType = AppContext;

  getBookshelf = () => {
    const { setFields, roomEBooks } = this.context;

    const formattedRoomEBooks = roomEBooks.map((book) => ({
      ...book,
      color: 'umber',
    }));

    const fillerBooks = [
      {
        title: 'Psychology of Twins',
        year: '2011',
        color: 'springer',
        titleStyle: 'fancy',
        tilted: 'right',
      },
      {
        title: 'Telepathy in Rats',
        year: '2011',
        color: 'springer',
      },
      {
        title: 'Twin Telepathy',
        subtitle: 'A science',
        year: '2001',
        color: 'blue',
      },
      {
        ...formattedRoomEBooks[0],
        tilted: 'left',
      },
      {
        title: 'The Scientific Method',
        year: '1980',
        color: 'green',
        titleStyle: 'fancy',
      },
      {
        title: 'Psychology of Twins',
        year: '2011',
        color: 'springer',
        titleStyle: 'fancy',
      },
      {
        title: 'Identical Twin Studies',
        subtitle: 'A collection of experiments',
        year: '2019',
        color: 'blue',
        titleStyle: 'fancy',
      },
      formattedRoomEBooks[1],
      {
        ...formattedRoomEBooks[2],
        tilted: 'left',
      },
      {
        title: 'Understanding the Human Mind',
        year: '2016',
        color: 'green',
      },
      {
        title: 'Electrode Stimulation',
        subtitle: 'A reference for neuroscientists',
        year: '2020',
        color: 'green',
        titleStyle: 'fancy',
      },
      {
        title: 'Psychology',
        year: '2010',
        color: 'springer',
        tilted: 'left',
      },
      formattedRoomEBooks[3],
      {
        title: 'The Scientific Method',
        year: '1980',
        color: 'green',
        titleStyle: 'fancy',
      },
      {
        title: 'The Human Cortex',
        year: '2011',
        color: 'springer',
        titleStyle: 'fancy',
      },
      {
        title: 'Frued!',
        year: '2019',
        color: 'blue',
      },
      {
        title: 'Fraternal Twins',
        subtitle: 'What are they?',
        year: '2019',
        color: 'blue',
      },
      formattedRoomEBooks[4],
      {
        title: 'The CBT Method',
        year: '2007',
        color: 'green',
        tilted: 'right',
      },
      {
        title: 'Twin Studies: A History',
        year: '1999',
        color: 'green',
        titleStyle: 'fancy',
      },
      {
        ...formattedRoomEBooks[5],
        tilted: 'right',
      },
      {
        title: 'The Science of Human Emotion',
        year: '2019',
        color: 'blue',
        titleStyle: 'fancy',
      },
      {
        title: 'The DBT Handbook',
        year: '2009',
        color: 'springer',
        tilted: 'left',
      },
      {
        title: 'Identical Twins',
        subtitle: 'What are they?',
        year: '2019',
        color: 'blue',
      },
      {
        title: 'Twin Studies of Rats',
        year: '2019',
        color: 'blue',
        titleStyle: 'fancy',
      },
      {
        title: 'Social Psychology',
        year: '2011',
        color: 'green',
        tilted: 'right',
      },
      {
        title: 'Cognition in Rats',
        year: '2011',
        color: 'green',
      },
      {
        title: 'Human Experimentation',
        year: '1949',
        color: 'springer',
        titleStyle: 'fancy',
      },
    ];

    const modalContent = (
      <div className="bookshelf">
        {fillerBooks.map((book) => (
          <div
            className={
              book.tilted === 'right'
                ? 'book-tilted book-tilted-right'
                : book.tilted === 'left'
                ? 'book-tilted book-tilted-left'
                : ''
            }
          >
            <div
              className={`book book-${book.color} ${book.titleStyle || 'bold'}`}
            >
              <div className="text">
                {book.symbol && <div className="pigpen">{book.symbol}</div>}
                <div className="left">
                  <h2>{book.title}</h2>
                  <h3>{book.subtitle || ''}</h3>
                </div>
                <div className="right">
                  <p>{book.year}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    setFields({ modalContent });
  };

  render() {
    return (
      <ClickableRoom
        background={roomECabinet}
        interactiveElementConfigs={[
          {
            boundingBox: [
              [38.6, 27.2],
              [57.9, 79.8],
            ],
            onClick: this.getBookshelf,
          },
        ]}
      />
    );
  }
}

export default RoomECabinet;
