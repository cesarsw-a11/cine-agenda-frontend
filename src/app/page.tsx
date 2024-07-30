"use client"
import Image from "next/image";
import Link from "next/link";

enum BookingStep {
  MovieSelection,
  Availability,
  Reservation,
  Confirmation
}


export default function Home() {
  
  return (
    <div className="bg-gradient-to-r from-green-700 via-green-800 to-blue-900 text-white">
      <main className="min-h-screen">
        <section>
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col lg:flex-row lg:justify-center items-center h-screen p-4">
              
              <div className="flex space-x-4">
                <div className="relative w-auto">
                  <Image
                    className='rounded-md'
                    src="/poster.jpg"
                    alt="Kung Fu Panda Movie Poster"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-x-4">
                <h1 className="text-3xl font-bold">¡Kung Fu Panda 4!</h1>
                <p>¡We are only 1 week away from having these two premieres!</p>
                <Link href='/reservation' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" >
                  Buy tickets
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

