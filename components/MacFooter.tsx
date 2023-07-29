import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";

const Dashbord = ({ width }: { width: MotionValue<number> }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="transparent"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-layout-dashboard"
      style={{ width, height: width }}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </motion.svg>
  );
};

const Home = ({ width }: { width: MotionValue<number> }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="transparent"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-home"
      style={{ width, height: width }}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </motion.svg>
  );
};

const Code = ({ width }: { width: MotionValue<number> }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="transparent"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-code"
      style={{ width, height: width }}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </motion.svg>
  );
};

const MacFooter = () => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(0);
  let width = useTransform(mouseX, [0, 800, 1200], [40, 80, 40]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { pageX, pageY } = e;
    mouseX.set(pageX);
    mouseY.set(pageY);
  };
  const IconComponents = [
    { Icon: Dashbord, href: "dashboard" },
    { Icon: Home, href: "" },
    { Icon: Code, href: "" },
  ];

  return (
    <footer className="hidden sm:block max-desktop fixed bottom-5 left-1/2 -translate-x-1/2">
      <div
        className="flex h-16 items-end justify-center gap-4 rounded-3xl bg-gray-700 px-12 pb-3"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          mouseY.set(0);
        }}
      >
        {IconComponents.map((item, index) => (
          <AppIcon
            key={index}
            Icon={item.Icon}
            mouseX={mouseX}
            href={item.href}
          />
        ))}
      </div>
    </footer>
  );
};

const AppIcon = ({
  Icon,
  mouseX,
  href,
}: {
  Icon: React.FC<{ width: MotionValue<number> }>;
  mouseX: MotionValue<number>;
  href: string;
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (value) => {
    const bounds = iconRef.current?.getBoundingClientRect();
    const boundsX = bounds?.x || 0;
    const halfWidth = bounds?.width ? bounds.width / 2 : 0;

    return Math.abs(value - (boundsX + halfWidth));
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [20, 80, 20]);
  let width = useSpring(widthSync, {
    damping: 20,
    mass: 0.2,
    stiffness: 200,
  });
  return (
    <Link href={`/${href}`}>
      <div
        className={`flex items-center justify-center rounded-full bg-slate-500 p-2.5 text-white

      `}
        ref={iconRef}
      >
        <Icon width={width} />
      </div>
    </Link>
  );
};

export default MacFooter;
