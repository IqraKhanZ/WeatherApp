import React, { useState } from 'react';
import Weather from './Components/Weather';

const App = () => {
  const [theme, setTheme] = useState('default');
  const [isNight, setIsNight] = useState(false);

  return (
    <div className={`app ${theme} ${isNight ? 'night' : 'day'}`}>
      <Weather setTheme={setTheme} setIsNight={setIsNight} />
    </div>
  );
};

export default App;
