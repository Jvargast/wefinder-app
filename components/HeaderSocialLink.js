import React from "react";

const HeaderSocialLink = ({ Icon, Link }) => {
  return (
    <div className="cursor-pointer flex flex-col justify-center items-center text-white pr-1">
      <a
        target="_blank"
        rel="noreferrer"
        href={Link}
      >
        <Icon />
      </a>
    </div>
  );
};

export default HeaderSocialLink;
