const solve = (timeStr) => {
  const possibleNums = possibleNumbers(timeStr);
  const perms = permutations(possibleNums);
  const quasiTimes = makeQuasiTimesFromPossiblePermutations(perms);
  let validTimes = quasiTimes.filter((qt) => {
    const extractedTimeData = extractDataFromString(qt);
    return checkInputFormat(
      qt,
      extractedTimeData.separatorIndex,
      extractedTimeData.leftDigit,
      extractedTimeData.rightDigit
    )
      ? qt
      : undefined;
  });

  validTimes = validTimes.filter((vt) => {
    console.log(vt)
    const extractedVt = extractDataFromString(vt);
    const extractedTimeStr = extractDataFromString(timeStr);
    if (+extractedVt.leftDigit > +extractedTimeStr.leftDigit) {
      return vt;
    } else {
      if (
        +extractedVt.leftDigit === +extractedTimeStr.leftDigit &&
        +extractedVt.rightDigit > +extractedTimeStr.rightDigit
      ) {
        return vt;
      } else {
        return undefined;
      }
    }
  });
  
  console.log(validTimes)

  return validTimes[0];
};

const extractDataFromString = (timeStr) => {
  const separatorIndex = timeStr.indexOf(':');
  return {
    separatorIndex,
    leftDigit: timeStr.slice(0, separatorIndex),
    rightDigit: timeStr.slice(separatorIndex + 1),
  };
};

const permutations = (numberArray) => {
  if (numberArray.length <= 2)
    return numberArray.length === 2
      ? [numberArray, [numberArray[1], numberArray[0]]]
      : numberArray;
  return numberArray.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([
          ...numberArray.slice(0, i),
          ...numberArray.slice(i + 1),
        ]).map((val) => [item, ...val])
      ),
    []
  );
};

const makeQuasiTimesFromPossiblePermutations = (possiblePermutations) => {
  return possiblePermutations.map(
    (charArr) => charArr[0] + charArr[1] + ':' + charArr[2] + charArr[3]
  );
};


const checkDigit = (prevDigit, newDigit, digitPosition) => {
  switch (digitPosition) {
    case 'RIGHT':
      return (
        isNewDigitGrater(prevDigit, newDigit) &&
        isDigitFormatCorrect(59, newDigit)
      );
    case 'LEFT':
      return (
        isNewDigitGrater(prevDigit, newDigit) &&
        isDigitFormatCorrect(24, newDigit)
      );
    default:
      return undefined;
  }
};

const possibleNumbers = (timeStr) => {
  return [...timeStr].filter((s) => s !== ':');
};

const isNewDigitGrater = (prevDigit, newDigit) => {
  return +newDigit > +prevDigit;
};

const isDigitFormatCorrect = (maxValue, digit) => {
  return maxValue >= +digit && +digit > 0;
};

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
    if (!(separatorIndex === 2 || separatorIndex === 1)) {
      console.error('Invalid time format. SEPARATOR PLACE');
      return false;
    } else {
      if (+leftDigit < 0 || +rightDigit < 0) {
        console.error('Invalid time format. NEGATIVE SEGMENTS');
        return false;
      } else {
        if (
          isDigitFormatCorrect(23, leftDigit) &&
          isDigitFormatCorrect(59, rightDigit)
        ) {
          return true;
        } else {
          console.error(
            'Invalid time format. SEGMENTS EXTENDS MAXIMAL TIME VALUES'
          );
          return false;
        }
      }
    }
  }
};
