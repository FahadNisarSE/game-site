import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from "react-icons/fa";

const links = [
  { href: "#discord", icon: <FaDiscord /> },
  { href: "#twitter", icon: <FaTwitter /> },
  { href: "#github", icon: <FaGithub /> },
  { href: "#twitch", icon: <FaTwitch /> },
];

export default function Footer() {
  return (
    <footer className="w-screen bg-violet-300 py-4">
      <div className="contianer mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left text-black">
          &copy; Nova 2024, All rights resever.
        </p>
        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <a
          href="#privacy-policy"
          className="text-center text-sm hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
