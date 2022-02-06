/** @format */
import { USERS } from "./users";

export const POSTS = [
  {
    id: 1,
    imageUrl:
      "https://production.listennotes.com/podcasts/unleash-your-inner-wolf-with-rafeh-qazi-Qyav3A5Kurx-ISlDR3vdqKW.1400x1400.jpg",
    name: USERS[0].name,
    likes: 12330,
    caption: "Focus more, keep flying!",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "rafeh",
        comment: "Nice build man",
      },
      {
        user: "sangha",
        comment: "Nice build man,always doing great things",
      },
    ],
  },
  {
    id: 2,
    imageUrl:
      "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2558473/settings_images/0A4Obt3yTfCGNGqvBlNV_1-ad-studio_react_challenge_IMG_1889.jpg",
    name: USERS[1].name,
    likes: 2100,
    caption: "keep flying!",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "Brad",
        comment: "Looking forward to meet you.",
      },
      {
        user: "Shaun",
        comment: "what a ninja, love from the ninjas",
      },
    ],
  },
  {
    id: 2,
    imageUrl:
      "https://storage.googleapis.com/ares-profile-pictures/hd/ssssangha-5d4e6abebb9d0ae3beec874aeda583f7_hd.jpg",
    name: USERS[2].name,
    likes: 80140,
    caption: "lets goo , papap fam react!",
    profile_picture: USERS[2].image,
    comments: [
      {
        user: "Brad",
        comment: "Looking forward to meet you.",
      },
      {
        user: "Shaun",
        comment: "what a ninja, love from the ninjas",
      },
    ],
  },
];
