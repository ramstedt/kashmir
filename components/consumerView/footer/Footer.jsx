import { FaMapMarkerAlt } from "react-icons/fa";
import {
  BsTelephoneFill,
  BsTwitter,
  BsFacebook,
  BsLinkedin,
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-cobalt text-white p-2 b-0 w-full border border-b-0 border-l-0 border-r-0 border-t-2 border-bluebell">
      <div className="flex justify-around flex-col md:flex-row mt-3">
        <div className="flex flex-col mb-5 content-center space-y-6">
          <p className="flex items-center">
            <span className="text-[1.8rem] mr-3">
              <FaMapMarkerAlt />
            </span>
            <a
              href="https://g.page/yrgo-gbg?share"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bluebell"
            >
              Lärdomsgatan 3 <br />
              417 56 Göteborg
            </a>
          </p>
          <p className="flex items-center">
            <span className="text-[1.5rem] ml-1 mr-3">
              <BsTelephoneFill />
            </span>
            <a href="tel:+4631123456" className="hover:text-bluebell">
              031-123456
            </a>
          </p>
          <p className="flex items-center">
            <span className="text-[1.8rem] mr-3">
              <MdEmail />
            </span>
            <a
              href="mailto:contact@kashmir.app"
              className="hover:text-bluebell"
            >
              contact@kashmir.app
            </a>
          </p>
        </div>
        <div className="flex flex-col max-w-md">
          <h2 className="text-white">About Kashmir</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium, fugiat. Enim ad velit ullam perferendis minus iure
            laudantium, similique esse provident dolores ipsum voluptatum odio
            unde ducimus sint, saepe laboriosam?
          </p>
          <div className="flex justify-around my-5 text-[2rem]">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bluebell"
            >
              <BsTwitter aria-label="twitter" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bluebell"
            >
              <BsFacebook aria-label="facebook" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-bluebell"
            >
              <BsLinkedin aria-label="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
