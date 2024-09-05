import { usePathname } from "next/navigation";

import {
  Bell,
  Bookmark,
  Briefcase,
  Clapperboard,
  Home,
  Settings,
  Tv,
  User,
} from "lucide-react";

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: "Home",
      href: "/",
      icon: <Home size={20} />,
      active: pathname === "/",
      position: "top",
    },
    {
      name: "Moies",
      href: "/movie",
      icon: <Clapperboard size={20} />,
      active: isNavItemActive(pathname, "/movie"),
      position: "top",
    },
    {
      name: "TV-Series",
      href: "/tvshow",
      icon: <Tv size={20} />,
      active: isNavItemActive(pathname, "/tvshow"),
      position: "top",
    },
    {
      name: "Bookmark",
      href: "/bookmark",
      icon: <Bookmark size={20} />,
      active: isNavItemActive(pathname, "/bookmark"),
      position: "top",
    },
  ];
};

export const MOVIE = {
  Title: "Captain America: Civil War",
  Year: "2016",
  Rated: "PG-13",
  Released: "06 May 2016",
  Runtime: "147 min",
  Genre: "Action, Sci-Fi",
  Director: "Anthony Russo, Joe Russo",
  Writer: "Christopher Markus, Stephen McFeely, Joe Simon",
  Actors: "Chris Evans, Robert Downey Jr., Scarlett Johansson",
  Plot: "With many people fearing the actions of super heroes, the government decides to push for the Hero Registration Act, a law that limits a hero's actions. This results in a division in The Avengers. Iron Man stands with this Act, claiming that their actions must be kept in check otherwise cities will continue to be destroyed, but Captain America feels that saving the world is daring enough and that they cannot rely on the government to protect the world. This escalates into an all-out war between Team Iron Man (Iron Man, Black Panther, Vision, Black Widow, War Machine, and Spider-Man) and Team Captain America (Captain America, Bucky Barnes, Falcon, Scarlet Witch, Hawkeye, and Ant Man) while a new villain emerges.",
  Language: "English, German, Xhosa, Russian, Romanian",
  Country: "United States, Germany",
  Awards: "16 wins & 73 nominations",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "7.8/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "90%",
    },
    {
      Source: "Metacritic",
      Value: "75/100",
    },
  ],
  Metascore: "75",
  imdbRating: "7.8",
  imdbVotes: "861,909",
  imdbID: "tt3498820",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$408,084,349",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

export const RottonTomato = () => {
  return (
    <svg
      type="positive"
      viewBox="0 0 80 80"
      preserveAspectRatio="xMidYMid"
      version="1.1"
      className="w-6 h-6"
    >
      <g transform="translate(1.33, 0)">
        <g transform="translate(0, 16.27)">
          <mask id="mask-2" fill="white">
            <polygon points="0.000109100102 0.246970954 77.0827837 0.246970954 77.0827837 63.7145228 0.000109100102 63.7145228"></polygon>
          </mask>
          <path
            d="M77.0137759,27.0426556 C76.2423237,14.6741909 69.9521992,5.42041494 60.4876349,0.246970954 C60.5414108,0.548381743 60.273195,0.925145228 59.9678008,0.791701245 C53.7772614,-1.91634855 43.2753527,6.84780083 35.9365975,2.25825726 C35.9917012,3.90539419 35.6700415,11.940249 24.3515353,12.4063071 C24.0843154,12.4172614 23.9372614,12.1443983 24.1062241,11.9512033 C25.619917,10.2247303 27.1482158,5.85360996 24.9507054,3.5233195 C20.2446473,7.74041494 17.5117012,9.32746888 8.48829876,7.23319502 C2.71103734,13.2740249 -0.562655602,21.5419087 0.08,31.8413278 C1.39120332,52.86639 21.0848133,64.8846473 40.9165145,63.6471369 C60.746888,62.4106224 78.3253112,48.0677178 77.0137759,27.0426556"
            fill="#FA320A"
            mask="url(#mask-2)"
          ></path>
        </g>
        <path
          d="M40.8717012,11.4648963 C44.946722,10.49361 56.6678838,11.3702905 60.4232365,16.3518672 C60.6486307,16.6506224 60.3312863,17.2159336 59.9678008,17.0572614 C53.7772614,14.3492116 43.2753527,23.113361 35.9365975,18.5238174 C35.9917012,20.1709544 35.6700415,28.2058091 24.3515353,28.6718672 C24.0843154,28.6828216 23.9372614,28.4099585 24.1062241,28.2167635 C25.619917,26.4902905 27.1478838,22.1191701 24.9507054,19.7888797 C19.8243983,24.3827386 17.0453112,25.8589212 5.91900415,22.8514523 C5.55485477,22.753195 5.67900415,22.1679668 6.06639004,22.020249 C8.16929461,21.2165975 12.933444,17.6965975 17.4406639,16.1450622 C18.2987552,15.8499585 19.1541909,15.6209129 19.9890456,15.4878008 C15.02639,15.0443154 12.7893776,14.3541909 9.63286307,14.8302075 C9.28697095,14.8823237 9.05195021,14.479668 9.26639004,14.2034855 C13.5193361,8.7253112 21.3540249,7.07087137 26.1878838,9.98107884 C23.2082988,6.28912863 20.8743568,3.34473029 20.8743568,3.34473029 L26.4046473,0.203485477 C26.4046473,0.203485477 28.6894606,5.30821577 30.3518672,9.02340249 C34.4657261,2.94506224 42.119834,2.38406639 45.3536929,6.69676349 C45.5455602,6.95302905 45.3450622,7.31751037 45.0247303,7.30987552 C42.3926971,7.24580913 40.9434025,9.63983402 40.833527,11.4605809 L40.8717012,11.4648963"
          fill="#00912D"
        ></path>
      </g>
    </svg>
  );
};
