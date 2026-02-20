interface TrendingCardProps {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  onClick?: () => void;
}

const TrendingCard = ({ image, badge, badgeColor, title, onClick }: TrendingCardProps) => {
  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[16/7] group cursor-pointer w-full text-left active:scale-[0.98] transition-transform"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      <span
        className="absolute top-3 left-3 text-xs lg:text-sm font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-card backdrop-blur-[30px]"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        {badge}
      </span>
      <p className="absolute bottom-3 left-3 right-3 text-sm lg:text-base font-semibold text-card leading-tight">
        {title}
      </p>
    </button>
  );
};

export default TrendingCard;
