import Image from "next/image"
import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
  size?: number | string
}

export function Loader({ className, size = 48 }: LoaderProps) {
  // Use numeric size if possible for width/height props
  const dimension = typeof size === 'number' ? size : parseInt(size as string) || 48;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative flex items-center justify-center">
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-electric/20 rounded-full blur-xl animate-pulse" />
          
          <Image 
            src="/dscrd-logo-icon.png" 
            alt="Loading..." 
            width={dimension} 
            height={dimension}
            className="object-contain animate-[spin_3s_linear_infinite]"
            unoptimized
          />
      </div>
    </div>
  )
}

export function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <Loader size={80} />
        </div>
    )
}
