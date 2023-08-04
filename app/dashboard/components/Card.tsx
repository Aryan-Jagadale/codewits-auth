"use client"

interface CardProps{
    label:string,
    percent:number
}


const Card = ({label,percent}:CardProps) => {
  return (
    <div
      className="lg:my-8 rounded shadow-sm bg-white border  duration-300 hover:-translate-y-1"
      
    >
      <div>
        <figure>
          <figcaption className="p-4">
            <p
              className="text-lg mb-4 font-bold leading-relaxed text-gray-500 "
             
            >{label}</p>

            <small
              className="leading-5 font-bold text-black text-xl"
              
            >{percent}%</small>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default Card