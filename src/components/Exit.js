import React from 'react';
import '../styles/Exit.scss';

const ExitScene = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        background: 'black',
        color: 'white',
        fontSize: 50,
        fontFamily: `'Reenie Beanie', sans-serif`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textShadow: '0px 0px 20px white',
      }}
      className="exitScreen"
    >
      <div style={{ marginBottom: '2%' }} className="animated delay1">
        How... How did you make it out alone?
      </div>

      <div style={{ marginBottom: '2%' }} className="animated delay2">
        It's literally impossible for a single person to have—
      </div>

      <div style={{ marginBottom: '2%' }} className="animated delay3">
        Wait.
      </div>

      <div style={{ marginBottom: '6%' }} className="animated delay4">
        Unless...
      </div>

      <div
        style={{ fontSize: 60, marginBottom: '2%' }}
        className="animated delay5"
      >
        Perhaps you weren't truly alone?
      </div>

      <div
        style={{ fontSize: 30, color: '#e3c3d9' }}
        className="animated delay6"
      >
        ✧ Happy birthday to the OG twins, Sneha and Shruti! ✧
      </div>

      <div
        style={{ marginTop: '6%' }}
        className="button animated delay7"
        onClick={() => window.location.reload()}
      >
        play again?
      </div>
    </div>
  );
};

export default ExitScene;
