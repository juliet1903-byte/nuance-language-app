interface TrendingCardProps {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
}

const TrendingCard = ({ image, badge, badgeColor, title }: TrendingCardProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[16/7] group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      <span
        className="absolute top-3 left-3 text-[10px] lg:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-card backdrop-blur-[30px]"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        {badge}
      </span>
      <p className="absolute bottom-3 left-3 right-3 text-sm lg:text-base font-semibold text-card leading-tight">
        {title}
      </p>
    </div>
  );
};

export default TrendingCard;
