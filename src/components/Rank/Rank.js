import React from 'react';


function Rank({ name,entries }) {
  
  return (
    <div>
      <p className="black f2">This app only works with online pictures for security reasons</p>
      <div className="white f3">
        {`${name.toUpperCase()}, your Current Rank is .....`}
      </div>
      <div className="white f1">
        {entries}
      </div>
    </div>
  ) 
}

export default Rank;
