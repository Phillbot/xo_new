window.onload = () => {
  gameControls("block", "none", "none");
  applyStats();

  const buttons = document.querySelectorAll(".btn.game-btn");
  const resetButton = document.querySelector(".btn.over");
  const line = document.querySelector(".line");

  const startGame = function () {
    const symbol = this.innerHTML;

    if (additionalSymbols.includes(symbol)) {
      const fills = document.querySelectorAll(".fill");

      gameControls("none", "block", "block");

      if (symbol === "O") {
        compChoise(fills, winSchemas, symbol);
      }

      setFunctionalToFills(fills, winSchemas, symbol, line, lineClassSchema);

      resetButton.onclick = () =>
        reset(fills, winSchemas, symbol, line, lineClassSchema);
    }
  };

  buttons.forEach((btn) => (btn.onclick = startGame));
};
