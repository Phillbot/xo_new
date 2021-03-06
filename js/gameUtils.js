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

  const compSymbol = symbol === "X" ? "O" : "X";

  if (compSymbol === "X" && emptyFills.length === fills.length) {
    fills[4].innerHTML = "X";
    setColor(fills);
    return;
  }

  const counts = [
    { schemaIndex: 0, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 1, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 2, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 3, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 4, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 5, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 6, busyPlayerFills: [], busyCompFills: [] },
    { schemaIndex: 7, busyPlayerFills: [], busyCompFills: [] },
  ];

  winSchemas.forEach((shema, index) => {
    shema.forEach((item) => {
      if (fills[item].innerHTML === symbol) {
        counts[index].busyPlayerFills = [
          ...counts[index].busyPlayerFills,
          item,
        ];
      }

      if (fills[item].innerHTML === compSymbol) {
        counts[index].busyCompFills = [...counts[index].busyCompFills, item];
      }
    });
  });

  const maxPlayer = counts.reduce((acc, curr) =>
    acc.busyPlayerFills.length > curr.busyPlayerFills.length ? acc : curr
  );

  const compLengths = counts.map(({ busyCompFills }) => busyCompFills.length);

  const maxCompLength = Math.max.apply(null, compLengths);

  const maxCompArray = counts.filter(({ busyCompFills }) => {
    console.log(busyCompFills);
    return busyCompFills.length === maxCompLength;
  });

  const playerLengths = maxCompArray.map(
    ({ busyPlayerFills }) => busyPlayerFills.length
  );
  const minPlayerLength = Math.min.apply(null, playerLengths);

  const maxComp = maxCompArray.find(
    ({ busyPlayerFills }) => busyPlayerFills.length === minPlayerLength
  );

  const schema =
    maxPlayer.busyPlayerFills.length > maxComp.busyCompFills.length
      ? maxPlayer
      : maxComp;

  const array =
    maxPlayer.busyPlayerFills.length > maxComp.busyCompFills.length
      ? maxPlayer.busyPlayerFills
      : maxComp.busyCompFills;

  const emptyFromMax = winSchemas[schema.schemaIndex].filter(
    (a) => array.indexOf(a) == -1
  );

  console.log(schema);

  console.log(emptyFromMax);

  const randomField = emptyFills[getRandomInt(0, emptyFills.length)];

  if (!fills[emptyFromMax[emptyFromMax.length - 1]].innerHTML) {
    fills[emptyFromMax[emptyFromMax.length - 1]].innerHTML = compSymbol;
    setColor(fills);
    checkWin(fills, winSchemas, symbol, line, lineClassSchema);
  } else {
    if (randomField) {
      randomField.innerHTML = compSymbol;
      setColor(fills);
      checkWin(fills, winSchemas, symbol, line, lineClassSchema);
    }
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
