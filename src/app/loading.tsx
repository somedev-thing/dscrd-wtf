import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative w-32 h-32">
        <Image 
          src="/assets/img/loading.gif" 
          alt="Loading..." 
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  )
}
