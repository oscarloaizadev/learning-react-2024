export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", JSON.stringify(turn));
};

export const resetGameFromStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
