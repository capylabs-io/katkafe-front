type Props = { onClick: () => void };

export const EmptyCatCard = ({ onClick }: Props) => {
  return (
    <div className="relative h-fit">
      <img
        src="/images/empty-cat.png"
        alt="Empty Cat"
        className="w-[100px] h-[130px]"
      />
      <img
        src="/images/plus.png"
        alt=""
        className="absolute left-1/2 -translate-x-1/2 bottom-3 cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};
