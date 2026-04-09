import * as React from "react"
import { PropsWithChildren, useRef, useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import type { MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 70
const DEFAULT_DISTANCE = 160
const DEFAULT_DISABLEMAGNIFICATION = false

const dockVariants = cva(
  "mx-auto flex h-[64px] w-max items-center justify-center gap-3 rounded-2xl border p-2.5 transition-all duration-700 animate-holo",
  {
    variants: {
      scrolled: {
        true: "bg-white/98 backdrop-blur-3xl border-zinc-200/50 shadow-[0_0_40px_rgba(255,255,255,0.3)]",
        false: "bg-zinc-50/95 backdrop-blur-2xl border-white/60 shadow-[0_0_20px_rgba(0,0,0,0.06)]",
      },
    },
    defaultVariants: {
      scrolled: false,
    },
  }
);

// --- Masterpiece: Canvas Particle Component ---
const DockParticles = ({ mouseX }: { mouseX: MotionValue<number> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: any[] = [];
    const count = 15;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mX = mouseX.get();
      const rect = canvas.getBoundingClientRect();

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Reactive swirl if mouse is near
        if (mX !== Infinity) {
          const dx = (mX - rect.left) - p.x;
          const dy = (rect.height / 2) - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            p.x += dx * 0.05;
            p.y += dy * 0.05;
          }
        }

        ctx.fillStyle = `rgba(161, 161, 170, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX]);

  return <canvas ref={canvasRef} className="absolute inset-x-4 inset-y-2 w-[calc(100%-32px)] h-[calc(100%-16px)] pointer-events-none opacity-40 z-0" />;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);
    const glowX = useSpring(useMotionValue(0), { stiffness: 450, damping: 28 });

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<DockIconProps>(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification,
            distance: iconDistance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          const rect = e.currentTarget.getBoundingClientRect();
          glowX.set(e.clientX - rect.left);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            mouseX.set(e.touches[0].pageX);
            const rect = e.currentTarget.getBoundingClientRect();
            glowX.set(e.touches[0].clientX - rect.left);
          }
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className, scrolled: (props as any).scrolled }), "relative overflow-hidden group/dock", {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {/* Masterpiece Effects: Prismatic Glass, Active Particles & Circuitry */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.14] bg-[radial-gradient(#a1a1aa_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
        
        {/* Dynamic Refraction Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x,_50%)_50%,rgba(99,102,241,0.08),rgba(217,70,239,0.05),transparent_60%)] opacity-0 group-hover/dock:opacity-100 transition-opacity duration-1000"
          style={{ "--x": useTransform(glowX, (v) => `${v}px`) } as any}
        />

        <DockParticles mouseX={mouseX} />
        
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(0,0,0,0.02),rgba(0,0,0,0),rgba(0,0,0,0.02))] bg-[length:100%_3px,4px_100%] animate-pulse" />
        
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.03),transparent_70%)]" />
        
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouseX = useMotionValue(Infinity)

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Masterpiece Physics: Weighted springs for tactical organic movement
  const targetSize = disableMagnification ? size : magnification
  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 1.2,
    stiffness: 280,
    damping: 22,
  })

  const yFloating = useSpring(useMotionValue(0), { stiffness: 60, damping: 12 });
  const yPull = useTransform(scaleSize, [size, magnification], [0, -6]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      yFloating.set(Math.sin(Date.now() / 1500) * 3);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ 
        width: scaleSize, 
        height: scaleSize, 
        padding, 
        y: useTransform([yFloating, yPull], ([f, p]) => (f as number) + (p as number)) 
      }}
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.92, rotate: -3 }}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-300",
        "hover:bg-zinc-100/50 active:bg-zinc-200 shadow-[0_4px_10px_rgba(0,0,0,0)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      {/* Precision Scanning Glow Effect */}
      <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 bg-gradient-to-tr from-zinc-500/10 via-transparent to-transparent blur-md -z-10 transition-opacity duration-500" />
      <div className="text-zinc-800 group-hover/dock:text-black transition-colors uppercase font-bold text-sm tracking-tight">{children}</div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
