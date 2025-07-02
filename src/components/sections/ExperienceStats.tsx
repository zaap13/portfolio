import AnimatedNumbers from "../ui/AnimatedNumbers";

const StatItem = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-end justify-center xl:items-center">
        <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
            <AnimatedNumbers value={value} />+
        </span>
        {/*
          1. CORREÇÃO: A cor do texto do label agora reage ao tema.
        */}
        <h2 className="text-xl font-medium capitalize text-light/75 dark:text-dark/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
            {label}
        </h2>
    </div>
);

const ExperienceStats = () => {
    return (
        <div className="flex flex-col items-end justify-between space-y-16">
            <StatItem value={2} label="Anos de Experiência" />
            <StatItem value={20} label="Tecnologias na Stack" />
            <StatItem value={9999} label="Copos de café" />
        </div>
    );
};

export default ExperienceStats;