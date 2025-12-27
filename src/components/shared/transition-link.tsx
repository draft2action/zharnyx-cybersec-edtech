"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode, MouseEvent } from "react";
import { useLoader } from "@/components/shared/loader-context";
import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TransitionLink({
  children,
  href,
  onClick,
  className,
  ...props
}: TransitionLinkProps & {
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { setIsLoading } = useLoader();

  const handleTransition = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Only trigger loader if we are actually navigating to a new page (basic check)
    // and exclude modifier keys (cmd/ctrl click) which open new tabs
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      console.log("TransitionLink clicked: triggering loader");
      setIsLoading(true);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleTransition}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
