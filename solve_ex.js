const solve = (timeStr) => {

    const separatorIndex = timeStr.indexOf(':');
    const leftTimeDigit = timeStr.slice(0, separatorIndex);
    const rightTimeDigit = timeStr.slice(separatorIndex + 1);
  
    if (checkInputFormat(timeStr, separatorIndex, leftTimeDigit, rightTimeDigit)) {
     
      const newLeftTimeDigit = '' + swap(leftTimeDigit);
      const newRightTimeDigit = '' + swap(rightTimeDigit);
  
      if (checkDigit(+rightTimeDigit, +newRightTimeDigit, 'RIGHT')) {
        return leftTimeDigit + ':' + newRightTimeDigit;
      } else {
        if (checkDigit(+leftTimeDigit, +newLeftTimeDigit, 'LEFT')) {
          return newLeftTimeDigit + ':' + newRightTimeDigit;
        } else {
          return timeStr;
        }
      }
    }
  }
  
  const swap = (timeDigit) => {
    return '' + timeDigit[1] + timeDigit[0];
  }
  
  const checkDigit = (prevDigit, newDigit, digitPosition) => {
      switch(digitPosition) {
          case 'RIGHT':
              return isNewDigitGrater(prevDigit, newDigit) && isDigitFormatCorrect(59, newDigit);
          case 'LEFT':     
              return isNewDigitGrater(prevDigit, newDigit) && isDigitFormatCorrect(24, newDigit);
          default: 
              return undefined
      }
  }
  
  const isNewDigitGrater = (prevDigit, newDigit) => { return +newDigit > +prevDigit }
  
  const isDigitFormatCorrect = (maxValue, digit) => { return maxValue > +digit && +digit > 0 }
  
  const checkInputFormat = (timeStr, separatorIndex, leftDigit, rightDigit) => {
    /* 
    check if time format equals  
    0:01 or 1:00 -> 4 characters 
    to 23:59 -> 5 characters 
    */
    if (timeStr.length > 5 && timeStr.length < 4) {
      console.error('Invalid time format. WRONG LENGTH');
      return false;
    } else {
      if (!(
          separatorIndex === 2 ||
          separatorIndex === 1
        )) {
        console.error('Invalid time format. SEPARATOR PLACE')
        return false;
      } else {
        if (+leftDigit < 0 || +rightDigit < 0) {
          console.error('Invalid time format. NEGATIVE SEGMENTS');
          return false;
        } else {
            if(isDigitFormatCorrect(24, leftDigit) && isDigitFormatCorrect(59, leftDigit)) {
              return true;
          } else {
              console.error('Invalid time format. SEGMENTS EXTENDS MAXIMAL TIME VALUES');
          }
        }
      }
    }
  }
  