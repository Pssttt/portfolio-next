import { TECH_STACK, EXPERTISE } from "./constants";
import { getTechIconUrl } from "./utils";
import { AWSIcon } from "./AWSIcon";

interface TechItemProps {
  name: string;
}

function TechItem({ name }: TechItemProps) {
  const iconUrl = getTechIconUrl(name);

  return (
    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
      {name === "AWS" ? (
        <AWSIcon className="w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity text-cat-sapphire" />
      ) : iconUrl ? (
        <img
          src={iconUrl}
          alt={`${name} icon`}
          className="w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
          loading="lazy"
        />
      ) : (
        <span className="text-primary/60 group-hover:text-primary transition-colors">
          ▸
        </span>
      )}
      <span>{name}</span>
    </div>
  );
}

function CategoryCard({
  category,
  color,
  items,
}: {
  category: string;
  color: string;
  items: string[];
}) {
  return (
    <div className="p-4 sm:p-5 border-2 border-primary/20 rounded hover:border-primary/40 transition-all hover:bg-primary/5">
      <h3
        className={`font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 ${color}`}
      >
        {category}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <TechItem key={item} name={item} />
        ))}
      </div>
    </div>
  );
}

function ExpertiseItem({ skill }: { skill: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
      <span className="text-primary/60">◆</span>
      <span className="text-sm">{skill}</span>
    </div>
  );
}

export function TechStack() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Tech Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {TECH_STACK.map((stack) => (
          <CategoryCard
            key={stack.category}
            category={stack.category}
            color={stack.color}
            items={stack.items}
          />
        ))}
      </div>

      {/* Expertise Section */}
      <div className="pt-6 sm:pt-8 border-t border-primary/30">
        <h3 className="text-cat-red font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-5">
          Professional Expertise
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXPERTISE.map((skill) => (
            <ExpertiseItem key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
