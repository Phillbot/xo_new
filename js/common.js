const gameControls = (controlsStyle, resetButtonStyle, containerStyle) => {
  const controls = document.querySelector(".controls");
  const container = document.querySelector(".container");
  const resetButton = document.querySelector(".btn.over");

  controls.style.display = controlsStyle;
  resetButton.style.display = resetButtonStyle;
  container.style.display = containerStyle;
};

const getRandomInt = (min, max) => {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
    Math.ceil(min)
  );
};

const applyStats = () => {
  if (!localStorage.xoStats) {
    const stats = {
      winPlayer: 0,
      winComp: 0,
    };

    localStorage.xoStats = JSON.stringify(stats);
  }

  const stats = document.querySelector(".stats");

  const statsParse = JSON.parse(localStorage.xoStats);

  stats.innerHTML =
    "Player - " + statsParse.winPlayer + " | " + "COMP - " + statsParse.winComp;
};

const addWinStats = (symbol, winSymbol) => {
  const statsParse = JSON.parse(localStorage.xoStats);

  if (symbol === winSymbol) {
    //win player

    const updateStatsWinPlayer = {
      ...statsParse,
      winPlayer: statsParse.winPlayer + 1,
    };

    localStorage.xoStats = JSON.stringify(updateStatsWinPlayer);

    return;
  }

  const updateStatsWinComp = {
    ...statsParse,
    winComp: statsParse.winComp + 1,
  };

  localStorage.xoStats = JSON.stringify(updateStatsWinComp);
};
