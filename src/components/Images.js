import Image from "next/image";
import Link from "next/link";

const Images = ({ image, heading, description, link }) => {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-full my-10">
      <div className="w-[90%] gap-10 ">
        <div className="w-[90vw] h-[27rem] mx-auto overflow-hidden sm:w-[90vw] ">
          <Image
            src={image}
            alt=""
            layout=""
            width={1600} // Placeholder for width (adjust based on your actual image size)
            height={432} // Placeholder for height (proportional to 27rem)
            className="w-[100%] h-96 md:h-[27rem]  object-cover"
          />
        </div>

        <Link
          className="mt-10 text-xl md:text-2xl  text-green-950 underline hover:text-green-700"
          href={link}
        >
          {heading}
        </Link>
        <p className="my-4 text-black font-normal">{description}</p>
      </div>
    </div>
  );
};

export default Images;
