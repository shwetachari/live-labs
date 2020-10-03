import React from 'react';
import { AppContext } from '../../../AppContext';
import ClickableRoom from '../../common/ClickableRoom';
import roomECabinet from '../../../images/rooms/E/cabinet.png';
import '../../../fonts/pigpenCipher/stylesheet.css';
import '../../../styles/Cabinet.scss';

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
      },
      {
        title: 'Telepathy in Rats',
        year: '2011',
        color: 'springer',
        tilted: true,
      },
      {
        title: 'Twin Telepathy',
        subtitle: 'A science',
        year: '2001',
        color: 'blue',
      },
      formattedRoomEBooks[0],
      {
        title: 'The Scientific Method',
        year: '1980',
        color: 'green',
        titleStyle: 'fancy',
        tilted: true,
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
      formattedRoomEBooks[2],
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
      },
      formattedRoomEBooks[3],
      {
        title: 'The Scientific Method',
        year: '1980',
        color: 'green',
        titleStyle: 'fancy',
        tilted: true,
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
        tilted: true,
      },
      {
        title: 'Twin Studies: A History',
        year: '1999',
        color: 'green',
        titleStyle: 'fancy',
      },
      formattedRoomEBooks[5],
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
        tilted: true,
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
        tilted: true,
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
          <div className={book.tilted ? 'book-tilted' : ''}>
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
