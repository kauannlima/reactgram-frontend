import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className=" bg-[#000] h-[50px] flex justify-center items-center 
                 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-t 
                 dark:border-white/10 shadow-lg"
    >
      <p className="text-[#9CA3AF] text-sm">ReactGram &copy; 2025 — Desenvolvido por Kauan L.</p>
    </footer>
  );
};

export default Footer;
