const getEmptyFills = (fills) => {
  const emptyFills = [];

  for (let i = 0; i < fills.length; i++) {
    const fill = fills[i];

    if (!fill.innerHTML) {
      emptyFills.push(fill);
    }
  }

  return emptyFills;
};

const compChoise = (fills, winSchemas, symbol, line, lineClassSchema) => {
  const emptyFills = getEmptyFills(fills);

  //here we can change logic of programm - find player in chemas
  //and push in index where win its more really

  const randomField = emptyFills[getRandomInt(0, emptyFills.length)];

  if (randomField) {
    randomField.innerHTML = symbol === "X" ? "O" : "X";
    setColor(fills);
    checkWin(fills, winSchemas, symbol, line, lineClassSchema);
  }
};

const reset = (fills, line) => {
  fills.forEach((fill) => {
    fill.innerHTML = "";
    gameControls("block", "none", "none");
    win = false;
  });

  line.className = "line";
  line.style = null;
};

const setColor = (fills) => {
  for (let i = 0; i < fills.length; i++) {
    const fill = fills[i];
    fill.style.color = colorScheme[fill.innerHTML];
  }
};

const rounResult = (winSymbol, fills, winSchemas, line, lineClassSchema) => {
  winSchemas.forEach((shema, index) => {
    if (
      fills[shema[0]].innerHTML === winSymbol &&
      fills[shema[1]].innerHTML === winSymbol &&
      fills[shema[2]].innerHTML === winSymbol
    ) {
      line.classList.add(lineClassSchema[index]);
      line.style.backgroundColor = winSymbol === "X" ? "red" : "green";
    }
  });

  setTimeout(() => {
    alert("WIN " + winSymbol);
    reset(fills, line);
    applyStats();
  }, 100);
};

const checkWin = (fills, winSchemas, symbol, line, lineClassSchema) => {
  const stop = (winSymbol) => {
    win = true;
    addWinStats(symbol, winSymbol);
    rounResult(winSymbol, fills, winSchemas, line, lineClassSchema);
  };

  const emptyFills = getEmptyFills(fills);

  winSchemas.forEach((schema) => {
    let countX = 0;
    let countO = 0;

    if (!win) {
      schema.forEach((checIndex) => {
        switch (fills[checIndex].innerHTML) {
          case "X":
            countX += 1;
            break;
          case "O":
            countO += 1;
            break;
        }

        if (countX === 3) {
          stop("X");
          return;
        }

        if (countO === 3) {
          stop("O");
          return;
        }
      });
    }
  });

  if (emptyFills.length === 0 && !win) {
    setTimeout(() => {
      reset(fills, line);
      alert("NO WIN");
      return;
    }, 100);
  }
};

const setFunctionalToFills = (
  fills,
  winSchemas,
  symbol,
  line,
  lineClassSchema
) => {
  for (let i = 0; i < fills.length; i++) {
    const fill = fills[i];

    fill.onclick = function () {
      if (win) {
        return;
      }

      if (this.innerHTML) {
        alert("Fill contain " + this.innerHTML);
        return;
      }

      this.innerHTML = symbol;
      setColor(fills);
      checkWin(fills, winSchemas, symbol, line, lineClassSchema);
      if (!win) {
        compChoise(fills, winSchemas, symbol, line, lineClassSchema);
      }
    };
  }
};
