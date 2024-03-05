export const Square = ({ children, isSelected, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  const className = `square ${isSelected ? "is-selected" : ""}`;

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
